'use client'

import SectionRadio from '@/components/section/radio'
import { useFormStatus } from 'react-dom'
import Price from '@/components/product/price'
import { useCheckoutStore } from '@/features/checkout/provider-client'
import { getAdjustedShippingRate, getApplicableShippingRate } from '@/features/checkout/utils'
import type { ShippingOption } from '@/payload-types'
import { useCartStore } from '@/features/cart/cart-store/provider'

const ShippingDiscount = () => (
  <div className='flex justify-end'>
    <span className="bg-green-100 text-xs py-2 px-4 md:px-8 text-right text-green-800">
      Special Shipping Discount is auto-applied for you 🎉
    </span>
  </div>
)

const CheckoutShippingClient = ({ options }: { options: ShippingOption['option'] }) => {
  const setStoreShipping = useCheckoutStore((state) => state.setSelectedShipping)
  const cart = useCartStore((state) => state.cart)

  const { pending } = useFormStatus()

  return (
    <>
      {options
        ?.filter((i) => !!i.id)
        .map((i, index) => {
          const rate = getApplicableShippingRate(cart.items, i)
          const cost = getAdjustedShippingRate(cart.items, rate)
          return (
            <SectionRadio
              name="shipping"
              key={i.mode}
              value={i.id!}
              id={i.id!}
              disabled={pending}
              defaultChecked={index === 0}
              onChange={() => {
                setStoreShipping(options[index])
              }}
              footer={rate > cost ? <ShippingDiscount /> : undefined}
              label={
                <p className="flex flex-col">
                  <span>
                    Shipping By <b>{i.mode}</b>
                  </span>
                  {i.days ? (
                    <span className="text-sm text-gray-600">Estimated Delivery ~{i.days} Days</span>
                  ) : null}
                </p>
              }
            >
              <div className="flex flex-col items-end gap-1">
                <Price price={rate} className="line-through text-sm text-gray-500" />
                {!Math.trunc(cost) ? (
                  <span className="bg-green-100 text-green-800 border border-green-300 text-sm px-3 py-1 rounded">
                    Free
                  </span>
                ) : (
                  <Price price={cost} />
                )}
              </div>
            </SectionRadio>
          )
        })}
    </>
  )
}

export default CheckoutShippingClient
