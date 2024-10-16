'use client'

import SectionRadio from '@/components/section/radio'
import { useFormStatus } from 'react-dom'
import Price from '@/components/product/price'
import SectionLoader from '@/components/section/loader'
import useShippingOptions from '@/features/react-query/queries/shipping-options'
import { useCheckoutStore } from '@/features/checkout/store'
import { useEffect } from 'react'
import { useGetShippingCovered } from '@/features/checkout/utils'

const CheckoutShipping = () => {
  const { data: shippingOptions, isLoading, isError, isFetchedAfterMount } = useShippingOptions()
  const setStoreShipping = useCheckoutStore((state) => state.setSelectedShipping)
  const shippingAlreadyCovered = useGetShippingCovered()

  const { pending } = useFormStatus()

  useEffect(() => {
    if (shippingOptions && shippingOptions.length > 0) {
      setStoreShipping(shippingOptions[0])
    }
  }, [isFetchedAfterMount])

  if (isLoading) {
    return <SectionLoader text="Loading Shipping Options" />
  }

  if (!shippingOptions || isError) {
    return null
  }

  return (
    <>
      {shippingOptions
        ?.filter((i) => !!i.id)
        .map((i, index) => {
          let cost = i.rate - shippingAlreadyCovered
          cost = cost <= 0 ? 0 : cost
          return (
            <SectionRadio
              name="shipping"
              key={i.mode}
              value={i.id!}
              id={i.id!}
              disabled={pending}
              defaultChecked={index === 0}
              onChange={() => {
                setStoreShipping(shippingOptions[index])
              }}
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
              {!Math.trunc(cost) ? (
                <span className="bg-green-100 text-green-800 border border-green-300 text-sm px-3 py-1 rounded">
                  Free
                </span>
              ) : (
                <Price price={cost} />
              )}
            </SectionRadio>
          )
        })}
    </>
  )
}

export default CheckoutShipping
