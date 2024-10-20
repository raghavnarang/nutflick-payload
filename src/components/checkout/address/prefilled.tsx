import type { FC } from 'react'
import SectionBody from '../../section/body'
import type { Address } from '@/payload-types'
import Link from 'next/link'

interface CheckoutAddressPrefilledProps {
  address: Address
  onEdit?: () => void
  onSelect?: () => void
}

const CheckoutAddressPrefilled: FC<CheckoutAddressPrefilledProps> = ({
  address: { address, city, state, pincode, name, phone, id },
  onEdit,
}) => {
  return (
    <>
      <SectionBody>
        <p>{name},</p>
        <p>
          {address}, {city}, {state}, {pincode}
        </p>
        <p>Phone: {phone}</p>
        <p className="text-sm text-gray-500 mt-5">
          <Link
            href="#"
            className="text-red-600"
            onClick={(e) => {
              e.preventDefault()
              onEdit?.()
            }}
          >
            Enter another address
          </Link>{' '}
          or{' '}
          <Link href="/login" className="text-red-600">
            Login
          </Link>{' '}
          to use one of your saved addresses
        </p>
        <input type="hidden" name="address_id" value={id} />
      </SectionBody>
    </>
  )
}

export default CheckoutAddressPrefilled
