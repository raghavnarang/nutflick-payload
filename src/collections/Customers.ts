import { isAdminOrSelfCustomer } from '@/access/admin-or-self-customer'
import {
  getResetPasswordEmailHTML,
  getResetPasswordEmailSubject,
} from '@/features/server/auth/forgot-pass-email'
import {
  getVerificationEmailHTML,
  getVerificationEmailSubject,
} from '@/features/server/auth/verification-email'
import type { CollectionConfig } from 'payload'

// Expire after 2 week
const tokenExpiration = 2 * 7 * 24 * 60 * 60

export const Customers: CollectionConfig = {
  slug: 'customers',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create: ({ req: { user } }) => user?.collection === 'users',
    read: ({ req: { user } }) => user?.collection === 'customers' || user?.collection === 'users',
    update: ({ req: { user } }) => user?.collection === 'users',
    delete: ({ req: { user } }) => user?.collection === 'users',
  },
  auth: {
    verify: {
      generateEmailHTML({ token, user }) {
        return getVerificationEmailHTML(user.email, token)
      },
      generateEmailSubject: getVerificationEmailSubject,
    },
    forgotPassword: {
      generateEmailHTML({ token, user } = {}) {
        if (!user || !token) {
          throw new Error('Unable to send forgot password email')
        }
        return getResetPasswordEmailHTML(user.email, token)
      },
      generateEmailSubject: getResetPasswordEmailSubject,
    },
    tokenExpiration,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      type: 'relationship',
      name: 'preferredAddress',
      relationTo: 'addresses',
      hasMany: false,
      filterOptions: ({ id }) => {
        // id is not available during creation
        if (!id) {
          return false
        }
        return {
          customer: { equals: id },
        }
      },
    },
    {
      type: 'relationship',
      name: 'pendingOrder',
      relationTo: 'orders',
      hasMany: false,
      filterOptions: ({ id }) => {
        // id is not available during creation
        if (!id) {
          return false
        }
        return {
          customer: { equals: id },
        }
      },
    },
  ],
}
