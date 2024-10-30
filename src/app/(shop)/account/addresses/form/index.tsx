import Button from '@/components/button'
import AddressForm from '@/components/form/address'
import Checkbox from '@/components/form/checkbox'
import { Address } from '@/payload-types'
import MyAccountAddressFormElement from './client'

export default function MyAccountAddressForm({
  address,
  isPreferred = false,
}: {
  address?: Address
  isPreferred?: boolean
}) {
  return (
    <MyAccountAddressFormElement>
      <AddressForm address={address} />
      <Checkbox
        label="Prefer this address for future orders"
        wrapperClassName="mt-6"
        name="is_preferred"
        defaultChecked={isPreferred}
      />
      <div className="mt-10 flex gap-4">
        <Button>Save Address</Button>
        <Button isSecondary type="reset">
          Reset
        </Button>
      </div>
    </MyAccountAddressFormElement>
  )
}
