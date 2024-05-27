"use server";

import "server-only";
import { getCurrentUserId } from "../common/user";
import { getOrderShippingItems } from "@/lib/shiprocket";
import { ShippingMode } from "@/shared/types/shipping";
import { CouponValueType } from "@/shared/types/coupon";
import type { InsertOrder } from "@/shared/types/order";
import { createServerClient } from "@supabase/ssr";
import { Database } from "@/lib/supabase/db-schema";
import { z } from "zod";
import {
  capturePayment,
  getOrderStatus,
  getPaymentStatus,
} from "@/lib/razorpay/api";
import { RazorpayOrderStatus } from "@/lib/razorpay/types/order";
import { RazorpayPaymentStatus } from "@/lib/razorpay/types/payment";
import { createClient } from "@/lib/supabase/server";
import { createClient as createServiceClient } from "@/lib/supabase/service";
import { cookies } from "next/headers";

export const createOrderForCurrentUser = async (
  dbClient: ReturnType<typeof createServerClient<Database>>
) => {
  const userId = await getCurrentUserId();
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
    .insert(
      orderProducts.map((op) => {
        const { included_shipping_cost, ...rest } = op;
        return { ...rest, order_id: orderIds[0].id };
      })
    );

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

  return {
    id: orderIds[0].id,
    total: subtotal + (order.shipping_cost || 0) - (order.discount || 0),
    name: order.name,
    phone: order.phone,
  };
};

export const getOrder = async (
  id: number,
  dbClient?: ReturnType<typeof createServerClient<Database>>
) => {
  if (!dbClient) {
    dbClient = createClient(cookies());
  }

  const { data: order, error } = await dbClient
    .from("order")
    .select(
      "discount, shipping_cost, shipping_mode, products:order_product(product_title, variant_title, qty, price, category_name)"
    )
    .eq("id", id);

  if (error || !order || order.length === 0 || order[0].products.length === 0) {
    console.log(error);
    throw new Error("Unable to find order");
  }

  const total =
    order[0].products.reduce((total, p) => total + p.price * p.qty, 0) -
    (order[0].discount || 0) +
    (order[0].shipping_cost || 0);

  return { ...order[0], total };
};

export const getOrderPaymentStatus = async (
  orderId: number,
  shouldCaptureAuthorised: boolean = false
) => {
  const dbClient = createServiceClient();
  orderId = z.number().parse(orderId);

  /** getOrder will fail if order doesn't belong to current user */
  const { total, ...order } = await getOrder(orderId);

  const { data: rzpOrder, error } = await dbClient
    .from("razorpay_orders")
    .select("rzp_payment_id, rzp_order_id")
    .eq("order_id", orderId);

  if (
    error ||
    !rzpOrder ||
    !rzpOrder[0].rzp_order_id ||
    !rzpOrder[0].rzp_payment_id
  ) {
    console.log(error);
    throw new Error("There is not any payment found for this order");
  }

  const { rzp_order_id: rzpOrderId, rzp_payment_id: rzpPaymentId } =
    rzpOrder[0];

  const [orderStatus, paymentStatus] = await Promise.all([
    getOrderStatus(rzpOrderId),
    getPaymentStatus(rzpPaymentId),
  ]);

  if (
    orderStatus === RazorpayOrderStatus.PAID &&
    paymentStatus === RazorpayPaymentStatus.CAPTURED
  ) {
    return paymentStatus;
  }

  if (
    orderStatus === RazorpayOrderStatus.ATTEMPTED &&
    paymentStatus === RazorpayPaymentStatus.AUTHORIZED
  ) {
    if (!shouldCaptureAuthorised) {
      return paymentStatus;
    }

    return (await capturePayment(rzpPaymentId, total))
      ? RazorpayPaymentStatus.CAPTURED
      : RazorpayPaymentStatus.FAILED;
  }

  return RazorpayPaymentStatus.FAILED;
};
