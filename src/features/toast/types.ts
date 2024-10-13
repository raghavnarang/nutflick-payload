import type { ReactNode } from "react"

export type ToastType = 'success' | 'error' | 'info'

export interface Toast {
  id: string
  message: ReactNode
  type: ToastType
  duration?: number
}
