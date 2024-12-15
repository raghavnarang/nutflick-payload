'use client'

import type { Toast as ToastType } from '../types'
import { FC, useEffect, useMemo } from 'react'
import cx from 'clsx'
import Tick from '@/components/Icons/tick'
import Error from '@/components/Icons/error'
import { Status } from '@/shared/types/status'
import { useToastStore } from '../store'

const Toast: FC<ToastType> = ({ id, message, type, duration }) => {
  const removeToast = useToastStore((state) => state.removeToast)

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id)
    }, duration)

    return () => clearTimeout(timer)
  }, [id, duration, removeToast])

  const Icon = useMemo(() => {
    switch (type) {
      case Status.success:
        return Tick
      case Status.error:
        return Error
      default:
        return undefined
    }
  }, [type])

  return (
    <div
      className={cx('rounded border border-solid px-5 transition duration-500', {
        'border-red-500 text-red-500 bg-red-200': type === 'error',
        'border-green-700 text-green-700 bg-green-200': type === 'success',
        'border-blue-700 text-blue-700 bg-blue-200': type === 'info',
      })}
    >
      <p className="py-3 flex items-center">
        {Icon && <Icon className="mr-3 shrink-0" />}
        {message}
      </p>
    </div>
  )
}

export default Toast
