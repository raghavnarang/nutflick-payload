import 'server-only'
import { getCurrentGuestOrCustomer } from '@/features/server/auth/customer'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { redirect } from 'next/navigation'
import { getOrderPayments } from '@/features/razorpay/api'
import { RazorpayPaymentStatus } from '@/features/razorpay/types/payment'
import type { PayloadRequest } from 'payload'
import { sendOrderSummaryEmail } from '@/features/server/auth/order-summary-email'

// Verify if current pending order's payment done
export async function GET() {
  const { customer } = await getCurrentGuestOrCustomer()
  if (!customer || !customer.pendingOrder || typeof customer.pendingOrder === 'number') {
    redirect(`/shop-error?message=No pending order found for current user`)
  }

  const order = customer.pendingOrder
  if (!order || !order.razorpay || !order.razorpay.orderId) {
    redirect(`/shop-error?message=No valid order found for current user`)
  }

  const payments = await getOrderPayments(order.razorpay.orderId)
  const capturedPayment = payments.items.find((p) => p.status === RazorpayPaymentStatus.CAPTURED)
  if (!capturedPayment) {
    redirect(`/shop-error?message=No payment found for current pending order`)
  }

  const payload = await getPayloadHMR({ config })
  const transactionID = await payload.db.beginTransaction()
  const req = { transactionID: transactionID || undefined } as PayloadRequest
  const updatedOrder = await payload.update({
    collection: 'orders',
    data: { razorpay: { paymentId: capturedPayment.id } },
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
