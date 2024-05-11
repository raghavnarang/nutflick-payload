"use server";

import "server-only";
import { z } from "zod";
import { createClient } from "@/lib/supabase/actions";
import { createClient as createClientForServer } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { getCartProduct } from "@/features/cart/utils";
import { getPublicUrlFromPath } from "@/lib/storage";
import { createServerClient } from "@supabase/ssr";
import { Database } from "@/lib/supabase/db-schema";
import type {
  InsertCartProduct,
  CartProduct as CartProductDB,
} from "@/shared/types/cart-product";
import { revalidatePath } from "next/cache";
import { linkAddressToCheckout } from "./address";
import { CartProduct } from "@/shared/types/cart";

interface CartItem {
  id: number;
  qty: number;
}

const syncCartProducts = async (
  items: CartItem[],
  checkoutId: number,
  dbClient: ReturnType<typeof createServerClient<Database>>
) => {
  const { data: dbItems, error } = await dbClient
    .from("cart_product")
    .select()
    .eq("checkout_id", checkoutId);

  if (error || !dbItems) {
    console.log(error);
    throw Error("fetch cart products error during generate checkout");
  }

  const itemsToInsert: InsertCartProduct[] = [];
  const itemsToUpdate: CartProductDB[] = [];
  const existingItems: CartProductDB[] = [];
  const itemsToDelete = dbItems
    .filter((di) => !items.find((i) => i.id === di.variant_id))
    .map((i) => i.id);

  for (const item of items) {
    const dbItem = dbItems.find((i) => i.variant_id === item.id);
    if (!dbItem) {
      itemsToInsert.push({
        checkout_id: checkoutId,
        qty: item.qty,
        variant_id: item.id,
      });

      continue;
    }

    if (dbItem.qty === item.qty) {
      existingItems.push(dbItem);
    } else {
      itemsToUpdate.push({ ...dbItem, qty: item.qty });
    }
  }

  if (itemsToDelete.length > 0) {
    const { error: deleteError } = await dbClient
      .from("cart_product")
      .delete()
      .in("id", itemsToDelete);

    if (deleteError) {
      console.log(deleteError);
      throw Error("delete non-existing cart products error");
    }
  }

  if (itemsToInsert.length > 0) {
    const { data: inserted, error: insertError } = await dbClient
      .from("cart_product")
      .insert(itemsToInsert)
      .select();

    if (insertError || !inserted || inserted.length === 0) {
      console.log(insertError);
      throw Error("insert new cart products error");
    }

    existingItems.push(...inserted);
  }

  for (const item of itemsToUpdate) {
    const { data: updated, error: updateError } = await dbClient
      .from("cart_product")
      .update({ qty: item.qty })
      .eq("id", item.id)
      .select();

    if (updateError || !updated || updated.length === 0) {
      console.log(updateError);
      throw Error("update existing cart products error");
    }

    existingItems.push(...updated);
  }

  return existingItems;
};

const insertCheckout = async (
  items: CartItem[],
  userId: string,
  dbClient: ReturnType<typeof createServerClient<Database>>
) => {
  const { data: checkout, error: checkoutError } = await dbClient
    .from("checkout")
    .insert({ user_id: userId })
    .select("id");

  if (checkoutError || !checkout || checkout.length === 0) {
    console.log(checkoutError);
    throw Error("insert checkout error");
  }

  const checkoutId = checkout[0].id;

  const { error: cartProductError } = await dbClient
    .from("cart_product")
    .insert(
      items.map((i) => ({
        checkout_id: checkoutId,
        qty: i.qty,
        variant_id: i.id,
      }))
    );

  if (cartProductError) {
    console.log(cartProductError);
    throw Error("insert cart items error during generate checkout");
  }

  return checkoutId;
};

const generateCheckout = async (
  items: CartItem[],
  dbClient: ReturnType<typeof createServerClient<Database>>
) => {
  const {
    data: { user },
    error: userError,
  } = await dbClient.auth.getUser();

  if (userError || !user) {
    console.log(userError);
    throw Error("fetch user error during generate checkout");
  }

  let { data: checkout, error: checkoutError } = await dbClient
    .from("checkout")
    .select("id")
    .eq("user_id", user.id);

  if (checkoutError) {
    console.log(checkoutError);
    throw Error("checking existing checkout error");
  }

  const { data } = await dbClient
    .from("address")
    .select("id")
    .eq("user_id", user.id)
    .eq("preferred", true);

  if (!checkout || checkout.length === 0) {
    const checkoutId = await insertCheckout(items, user.id, dbClient);
    if (data?.[0]?.id)
      await linkAddressToCheckout(checkoutId, data[0].id, dbClient);
    revalidatePath(`/admin/checkout/${checkoutId}`);
    return checkoutId;
  }

  await syncCartProducts(items, checkout[0].id, dbClient);
  if (data?.[0]?.id)
    await linkAddressToCheckout(checkout[0].id, data[0].id, dbClient);
  revalidatePath(`/admin/checkout/${checkout[0].id}`);
  return checkout[0].id;
};

export const validateCartAndGenerateCheckout = async (items: CartItem[]) => {
  const { success } = z
    .array(z.object({ id: z.number(), qty: z.number().gt(0) }))
    .min(1)
    .safeParse(items);

  if (!success) {
    throw Error("Empty or corrupted cart found");
  }

  const ids = items.map((i) => i.id);
  const qtys: number[] = [];
  for (const item of items) {
    qtys[item.id] = item.qty;
  }

  const dbClient = createClient(cookies());
  const { data: variants, error } = await dbClient
    .from("product_variant")
    .select(
      "id, title, image, weight, slug, price, product(id, title, image, slug, category:product_category(name))"
    )
    .in("id", ids);

  if (error || !variants) {
    console.log(error);
    throw Error("Unable to find cart items in DB");
  }

  const validatedItems = await Promise.all(
    variants
      .filter((v) => !!v.product)
      .map(async (v) =>
        getCartProduct(
          {
            ...v.product!,
            image: v.product?.image
              ? await getPublicUrlFromPath(v.product.image, dbClient)
              : null,
          },
          {
            ...v,
            image: v.image && (await getPublicUrlFromPath(v.image, dbClient)),
          },
          true,
          qtys[v.id]
        )
      )
  );

  const checkoutId = await generateCheckout(
    validatedItems.map((i) => ({ id: i.variantId, qty: i.qty })),
    dbClient
  );

  return { items: validatedItems, checkoutId };
};

export const getCheckout = async (id: number) => {
  const checkoutId = z.number().parse(id);
  const dbClient = createClientForServer(cookies());

  const { data: checkout, error } = await dbClient
    .from("checkout")
    .select(
      `address(id, name, phone, state, city, pincode, address),
      coupon(id, coupon, value, value_type),
      items:cart_product(id, qty, 
        variant:product_variant(id, title, price, image, slug, weight, costToBear:included_shipping_cost, 
          product(id, image, title, slug, 
            category:product_category(name)
          )
        )
      ), shipping_mode`
    )
    .eq("id", checkoutId);

  if (error || !checkout || checkout.length === 0) {
    console.log(error);
    throw Error("Unable to find cart items in DB");
  }

  const filteredItems = checkout[0].items.filter(
    (i) => i.variant && i.variant.product
  );

  const items = await Promise.all(
    filteredItems.map(async (item) => {
      const product = item.variant?.product!;
      const variant = item.variant!;

      return getCartProduct(
        {
          ...product,
          image:
            product.image &&
            (await getPublicUrlFromPath(product.image, dbClient)),
        },
        {
          ...variant,
          image:
            variant.image &&
            (await getPublicUrlFromPath(variant.image, dbClient)),
        },
        true,
        item.qty
      );
    })
  );

  return {
    ...checkout[0],
    items,
  };
};
