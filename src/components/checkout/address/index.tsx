'use client'

import Section from '@/components/section'
import { FC, useState } from 'react'
import CheckoutAddressForm from './add-edit-form'
import { Address } from '@/payload-types'
import CheckoutAddressPrefilled from './prefilled'

interface CheckoutAddressProps {
  address?: Address
}

enum Mode {
  SELECT,
  EDIT,
  DEFAULT,
}

const CheckoutAddress: FC<CheckoutAddressProps> = ({ address }) => {
  const [mode, setMode] = useState(Mode.DEFAULT)
  const [defaultAddress, setDefaultAddress] = useState<Address | undefined>(address)

  // if (mode === Mode.SELECT && selectMode === SelectMode.DEFAULT) {
  //   return (
  //     <Section title="Delivery Address">
  //       <CheckoutSelectAddress
  //         selectedAddressId={address?.id}
  //         onAddNew={() => setSelectMode(SelectMode.ADD)}
  //         onSuccess={() => {
  //           setMode(Mode.DEFAULT)
  //           setSelectMode(SelectMode.DEFAULT)
  //         }}
  //         onCancel={() => {
  //           setMode(Mode.DEFAULT)
  //           setSelectMode(SelectMode.DEFAULT)
  //         }}
  //         onEditAddress={(address) => {
  //           setEditAddress(address)
  //           setSelectMode(SelectMode.EDIT)
  //         }}
  //       />
  //     </Section>
  //   )
  // }

  // if (
  //   !address ||
  //   mode === Mode.EDIT ||
  //   (mode === Mode.SELECT && selectMode === SelectMode.ADD) ||
  //   (mode === Mode.SELECT && selectMode === SelectMode.EDIT && editAddress)
  // ) {
  // return (
  //   <Section title="Delivery Address">
  //     <CheckoutAddressForm address={defaultAddress} />
  //   </Section>
  // )
  // }

  if ((!defaultAddress && mode === Mode.DEFAULT) || (defaultAddress && mode === Mode.EDIT)) {
    return (
      <Section title="Delivery Address">
        <CheckoutAddressForm address={defaultAddress} onEditCancel={() => setMode(Mode.DEFAULT)} />
      </Section>
    )
  }

  if (defaultAddress && mode === Mode.DEFAULT) {
    return (
      <Section title="Delivery Address">
        <CheckoutAddressPrefilled address={defaultAddress} onEdit={() => setMode(Mode.EDIT)} />
      </Section>
    )
  }

  return null
}

export default CheckoutAddress
