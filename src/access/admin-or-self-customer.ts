import type { Access } from 'payload'

export const isAdminOrSelfCustomer: Access = ({ req: { user } }) => {
  if (user?.collection === 'customers') {
    return {
      customer: {
        equals: user.id,
      },
    }
  }

  return user?.collection === 'users'
}
