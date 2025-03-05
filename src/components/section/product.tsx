import type { FC } from 'react'
import Price from '@/components/product/price'
import { generateProportionalDiscount } from '@/utils/product'
import { calculateGST } from '@/utils/gst'
import clsx from 'clsx'

interface SectionProductProps {
  category?: string
  title: string
  price: number
  qty: number
  orderSubtotal: number
  orderDiscount?: number
  gstRate?: number
  isIGST?: boolean
  gstInvoice?: boolean
}

const SectionProduct: FC<SectionProductProps> = ({
  qty,
  price,
  title,
  category,
  orderSubtotal,
  orderDiscount,
  gstRate,
  isIGST,
  gstInvoice,
}) => {
  let subtotal = price * qty
  if (orderDiscount && gstInvoice)
    subtotal = subtotal - generateProportionalDiscount(subtotal, orderSubtotal, orderDiscount)

  const gst = gstRate && gstInvoice ? calculateGST(subtotal, gstRate).gstAmount : 0
  const subtotalBasePrice = subtotal - gst
  const singleBasePrice = subtotalBasePrice / qty

  return (
    <div className="flex justify-between items-start gap-3 border-b border-solid border-gray-200 md:px-8 px-4 py-4">
      <div className={clsx('flex', { 'md:max-w-xs max-w-24': gstInvoice })}>
        <div className="flex flex-col justify-between">
          <div>
            {category && <span className="block text-gray-500 text-sm mb-1">{category}</span>}
            <p className="block mb-1 text-sm md:text-base font-bold md:font-normal">{title}</p>
            <p className="block text-gray-600 text-sm md:text-base font-medium">
              <Price price={singleBasePrice} /> x {qty}
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        {!!gstRate && gstInvoice && (
          <div className="flex flex-col gap-2">
            {subtotalBasePrice ? (
              <div>
                <Price price={subtotalBasePrice} className="text-right font-medium text-sm" />
                <span className="text-xs block">(Taxable Value)</span>
              </div>
            ) : null}
            {isIGST ? (
              <div>
                <Price price={gst} className="text-right font-medium text-sm" />
                <span className="text-xs block">(IGST - {gstRate}%)</span>
              </div>
            ) : null}
            {!isIGST ? (
              <div>
                <Price price={gst / 2} className="text-right font-medium text-sm" />
                <span className="text-xs block">(CGST - {(gstRate / 2).toFixed(1)}%)</span>
              </div>
            ) : null}
            {!isIGST ? (
              <div>
                <Price price={gst / 2} className="text-right font-medium text-sm" />
                <span className="text-xs block">(SGST - {(gstRate / 2).toFixed(1)}%)</span>
              </div>
            ) : null}
          </div>
        )}
        <Price price={subtotal} className="text-right font-medium min-w-20" />
      </div>
    </div>
  )
}

export default SectionProduct
