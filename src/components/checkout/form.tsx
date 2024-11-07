'use client'

import EmptyCart from '@/components/cart/empty-cart'
import { useCartStore } from '@/features/cart/cart-store/provider'
import { useCheckoutStore } from '@/features/checkout/store'
import { placeOrder } from '@/features/server/actions/place-order'
import { useToastStore } from '@/features/toast/store'
import { useEffect, useTransition } from 'react'
import type { FormEventHandler, ReactNode } from 'react'

interface CheckoutFormProps {
  children?: ReactNode
}

const CheckoutForm = ({ children }: CheckoutFormProps) => {
  const cart = useCartStore((state) => state.cart)
  const addToast = useToastStore((state) => state.addToast)
  const [, startTransition] = useTransition()
  const reset = useCheckoutStore((state) => state.reset)

  useEffect(() => {
    reset()
  }, [])

  if (!cart || cart.items.length === 0) {
    return <EmptyCart />
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    startTransition(async () => {
      const result = await placeOrder(new FormData(e.currentTarget))
      if (result) {
        addToast(result.message, result.status)
      }
    })
  }

  return <form onSubmit={handleSubmit}>{children}</form>
}

export default CheckoutForm
