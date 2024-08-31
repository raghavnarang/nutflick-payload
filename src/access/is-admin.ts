import type { Access } from 'payload'

export const isAdmin: Access = ({ req: { user } }) => {
  // Return true or false based on if the user has an admin role
  return user?.collection === 'users'
}
