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
import { Status } from "@/shared/types/status";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function addItem(selectedVariantId: string) {
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
    return { message: "Missing product variant ID", status: Status.error };
  }

  try {
    await addToCart(cartId, [
      { merchandiseId: selectedVariantId, quantity: 1 },
    ]);
    revalidateTag(TAGS.cart);
    return { message: "Added to Cart", status: Status.success };
  } catch (e) {
    return { message: "Unable to add item to cart", status: Status.error };
  }
}

export async function removeItem(lineId: string) {
  const cartId = cookies().get("cartId")?.value;

  if (!cartId) {
    return { message: "Missing cart ID", status: Status.error };
  }

  try {
    await removeFromCart(cartId, [lineId]);
    revalidateTag(TAGS.cart);
    return { message: "Item removed from cart", status: Status.success };
  } catch (e) {
    return { message: "Error removing item from cart", status: Status.error };
  }
}

export async function updateItemQuantity(
  prevState: any,
  payload: { lineId: string; variantId: string; quantity: number }
) {
  const cartId = cookies().get("cartId")?.value;

  if (!cartId) {
    return { message: "Missing cart ID", status: Status.error };
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
    return { message: "Error updating item quantity", status: Status.error };
  }
}

export async function addCartDiscountCode(code: string) {
  const cartId = cookies().get("cartId")?.value;

  if (!cartId) {
    return { message: "Missing cart ID", status: Status.error };
  }

  if (typeof code !== "string" || code.length === 0) {
    return { message: "Empty discount code provided", status: Status.error };
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
        return {
          message: "Discount code is already applied",
          status: Status.error,
        };
      } else {
        return { message: "Coupon code is invalid", status: Status.error };
      }
    }

    const { errors, cart: newCart } = await updateDiscountCodesToCart(cartId, [
      ...discounts,
      code,
    ]);

    revalidateTag(TAGS.cart);

    if (errors?.length && errors.length > 0) {
      return { message: errors.join(" | "), status: Status.error };
    }

    if (
      !newCart.discountCodes.find(
        (discount) => discount.code.toLowerCase() === code.toLowerCase()
      )?.applicable
    ) {
      return { message: "Coupon code is invalid", status: Status.error };
    }

    return { message: "Code applied successfully", status: Status.success };
  } catch (e) {
    return {
      message: "Error updating discount codes to cart",
      status: Status.error,
    };
  }
}

export async function removeCartDiscountCode(code: string) {
  const cartId = cookies().get("cartId")?.value;

  if (!cartId) {
    return { message: "Missing cart ID", status: Status.error };
  }

  if (typeof code !== "string" || code.length === 0) {
    return { message: "Empty discount code provided", status: Status.error };
  }

  try {
    const cart = await getCart(cartId);
    const discounts =
      cart?.discountCodes.map((discount) => discount.code.toLowerCase()) || [];

    // if (!discounts.includes(code.toLowerCase())) {
    //   return {
    //     message: "Unable to find coupon code in cart",
    //     status: Status.error,
    //   };
    // }

    const { errors } = await updateDiscountCodesToCart(
      cartId,
      discounts.filter((discount) => discount !== code.toLowerCase())
    );

    revalidateTag(TAGS.cart);

    if (errors?.length && errors.length > 0) {
      return { message: errors.join(" | "), status: Status.error };
    }

    return { message: "Code removed successfully", status: Status.success };
  } catch (e) {
    return {
      message: "Error updating discount codes to cart",
      status: Status.error,
    };
  }
}
