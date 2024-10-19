'use client'

import type { FC } from 'react'
import Price from '@/components/product/price'

interface SectionProductProps {
  category?: string
  title: string
  price: number
  qty: number
}

const SectionProduct: FC<SectionProductProps> = ({ qty, price, title, category }) => {
  return (
    <div className="flex justify-between items-center border-b border-solid border-gray-200 md:px-8 px-4 py-4">
      <div className="flex">
        <div className="flex flex-col justify-between">
          <div>
            {category && <span className="block text-gray-500 text-sm mb-1">{category}</span>}
            <p className="block mb-1 text-sm md:text-base font-bold md:font-normal">{title}</p>
            <p className="block text-gray-600 text-sm md:text-base">
              <Price price={price} /> x {qty}
            </p>
          </div>
        </div>
      </div>

      <Price price={price * qty} className="text-right" />
    </div>
  )
}

export default SectionProduct
