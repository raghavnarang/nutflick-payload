import { isAdmin } from '@/access/is-admin'
import { HTMLConverterFeature, lexicalEditor, lexicalHTML } from '@payloadcms/richtext-lexical'
import { revalidatePath, revalidateTag } from 'next/cache'
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
  hooks: {
    afterChange: [
      () => {
        revalidateTag('products')
        revalidatePath('/')
      },
    ],
    afterDelete: [
      () => {
        revalidateTag('products')
      },
    ],
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
            {
              name: 'description',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                  ...defaultFeatures,
                  // The HTMLConverter Feature is the feature which manages the HTML serializers.
                  // If you do not pass any arguments to it, it will use the default serializers.
                  HTMLConverterFeature({}),
                ],
              }),
            },
            lexicalHTML('description', { name: 'description_html' }),
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
