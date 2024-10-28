import LinkCard from '@/components/link-card/card'
import LinkCardContainer from '@/components/link-card/container'
import { redirectIfUnauthenticated } from '@/features/server/auth/me'
import MyAccountHeader from './header'

export default async function MyAccountPage() {
  const customer = await redirectIfUnauthenticated('/account')
  if (!customer) {
    throw new Error('Customer data not available')
  }

  return (
    <div className="flex justify-center">
      <div className="max-w-7xl w-full">
        <MyAccountHeader title="My Account" email={customer.email} />
        <LinkCardContainer>
          <LinkCard
            title="Your Orders"
            description="View or track your orders"
            link="/account/orders"
          />
          <LinkCard
            title="Your Addresses"
            description="Manage your addresses"
            link="/account/addresses"
          />
        </LinkCardContainer>
      </div>
    </div>
  )
}
