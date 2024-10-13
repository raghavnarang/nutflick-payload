'use client'

import SectionRadio from '@/components/section/radio'
import { useFormStatus } from 'react-dom'
import Price from '@/components/product/price'
import SectionLoader from '@/components/section/loader'
import useShippingOptions from '@/features/react-query/queries/shipping-options'

const CheckoutShipping = () => {
  const { data: shippingOptions, isLoading, isError } = useShippingOptions()

  const { pending } = useFormStatus()

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
        .map((i, index) => (
          <SectionRadio
            name="mode"
            key={i.mode}
            value={i.id!}
            id={i.id!}
            disabled={pending}
            defaultChecked={index === 0}
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
            {!Math.trunc(i.rate) ? (
              <span className="bg-green-100 text-green-800 border border-green-300 text-sm px-3 py-1 rounded">
                Free
              </span>
            ) : (
              <Price price={i.rate} />
            )}
          </SectionRadio>
        ))}
    </>
  )
}

export default CheckoutShipping
