'use client'

import type { Address } from '@/payload-types'
import type { FC } from 'react'
import Link from 'next/link'
import Button from '@/components/button'
import AddressForm from '@/components/form/address'

interface CheckoutAddressFormProps {
  address?: Address
  onEditCancel?: () => void
  isLoggedIn?: boolean
  // If this is passed from parent, it means there are more addresses available to choose from
  onSelect?: () => void
}

const CheckoutAddressForm: FC<CheckoutAddressFormProps> = ({
  address,
  onEditCancel,
  isLoggedIn,
  onSelect,
}) => {
  const loginOrSelectAddressesMessage = !isLoggedIn ? (
    <>
      <Link href="/login?ref=/checkout">
        <Button small className="inline-flex" type="button">
          Login
        </Button>
      </Link>{' '}
      to use one of your saved addresses
    </>
  ) : onSelect ? (
    <>
      <Button
        small
        className="inline-flex"
        type="button"
        onClick={(e) => {
          e.preventDefault()
          onSelect()
        }}
      >
        Choose
      </Button>{' '}
      one of your saved addresses
    </>
  ) : (
    ''
  )

  const editCancelText =
    address || loginOrSelectAddressesMessage ? (
      <p className="text-sm text-gray-500 mt-5">
        {address && (
          <>
            <Button
              small
              isSecondary
              type="button"
              className="inline-flex"
              onClick={(e) => {
                e.preventDefault()
                onEditCancel?.()
              }}
            >
              Cancel
            </Button>{' '}
            adding new address
          </>
        )}
        {address && loginOrSelectAddressesMessage ? ' or ' : ''}
        {loginOrSelectAddressesMessage}
      </p>
    ) : null

  const defaultText = loginOrSelectAddressesMessage ? (
    <p className="text-sm text-gray-500 mt-5">{loginOrSelectAddressesMessage}</p>
  ) : null

  return (
    <>
      <AddressForm address={address} />
      {editCancelText ? editCancelText : defaultText}
    </>
  )
}

export default CheckoutAddressForm
