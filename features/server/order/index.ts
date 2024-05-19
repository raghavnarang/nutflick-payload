"use server";

import "server-only";
import { createClient } from "@/lib/supabase/actions";
import { cookies } from "next/headers";
import { getCurrentUserId } from "../common/user";
import { getOrderShippingItems } from "@/lib/shiprocket";
import { ShippingMode } from "@/shared/types/shipping";
import { CouponValueType } from "@/shared/types/coupon";
import type { InsertOrder } from "@/shared/types/order";

export const createOrderForCurrentUser = async () => {
  const dbClient = createClient(cookies());
  const userId = await getCurrentUserId(dbClient);
  const { data: checkout, error } = await dbClient
    .from("checkout")
    .select(
      `address(id, name, phone, state, city, pincode, address),
        coupon(id, coupon, is_active, value, value_type, max_discount, min_cart_value, max_use, order(id)),
        items:cart_product(id, qty, 
            variant:product_variant(id, title, price, weight, costToBear:included_shipping_cost, 
                product(id, title, 
                  category:product_category(id, name)
                )
            )
        ), shipping_mode`
    )
    .eq("user_id", userId);

  if (error || !checkout || checkout.length === 0) {
    console.log(error);
    throw Error("Unable to find checkout for current user");
  }

  const {
    items,
    address,
    shipping_mode: shippingMode = ShippingMode.SURFACE,
    coupon,
  } = checkout[0];
  if (!items || items.length === 0 || !address) {
    throw Error("Invalid Checkout found for current user");
  }

  const orderProducts = items
    .filter((i) => i.variant && i.variant.product && i.variant.weight && i.qty)
    .map((i) => {
      const variant = i.variant!;
      const product = variant.product!;

      return {
        product_id: product.id,
        variant_id: variant.id,
        product_title: product.title,
        variant_title: variant.title,
        weight: variant.weight,
        qty: i.qty,
        price: variant.price,
        category_id: product.category?.id,
        category_name: product.category?.name,
        included_shipping_cost: variant.costToBear,
      };
    });

  const subtotal = orderProducts.reduce(
    (carry, item) => carry + item.price * item.qty,
    0
  );

  const order: InsertOrder = {
    address_id: address.id,
    address: address.address,
    name: address.name,
    phone: address.phone,
    city: address.city,
    state: address.state,
    pincode: address.pincode,
    user_id: userId,
  };

  if (
    coupon &&
    coupon.is_active &&
    (!coupon.min_cart_value || subtotal >= coupon.min_cart_value) &&
    (!coupon.max_use || coupon.order.length < coupon.max_use)
  ) {
    const discount =
      coupon.value_type === CouponValueType.PERCENTAGE
        ? subtotal * (coupon.value / 100)
        : coupon.value;

    order.coupon = coupon.coupon;
    order.coupon_id = coupon.id;
    order.discount = discount;

    if (coupon.max_discount && discount > coupon.max_discount) {
      order.discount = coupon.max_discount;
    }
  }

  const { weight, costToBear } = orderProducts.reduce(
    (c, i) => ({
      weight: c.weight + i.qty * i.weight,
      costToBear: c.costToBear + i.qty * (i.included_shipping_cost || 0),
    }),
    {
      weight: 0,
      costToBear: 0,
    }
  );

  if (weight) {
    const { couriers } = await getOrderShippingItems(
      process.env.SHIPPING_FROM_PIN!,
      address.pincode,
      weight,
      costToBear
    );

    const courier =
      couriers.find((c) => c.mode === shippingMode) ||
      (couriers.length !== 0 && couriers[0]);

    if (!courier) {
      throw Error("Unable to fetch courier for current user");
    }

    order.shipping_mode = courier.mode;
    order.shipping_cost = courier.rate;
  }

  const { data: orderIds, error: insertOrderError } = await dbClient
    .from("order")
    .insert(order)
    .select("id");

  if (insertOrderError || !orderIds || orderIds.length === 0) {
    console.log(insertOrderError);
    throw Error("Unable to insert order");
  }

  const { error: insertOrderProductsError } = await dbClient
    .from("order_product")
    .insert(orderProducts.map((op) => ({ ...op, order_id: orderIds[0].id })));

  if (insertOrderProductsError) {
    console.log(insertOrderProductsError);
    throw Error("Unable to insert order products");
  }

  const { error: deleteCheckoutError } = await dbClient
    .from("checkout")
    .delete()
    .eq("user_id", userId);

  if (deleteCheckoutError) {
    console.log(deleteCheckoutError);
    throw Error("Unable to delete checkout after order creation");
  }
};
