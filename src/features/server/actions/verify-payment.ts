'use server'

import 'server-only'
import { sha256 } from 'js-sha256'
import { zfd } from 'zod-form-data'
import { getCurrentGuestOrCustomer } from '@/features/server/auth/customer'
import { getPayload } from 'payload'
import config from '@payload-config'
import { redirect } from 'next/navigation'
import type { PayloadRequest } from 'payload'
import { sendOrderSummaryEmail } from '@/features/server/auth/order-summary-email'

export default async function verifyPayment(data: FormData) {
    const rzpParams = zfd
    .formData({
      razorpay_payment_id: zfd.text(),
      razorpay_order_id: zfd.text(),
      razorpay_signature: zfd.text(),
    })
    .parse(data)

  const { customer } = await getCurrentGuestOrCustomer()
  if (!customer || !customer.pendingOrder || typeof customer.pendingOrder === 'number') {
    redirect(`/shop-error?message=No pending order found for current user`)
  }

  const order = customer.pendingOrder
  if (!order || !order.razorpay || !order.razorpay.orderId) {
    redirect(`/shop-error?message=No valid order found for current user`)
  }

  const dbRzpOrderId = order.razorpay.orderId
  const generatedSignature = sha256.hmac(
    process.env.RAZORPAY_KEY_SECRET!,
    dbRzpOrderId + '|' + rzpParams.razorpay_payment_id,
  )

  if (generatedSignature !== rzpParams.razorpay_signature) {
    redirect(`/shop-error?message=Payment data is invalid`)
  }

  const payload = await getPayload({ config })
  const transactionID = await payload.db.beginTransaction()
  const req = { transactionID: transactionID || undefined } as PayloadRequest

  const updatedOrder = await payload.update({
    collection: 'orders',
    data: {
      razorpay: {
        paymentId: rzpParams.razorpay_payment_id,
        signature: rzpParams.razorpay_signature,
      },
    },
    id: order.id,
    req,
  })

  await payload.update({
    collection: 'customers',
    data: { pendingOrder: null },
    id: customer.id,
    req,
  })

  // Send order summary email to customer and admin
  sendOrderSummaryEmail(customer.email, updatedOrder)
  sendOrderSummaryEmail(process.env.NEXT_ADMIN_EMAIL!, updatedOrder)

  // DB Operations Completed
  if (req.transactionID) {
    await payload.db.commitTransaction(req.transactionID)
  }

  redirect(`/order-complete/${order.id}`)
}