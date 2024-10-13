import { CurrencyPosition } from '@/shared/types/currency'
import { hasDecimal } from '@/utils/misc'
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
    {`${negative ? '- ' : ''}${currencyPosition === CurrencyPosition.Left ? currency : ''}${
      hasDecimal(price) ? price.toFixed(2) : price
    }${currencyPosition === CurrencyPosition.Right ? currency : ''}`}
  </span>
)

export default Price
