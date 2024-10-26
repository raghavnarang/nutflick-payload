import { redirectIfUnauthenticated } from '@/features/server/auth/me'

export default async function MyAccountPage() {
  await redirectIfUnauthenticated('/account')
  return <p>My Account</p>
}
