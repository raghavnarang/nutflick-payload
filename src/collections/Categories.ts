import { isAdmin } from '@/access/is-admin'
import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title'
  },
  access: {
    create: isAdmin,
    read: () => true,
    readVersions: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
  ],
}
