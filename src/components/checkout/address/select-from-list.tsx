'use client'

import Button from '@/components/button'
import { type FC } from 'react'
import type { Address } from '@/payload-types'

interface CheckoutSelectAddressProps {
  selectedAddressId?: number
  onSelect: (address: Address) => void
  onCancel: () => void
  addresses: Address[]
}

const CheckoutSelectAddress: FC<CheckoutSelectAddressProps> = ({
  selectedAddressId,
  onSelect,
  onCancel,
  addresses,
}) => {
  return (
    <div className="flex flex-col">
      {addresses.map((address) => (
        <div
          className="flex flex-col sm:flex-row items-start gap-4 sm:items-center justify-between border-t first:border-none border-gray-200 py-4"
          key={address.id}
        >
          <div>
            <p>{address.name},</p>
            <p>
              {address.address}, {address.city}, {address.state}, {address.pincode}
            </p>
            <p>Phone: {address.phone}</p>
          </div>
          {selectedAddressId !== address.id ? (
            <Button small onClick={() => onSelect(address)} type="button">
              Select
            </Button>
          ) : (
            <p className="text-red-600">Selected</p>
          )}
        </div>
      ))}
      <input type="hidden" name="address_id" value={selectedAddressId} />
      <p className="text-sm text-gray-500 mt-5">
        <Button
          small
          isSecondary
          className="inline-flex"
          type="button"
          onClick={(e) => {
            e.preventDefault()
            onCancel()
          }}
        >
          Cancel
        </Button>{' '}
        selecting address
      </p>
    </div>
  )
}

export default CheckoutSelectAddress
