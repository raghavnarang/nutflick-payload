import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import type { Toast, ToastType } from './types'
import type { ReactNode } from 'react'

interface ToastStore {
  toasts: Toast[]
  addToast: (message: ReactNode, type: ToastType, duration?: number) => void
  removeToast: (id: string) => void
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (message, type, duration = 5000) =>
    set((state) => ({
      toasts: [...state.toasts, { id: uuidv4(), message, type, duration }],
    })),
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}))