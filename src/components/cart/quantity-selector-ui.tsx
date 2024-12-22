import clsx from 'clsx'
import { useFormStatus } from 'react-dom'
import { Minus, Plus } from '../Icons'

interface QuantitySelectorUIProps {
  className?: string
  onMinusClick?: () => void
  onPlusClick?: () => void
  qty: number
}

export default function QuantitySelectorUI({
  className,
  onMinusClick,
  onPlusClick,
  qty,
}: QuantitySelectorUIProps) {
  const { pending } = useFormStatus()
  return (
    <div className={clsx('flex items-center', className)}>
      <button
        className="disabled:opacity-50"
        onClick={(e) => {
          e.preventDefault()
          onMinusClick?.()
        }}
        disabled={pending}
        aria-label="Decrease Quantity"
      >
        <Minus className="text-primary !size-8" />
      </button>
      <span className="w-8 text-center leading-8">{qty}</span>
      <button
        className="disabled:opacity-50"
        onClick={(e) => {
          e.preventDefault()
          onPlusClick?.()
        }}
        disabled={pending}
        aria-label="Increase Quantity"
      >
        <Plus className="text-primary !size-8" />
      </button>
    </div>
  )
}
