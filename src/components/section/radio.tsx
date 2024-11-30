import type { FC, ReactNode } from 'react'
import Radio, { type RadioProps } from '../form/radio'
import cx from 'clsx'

interface SectionRadioProps extends RadioProps {
  children?: ReactNode
  footer?: ReactNode
}

const SectionRadio: FC<SectionRadioProps> = ({ children, footer, ...props }) => {
  return (
    <div className='border-b'>
      <div
        className={cx('md:px-8 px-4 py-5 flex justify-between items-center', {
          'opacity-50': props.disabled,
        })}
      >
        <Radio {...props} wrapperClassName="flex !items-start !gap-3" className="mt-1.5" />
        {children}
      </div>
      {footer}
    </div>
  )
}

export default SectionRadio
