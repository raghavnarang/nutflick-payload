import 'server-only'
import { sha256 } from 'js-sha256'
import { NextRequest } from 'next/server'
import { zfd } from 'zod-form-data'
import {
  createGuestCustomerCookie,
  getGuestPendingOrderTokenData,
} from '@/features/server/auth/customer'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { redirect } from 'next/navigation'
import { getMeUser } from '@/features/server/auth/me'

export async function POST(request: NextRequest) {
  const rzpParams = zfd
    .formData({
      razorpay_payment_id: zfd.text(),
      razorpay_order_id: zfd.text(),
      razorpay_signature: zfd.text(),
    })
    .parse(await request.formData())

  const userData = await getGuestPendingOrderTokenData()
  if (!userData) {
    redirect(`/shop-error?message=No pending order found for current user`)
  }

  const payload = await getPayloadHMR({ config })
  const order = await payload.findByID({
    collection: 'orders',
    id: userData.order,
    overrideAccess: false,
    user: userData,
    depth: 0,
  })
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

  await payload.update({
    collection: 'orders',
    data: {
      razorpay: {
        paymentId: rzpParams.razorpay_payment_id,
        signature: rzpParams.razorpay_signature,
      },
    },
    id: order.id,
  })

  await createGuestCustomerCookie(userData, payload)

  redirect(`/order-complete/${order.id}`)
}
