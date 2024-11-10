'use client'

import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'

interface VariantModalProps {
  close?: () => void
  title: string
  children?: ReactNode
  footer?: ReactNode
}

export function Modal({ close, children, title, footer }: VariantModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close?.()
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        close?.()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [close])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white w-full md:w-auto md:min-w-[500px] md:max-w-xl md:rounded-lg shadow-xl max-h-[90vh] overflow-hidden"
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">{title}</h2>
          <button onClick={() => close?.()} className="text-gray-400 hover:text-gray-600">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="py-2 md:py-4 px-4 md:px-6 max-h-[calc(90vh-80px)] overflow-y-auto">
          {children}
        </div>
        {footer}
      </div>
    </div>
  )
}
