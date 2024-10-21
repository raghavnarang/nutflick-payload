import {
  getVerificationEmailHTML,
  getVerificationEmailSubject,
} from '@/features/server/auth/verification-email'
import type { CollectionConfig } from 'payload'

export const Customers: CollectionConfig = {
  slug: 'customers',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    verify: {
      generateEmailHTML({ token, user }) {
        return getVerificationEmailHTML(user.email, token)
      },
      generateEmailSubject: getVerificationEmailSubject,
    },
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
  ],
}
