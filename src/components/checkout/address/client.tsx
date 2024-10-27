'use client'

import { FC, useState } from 'react'
import CheckoutAddressForm from './add-edit-form'
import { Address } from '@/payload-types'
import CheckoutAddressPrefilled from './prefilled'
import CheckoutSelectAddress from './select-from-list'
import { GuestEmailMode, useCheckoutStore } from '@/features/checkout/store'

interface CheckoutAddressClientProps {
  address?: Address
  isLoggedIn?: boolean
  addresses: Address[]
}

enum Mode {
  SELECT,
  EDIT,
  DEFAULT,
}

const CheckoutAddressClient: FC<CheckoutAddressClientProps> = ({
  address,
  isLoggedIn,
  addresses,
}) => {
  const [mode, setMode] = useState(Mode.DEFAULT)
  const [defaultAddress, setDefaultAddress] = useState<Address | undefined>(address)
  const guestEmailMode = useCheckoutStore((state) => state.guestEmailMode)

  if (guestEmailMode === GuestEmailMode.NEW) {
    return <CheckoutAddressForm isLoggedIn={isLoggedIn} />
  }

  if (mode === Mode.SELECT && addresses.length > 0) {
    return (
      <CheckoutSelectAddress
        addresses={addresses}
        onSelect={(address) => {
          setDefaultAddress(address)
          setMode(Mode.DEFAULT)
        }}
        onCancel={() => setMode(Mode.DEFAULT)}
        selectedAddressId={defaultAddress?.id}
      />
    )
  }

  if (defaultAddress && mode === Mode.DEFAULT) {
    return (
      <CheckoutAddressPrefilled
        address={defaultAddress}
        onEdit={() => setMode(Mode.EDIT)}
        isLoggedIn={isLoggedIn}
        onSelect={addresses.length > 0 ? () => setMode(Mode.SELECT) : undefined}
      />
    )
  }

  return (
    <CheckoutAddressForm
      address={defaultAddress}
      onEditCancel={() => setMode(Mode.DEFAULT)}
      isLoggedIn={isLoggedIn}
      onSelect={addresses.length > 0 ? () => setMode(Mode.SELECT) : undefined}
    />
  )
}

export default CheckoutAddressClient
