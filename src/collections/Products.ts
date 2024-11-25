import { isAdmin } from '@/access/is-admin'
import formatSlug from '@/utils/format-slug'
import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
    preview: (doc) => `/product/${doc?.slug}`,
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
      type: 'tabs',
      tabs: [
        {
          label: 'Product',
          fields: [
            {
              name: 'slug',
              type: 'text',
              index: true,
              required: true,
              unique: true,
            },
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            { name: 'description', type: 'textarea', required: true },
            { name: 'category', type: 'relationship', relationTo: ['categories'] },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              admin: { position: 'sidebar' },
              required: true,
            },
            {
              name: 'bigImage',
              type: 'upload',
              relationTo: 'media',
              admin: { position: 'sidebar' },
            },
          ],
        },
        {
          label: 'Variants',
          fields: [
            {
              name: 'variants',
              type: 'array',
              minRows: 1,
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      required: true,
                    },
                    { name: 'weight', label: 'Weight (in Kgs.)', type: 'number', required: true },
                    { name: 'price', label: 'Price (in Rs.)', type: 'number', required: true },
                    { name: 'comparePrice', label: 'Compare Price (in Rs.)', type: 'number' },
                    {
                      name: 'includedShippingCost',
                      label: 'Included Shipping Cost (in Rs.)',
                      type: 'number',
                    },
                  ],
                },
                {
                  name: 'slug',
                  type: 'text',
                  index: true,
                  required: true,
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                },
                { name: 'bigImage', type: 'upload', relationTo: 'media' },
              ],
              labels: {
                singular: 'Variant',
                plural: 'Variants',
              },
            },
          ],
        },
      ],
    },
  ],
}
