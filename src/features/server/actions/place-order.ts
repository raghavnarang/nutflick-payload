'use server'

import 'server-only'
import { z } from 'zod'
import { zfd } from 'zod-form-data'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import states from '@/features/states.json'
import type { BasePayload, PayloadRequest } from 'payload'
import { createGuestpendingOrderCustomerCookie, getOrCreateCustomer } from '../auth/customer'
import { ServerResponse } from '../utils'
import { getOrderProductsFromCartItems } from '../product'
import { getApplicableCoupon } from '../coupon'
import { Address, Coupon, Customer } from '@/payload-types'
import { getShippingOptions } from '../shipping'
import {
  getAdjustedShippingRate,
  getDiscountValue,
  isCouponApplicable,
} from '@/features/checkout/utils'
import { redirect } from 'next/navigation'
import { createOrder as createRzpOrder } from '@/features/razorpay/api'

const statesArray = Object.keys(states)

const placeOrderSchema = zfd
  .formData({
    email: zfd.text(z.string().email().optional()),
    address_id: zfd.numeric(z.number().optional()),
    name: zfd.text(z.string().optional()),
    phone: zfd
      .numeric(z.number().min(6000000000).max(9999999999).optional())
      .transform((val) => val?.toString()),
    address: zfd.text(z.string().optional()),
    pincode: zfd.numeric(z.number().max(999999).optional()).transform((val) => val?.toString()),
    city: zfd.text(z.string().optional()),
    state: zfd
      .text(z.enum([statesArray[0], ...statesArray]).optional())
      .transform((val) => val as keyof typeof states),
    products: zfd.repeatable(
      z.array(
        z.object({
          productId: zfd.numeric(),
          variantId: zfd.text(),
          qty: zfd.numeric(),
        }),
      ),
    ),
    shipping: zfd.text(),
    coupon: zfd.text(z.string().optional()),
  })
  .refine(
    (data) =>
      !data.address_id
        ? data.name && data.address && data.phone && data.city && data.state && data.pincode
        : true,
    {
      message: 'address fields are required when any address is not selected',
      path: ['name', 'address', 'phone', 'city', 'state', 'pincode'],
    },
  )

type PlaceGuestOrderArgs = z.infer<typeof placeOrderSchema> & { email: string }

export const placeOrder = async (data: FormData) => {
  const { data: checkout, success: parseSuccess } = placeOrderSchema.safeParse(data)
  if (!parseSuccess) {
    return ServerResponse('Invalid Data Provided', 'error')
  }

  // TODO: Currently implemented for Guest User, implement for Registered user as well.
  if (!checkout.email) {
    return ServerResponse('Email is missing', 'error')
  }

  // Place Guest Order
  return await placeGuestOrder({ ...checkout, email: checkout.email })
}

const placeGuestOrder = async (checkout: PlaceGuestOrderArgs) => {
  const payload = await getPayloadHMR({ config })
  const transactionID = await payload.db.beginTransaction()
  const req = { transactionID: transactionID || undefined } as PayloadRequest

  // Fetch relevant data from DB
  let coupon: Coupon | null = null
  let couponDiscount = 0
  const customer = await getOrCreateCustomer(checkout.email, undefined, req)
  const products = await getOrderProductsFromCartItems(checkout.products)
  const subtotal = products.reduce((total, item) => total + item.qty * item.price, 0)
  const shipping = (await getShippingOptions()).find((item) => item.id === checkout.shipping)
  const shippingRate = shipping ? getAdjustedShippingRate(products, shipping.rate) : 0
  if (checkout.coupon) {
    coupon = await getApplicableCoupon(checkout.coupon)
    if (coupon && isCouponApplicable(coupon, subtotal)) {
      couponDiscount = getDiscountValue(coupon, subtotal)
    }
  }

  // Get Address from input, or create new address from provided address fields
  const address = await getOrCreateAddress(checkout, customer, payload, req)
  if (!address) {
    return ServerResponse('No address found', 'error')
  }

  // Set Created address as preferred address
  await payload.update({
    collection: 'customers',
    data: { preferredAddress: address.id },
    where: { id: { equals: customer.id } },
    req,
  })

  // Create new order
  const order = await payload.create({
    collection: 'orders',
    data: {
      products,
      customer: customer.id,
      mode: shipping?.mode,
      rate: shippingRate || null,
      couponRef: coupon?.id,
      coupon: coupon?.coupon,
      discount: couponDiscount || null,
      addressRef: address.id,
      address: address.address,
      city: address.city,
      state: address.state,
      phone: address.phone,
      name: address.name,
      pincode: address.pincode,
    },
    req,
  })

  // Add order to razorpay
  try {
    const total = subtotal + shippingRate - couponDiscount
    const rzpOrderId = await createRzpOrder(total)
    await payload.update({
      collection: 'orders',
      data: { razorpay: { orderId: rzpOrderId, total } },
      where: { id: { equals: order.id } },
      req,
    })
  } catch (e) {
    return ServerResponse('Unable to communicate with Payment Gateway Provider', 'error')
  }

  // DB Operations Completed
  if (req.transactionID) {
    await payload.db.commitTransaction(req.transactionID)
  }

  // Create GUEST_PENDING_ORDER token cookie
  await createGuestpendingOrderCustomerCookie(customer, order.id, payload)

  // Redirect to place-order page
  redirect('/place-order')
}

// Get or create address from checkout input fields
async function getOrCreateAddress(
  checkout: Partial<Address> & { address_id?: number },
  customer: Customer,
  payload: BasePayload,
  req?: PayloadRequest,
) {
  // If address id is provided, then use that for preferred address & order address
  let address: Address | null = null
  if (checkout.address_id) {
    address = await payload.findByID({
      collection: 'addresses',
      id: checkout.address_id,
      overrideAccess: false,
      user: { ...customer, collection: 'customers' },
    })
  }

  if (address) {
    return address
  }

  // If address not found, create one
  // Before creating address, make sure all required address fields are supplied (already verified via zod lib)
  if (
    !checkout.name ||
    !checkout.address ||
    !checkout.city ||
    !checkout.state ||
    !checkout.pincode ||
    !checkout.phone
  ) {
    return null
  }

  // Create Address
  return payload.create({
    collection: 'addresses',
    data: {
      name: checkout.name,
      address: checkout.address,
      city: checkout.city,
      state: checkout.state,
      pincode: checkout.pincode,
      phone: checkout.phone,
      customer: customer.id,
    },
    req,
  })
}
