'use client'

import Script from 'next/script'
import { FC, useEffect, useRef, useState } from 'react'
import BigMessage from '../big-message'
import Warning from '../Icons/warning'
import TransactionProgress from './transaction-progress'
import { useCartStore } from '@/features/cart/cart-store/provider'

interface StartPaymentProps {
  rzpOrderId: string
  total: number
  name: string
  phone: string
}

const StartPayment: FC<StartPaymentProps> = ({ total, name, phone, rzpOrderId }) => {
  const clear = useCartStore((state) => state.clear)
  const [isDismissed, setDismissed] = useState(false)

  const openCheckout = () => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      amount: total * 100,
      currency: 'INR',
      order_id: rzpOrderId,
      callback_url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/payment-completee`,
      image:
        'https://xghbfedvknsyjypohzpv.supabase.co/storage/v1/object/public/public_bucket/logo_square.png?t=2024-05-25T09%3A53%3A42.975Z',
      name: 'Nutflick',
      prefill: {
        name: name,
        contact: phone,
      },
      modal: {
        ondismiss: () => setDismissed(true),
      },
    }

    const rzp = new Razorpay(options)
    rzp.open()
  }

  const isInitialCheckoutLoaded = useRef(false);
  useEffect(() => {
    if (isInitialCheckoutLoaded.current) {
      return;
    }

    if (typeof Razorpay === "function") {
      clear();
      openCheckout();
    }

    return () => {
      isInitialCheckoutLoaded.current = true;
    };
  }, []);

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
          isInitialCheckoutLoaded.current = true;
        }}
      />
    </>
  )
}

export default StartPayment
