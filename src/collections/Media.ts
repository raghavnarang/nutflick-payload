import { isAdmin } from '@/access/is-admin'
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    components: {
      beforeListTable: ['/components/admin/regenerate-images'],
    },
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    formatOptions: {
      format: 'png',
      options: {
        quality: 20,
      },
    },
  },
}
