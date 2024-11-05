'use client'

import { Address } from '@/payload-types'
import Textbox from './textbox'
import Dropdown from './dropdown'
import { useFormStatus } from 'react-dom'
import states from '@/features/states.json'

export default function AddressForm({ address }: { address?: Address }) {
  const { pending } = useFormStatus()

  return (
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
  )
}
