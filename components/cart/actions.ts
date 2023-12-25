"use server";

import { TAGS } from "@/lib/constants";
import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart,
  updateDiscountCodesToCart,
} from "@/lib/shopify";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function addItem(
  prevState: any,
  selectedVariantId: string | undefined
) {
  let cartId = cookies().get("cartId")?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  if (!cartId || !cart) {
    cart = await createCart();
    cartId = cart.id;
    cookies().set("cartId", cartId);
  }

  if (!selectedVariantId) {
    return { message: "Missing product variant ID" };
  }

  try {
    await addToCart(cartId, [
      { merchandiseId: selectedVariantId, quantity: 1 },
    ]);
    revalidateTag(TAGS.cart);
    return { message: "Added to Cart" };
  } catch (e) {
    return { message: "Error adding item to cart" };
  }
}

export async function removeItem(prevState: any, lineId: string) {
  const cartId = cookies().get("cartId")?.value;

  if (!cartId) {
    return "Missing cart ID";
  }

  try {
    await removeFromCart(cartId, [lineId]);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return "Error removing item from cart";
  }
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    lineId: string;
    variantId: string;
    quantity: number;
  }
) {
  const cartId = cookies().get("cartId")?.value;

  if (!cartId) {
    return "Missing cart ID";
  }

  const { lineId, variantId, quantity } = payload;

  try {
    if (quantity === 0) {
      await removeFromCart(cartId, [lineId]);
      revalidateTag(TAGS.cart);
      return;
    }

    await updateCart(cartId, [
      {
        id: lineId,
        merchandiseId: variantId,
        quantity,
      },
    ]);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return "Error updating item quantity";
  }
}

export async function addCartDiscountCode(prevState: any, formData: FormData) {
  const cartId = cookies().get("cartId")?.value;

  if (!cartId) {
    return { message: "Missing cart ID" };
  }

  const code = formData.get("code");
  if (typeof code !== "string" || code.length === 0) {
    return { message: "Empty discount code provided" };
  }

  try {
    const cart = await getCart(cartId);
    const discounts =
      cart?.discountCodes.map((discount) => discount.code) || [];

    const existingCoupon = cart?.discountCodes.find(
      (discount) => discount.code.toLowerCase() === code.toLowerCase()
    );

    if (existingCoupon) {
      if (existingCoupon.applicable) {
        return { message: "Discount code is already applied" };
      } else {
        return { message: "Coupon code is invalid" };
      }
    }

    const { errors, cart: newCart } = await updateDiscountCodesToCart(cartId, [
      ...discounts,
      code,
    ]);

    revalidateTag(TAGS.cart);

    if (errors?.length && errors.length > 0) {
      return { message: errors.join(" | ") };
    }

    if (
      !newCart.discountCodes.find(
        (discount) => discount.code.toLowerCase() === code.toLowerCase()
      )?.applicable
    ) {
      return { message: "Coupon code is invalid" };
    }

    return { message: "Coupon applied successfully" };
  } catch (e) {
    return { message: "Error updating discount codes to cart" };
  }
}

export async function removeCartDiscountCode(
  prevState: any,
  formData: FormData
) {
  const cartId = cookies().get("cartId")?.value;

  if (!cartId) {
    return { message: "Missing cart ID" };
  }

  const code = formData.get("code");
  if (typeof code !== "string" || code.length === 0) {
    return { message: "Empty discount code provided" };
  }

  try {
    const cart = await getCart(cartId);
    const discounts =
      cart?.discountCodes.map((discount) => discount.code.toLowerCase()) || [];

    if (!discounts.includes(code.toLowerCase())) {
      return { message: "Unable to find coupon code in cart" };
    }

    const { errors } = await updateDiscountCodesToCart(
      cartId,
      discounts.filter((discount) => discount !== code.toLowerCase())
    );

    revalidateTag(TAGS.cart);

    if (errors?.length && errors.length > 0) {
      return { message: errors.join(" | ") };
    }

    return { message: "Coupon applied successfully" };
  } catch (e) {
    return { message: "Error updating discount codes to cart" };
  }
}
