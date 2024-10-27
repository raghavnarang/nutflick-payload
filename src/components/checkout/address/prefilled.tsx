import type { FC } from 'react'
import type { Address } from '@/payload-types'
import Link from 'next/link'
import Button from '@/components/button'

interface CheckoutAddressPrefilledProps {
  address: Address
  onEdit?: () => void
  onSelect?: () => void
  isLoggedIn?: boolean
}

const CheckoutAddressPrefilled: FC<CheckoutAddressPrefilledProps> = ({
  address: { address, city, state, pincode, name, phone, id },
  onEdit,
  onSelect,
  isLoggedIn,
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

  return (
    <>
      <p>{name},</p>
      <p>
        {address}, {city}, {state}, {pincode}
      </p>
      <p>Phone: {phone}</p>
      <p className="text-sm text-gray-500 mt-5">
        <Button
          small
          className="inline-flex"
          type="button"
          onClick={(e) => {
            e.preventDefault()
            onEdit?.()
          }}
        >
          Enter
        </Button>{' '}
        another address
        {loginOrSelectAddressesMessage ? ' or ' : ''}
        {loginOrSelectAddressesMessage}
      </p>
      <input type="hidden" name="address_id" value={id} />
    </>
  )
}

export default CheckoutAddressPrefilled
