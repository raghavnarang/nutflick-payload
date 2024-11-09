import { CurrencyPosition } from '@/shared/types/currency'
import { getFormattedPrice, hasDecimal } from '@/utils/misc'
import cx from 'clsx'
import type { FC } from 'react'

interface PriceProps {
  currencyPosition?: CurrencyPosition
  currency?: string
  price: number
  className?: string
  negative?: boolean
}

const Price: FC<PriceProps> = ({
  currency = '₹',
  currencyPosition = CurrencyPosition.Left,
  price,
  className,
  negative = false,
}) => (
  <span className={cx('whitespace-nowrap', className)}>
    {getFormattedPrice(price, negative, currency, currencyPosition)}
  </span>
)

export default Price
