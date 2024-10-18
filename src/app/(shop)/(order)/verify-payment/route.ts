import 'server-only'
import { sha256 } from 'js-sha256'
import { NextRequest } from 'next/server'
import { zfd } from 'zod-form-data'
import {
  createCustomerCookie,
  getGuestPendingOrderTokenData,
} from '@/features/server/auth/customer'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { TokenSessionType } from '@/shared/types/token'
import { redirect } from 'next/navigation'
import { getMeUser } from '@/features/server/auth/me'
import { getOrderPayments } from '@/features/razorpay/api'
import { RazorpayPaymentStatus } from '@/features/razorpay/types/payment'

// Verify if current pending order's payment done
export async function GET(request: NextRequest) {
  const userData = await getGuestPendingOrderTokenData()
  if (!userData) {
    redirect(`/shop-error?message=No pending order found for current user`)
  }

  const payload = await getPayloadHMR({ config })
  const user = await getMeUser(payload)
  if (!user) {
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

  await createCustomerCookie(
    {
      id: user.id,
      collection: 'customers',
      email: user.email,
      type: TokenSessionType.GUEST,
    },
    payload,
  )

  redirect(`/order-complete/${order.id}`)
}
