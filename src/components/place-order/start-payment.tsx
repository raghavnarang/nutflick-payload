'use client'

import Script from 'next/script'
import { FC, useEffect, useRef, useState } from 'react'
import BigMessage from '../big-message'
import Warning from '../Icons/warning'
import TransactionProgress from './transaction-progress'
import { useCartStore } from '@/features/cart/cart-store/provider'
import verifyPayment from '@/features/server/actions/verify-payment'

interface StartPaymentProps {
  rzpOrderId: string
  total: number
  name: string
  phone: string
}

const StartPayment: FC<StartPaymentProps> = ({ total, name, phone, rzpOrderId }) => {
  const clearCart = useCartStore((state) => state.clear)
  const [isDismissed, setDismissed] = useState(false)

  // CLear Cart & Checkout
  const clear = () => {
    clearCart()
  }

  const openCheckout = () => {
    const rzp = new Razorpay({
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      amount: total * 100,
      currency: 'INR',
      order_id: rzpOrderId,
      // Callback URL is not working on iOS as safari on iPhone is not sending cookies to below POST route, so using handler
      // callback_url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/payment-complete`,
      image: process.env.NEXT_PUBLIC_LOGO_SQUARE_URL!,
      name: 'Nutflick',
      prefill: {
        name: name,
        contact: phone,
      },
      handler: async ({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) => {
        const data = new FormData()
        data.append('razorpay_order_id', razorpay_order_id || '')
        data.append('razorpay_payment_id', razorpay_payment_id || '')
        data.append('razorpay_signature', razorpay_signature || '')
        await verifyPayment(data)
      },
      modal: {
        ondismiss: () => setDismissed(true),
      },
    })
    rzp.open()
  }

  const isInitialCheckoutLoaded = useRef(false)
  useEffect(() => {
    if (isInitialCheckoutLoaded.current) {
      return
    }

    if (typeof Razorpay === 'function') {
      clear()
      openCheckout()
    }

    return () => {
      isInitialCheckoutLoaded.current = true
    }
  }, [])

  return (
    <>
      {!isDismissed ? (
        <TransactionProgress />
      ) : (
        <BigMessage
          icon={Warning}
          button={{
            onClick: () => {
              openCheckout()
              setDismissed(false)
            },
            text: 'Retry Payment',
          }}
        >
          Payment is not completed. Do you want to retry again?
        </BigMessage>
      )}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => {
          clear()
          openCheckout()
          isInitialCheckoutLoaded.current = true
        }}
      />
    </>
  )
}

export default StartPayment
