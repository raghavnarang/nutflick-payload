import type { Access } from 'payload'

export const isAdminOrCustomer: Access = ({ req: { user } }) => {
  return ['users', 'customers'].includes(user?.collection || '')
}
