'use client'

import Toast from './toast'
import { useToastStore } from '../store'

const ToastContainer= () => {
  const toasts = useToastStore((state) => state.toasts)
  return toasts.length > 0 ? (
    <div className="fixed bottom-0 right-0 pr-10 md:pb-10 pb-16 pl-10 md:pl-0 flex flex-col gap-3 max-w-full sm:max-w-xs w-full">
      {toasts.map((toast) => (
        <Toast {...toast} key={toast.id} />
      ))}
    </div>
  ) : null
}

export default ToastContainer
