import type { ComponentProps, FC } from 'react'
import cx from 'clsx'
import { Icon } from './Icons/types'

export interface ButtonProps extends ComponentProps<'button'> {
  icon?: FC<Icon>
  large?: boolean
  small?: boolean
  isSecondary?: boolean
  isSuccess?: boolean
  isInfo?: boolean
  isPrimaryLight?: boolean
}

const Button: FC<ButtonProps> = ({
  icon: IconComp,
  large = false,
  isSecondary = false,
  small = false,
  isSuccess = false,
  isInfo = false,
  isPrimaryLight = false,
  ...props
}) => (
  <button
    {...props}
    className={cx(
      'justify-center items-center disabled:opacity-50 transition-colors',
      {
        'flex w-full text-lg rounded-lg py-3': large,
        'inline-flex rounded px-3 py-2': !large && !small,
        'bg-red-700 hover:bg-red-800 disabled:hover:bg-red-700 text-white':
          !isSecondary && !isSuccess && !isInfo && !isPrimaryLight,
        'bg-gray-200 hover:bg-gray-300 disabled:hover:bg-gray-200 text-gray-700': isSecondary,
        'bg-green-500 hover:bg-green-600 disabled:hover:bg-green-500 text-white': isSuccess,
        'bg-blue-500 hover:bg-blue-600 disabled:hover:bg-blue-500 text-white': isInfo,
        'bg-red-100 text-red-700': isPrimaryLight,
        'flex px-3 py-1 rounded text-sm': small,
      },
      props.className,
    )}
  >
    {IconComp && (
      <IconComp
        className={cx({
          '!w-4 !h-4 mr-1': small,
          'mr-2': props.children,
          '!mr-0': !props.children,
        })}
      />
    )}
    {props.children}
  </button>
)

export default Button
