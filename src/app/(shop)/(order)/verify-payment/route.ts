import 'server-only'
import {
  createGuestCustomerCookie,
  getGuestPendingOrderTokenData,
} from '@/features/server/auth/customer'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { redirect } from 'next/navigation'
import { getMeUser } from '@/features/server/auth/me'
import { getOrderPayments } from '@/features/razorpay/api'
import { RazorpayPaymentStatus } from '@/features/razorpay/types/payment'

// Verify if current pending order's payment done
export async function GET() {
  const userData = await getGuestPendingOrderTokenData()
  if (!userData) {
    redirect(`/shop-error?message=No pending order found for current user`)
  }

  const payload = await getPayloadHMR({ config })
  const user = await getMeUser(payload)
  if (!user || user.collection === 'customers') {
    redirect(`/shop-error?message=Not valid user found against current session`)
  }

  const order = await payload.findByID({
    collection: 'orders',
    id: userData.order,
    overrideAccess: false,
    user,
    depth: 0,
  })
  if (!order || !order.razorpay || !order.razorpay.orderId) {
    redirect(`/shop-error?message=No valid order found for current user`)
  }

  const payments = await getOrderPayments(order.razorpay.orderId)
  const capturedPayment = payments.items.find((p) => p.status === RazorpayPaymentStatus.CAPTURED)
  if (!capturedPayment) {
    redirect(`/shop-error?message=No payment found for current pending order`)
  }

  await payload.update({
    collection: 'orders',
    data: { razorpay: { paymentId: capturedPayment.id } },
    id: order.id,
  })

  await createGuestCustomerCookie(user, payload)

  redirect(`/order-complete/${order.id}`)
}
