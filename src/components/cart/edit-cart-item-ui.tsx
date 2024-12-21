'use client'

import { type FC } from 'react'
import Plus from '../Icons/plus'
import Minus from '../Icons/minus'
import Button from '../button'
import cx, { clsx } from 'clsx'
import { useFormStatus } from 'react-dom'

interface EditCartItemUIProps {
  className?: string
  bigButton?: boolean
  onMinusClick?: () => void
  onPlusClick?: () => void
  onRemoveClick?: () => void
  hasMultipleVariants?: boolean
  showHelperText?: boolean
  qty: number
}

const EditCartItemUI: FC<EditCartItemUIProps> = ({
  className,
  bigButton,
  onMinusClick,
  onPlusClick,
  onRemoveClick,
  hasMultipleVariants,
  showHelperText,
  qty,
}) => {
  const { pending } = useFormStatus()
  return (
    <div
      className={cx(
        'flex items-start',
        {
          'md:items-center justify-between': !bigButton,
          'flex-col': bigButton,
        },
        className,
      )}
    >
      <div
        className={cx('flex md:mr-5 md:mb-0 items-center', {
          'mb-5': bigButton,
        })}
      >
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
          className={clsx('disabled:opacity-50', {
            'flex items-center gap-2 bg-primary text-white pl-1 py-1 pr-3 rounded-full':
              showHelperText,
          })}
          onClick={(e) => {
            e.preventDefault()
            onPlusClick?.()
          }}
          disabled={pending}
          aria-label="Increase Quantity"
        >
          <Plus
            className={clsx('text-primary !size-8', {
              'bg-white rounded-full': showHelperText,
            })}
          />
          {showHelperText && (
            <span className="text-sm">{hasMultipleVariants ? 'More Options' : 'Add More'}</span>
          )}
        </button>
      </div>
      {onRemoveClick && (
        <Button
          isSecondary
          small={!bigButton}
          large={bigButton}
          className={cx('md:mb-0', { 'xl:w-1/2 md:mt-10 mb-5': bigButton })}
          onClick={onRemoveClick}
          disabled={pending}
        >
          Remove
        </Button>
      )}
    </div>
  )
}

export default EditCartItemUI
