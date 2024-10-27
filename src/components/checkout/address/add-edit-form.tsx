'use client'

import Dropdown from '@/components/form/dropdown'
import Textbox from '@/components/form/textbox'
import states from '@/features/states.json'
import { useFormStatus } from 'react-dom'
import { Address } from '@/payload-types'
import type { FC } from 'react'
import Link from 'next/link'
import Button from '@/components/button'

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
  const { pending } = useFormStatus()

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
            editing address
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
      <div className="grid sm:grid-cols-3 grid-cols-1 gap-5">
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 sm:col-span-3 col-span-1">
          <Textbox
            label="Full Name"
            name="name"
            placeholder="Enter Full Name"
            required
            disabled={pending}
            defaultValue={address?.name}
          />
          <Textbox
            label="Phone"
            placeholder="Enter Phone Number"
            name="phone"
            prefix="+91"
            type="tel"
            pattern="([0]{1})?[6-9]{1}[0-9]{9}"
            required
            disabled={pending}
            defaultValue={address?.phone}
          />
        </div>
        <Textbox
          outerWrapperClassname="sm:col-span-3 col-span-1"
          placeholder="Enter Address"
          label="Address"
          name="address"
          required
          disabled={pending}
          defaultValue={address?.address}
        />
        <Textbox
          label="City"
          name="city"
          placeholder="Enter City"
          required
          disabled={pending}
          defaultValue={address?.city}
        />
        <Dropdown label="State" name="state" disabled={pending} defaultValue={address?.state}>
          <option>Select State</option>
          {Object.entries(states).map((state) => (
            <option value={state[0]} key={state[0]}>
              {state[1]}
            </option>
          ))}
        </Dropdown>
        <Textbox
          label="Pincode"
          placeholder="Enter Pincode"
          name="pincode"
          number
          max={999999}
          min={100000}
          required
          disabled={pending}
          defaultValue={address?.pincode}
        />
        {address?.id && <input type="hidden" name="id" value={address.id} />}
      </div>
      {editCancelText ? editCancelText : defaultText}
    </>
  )
}

export default CheckoutAddressForm
