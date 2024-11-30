import { isAdmin } from '@/access/is-admin'
import { HTMLConverterFeature, lexicalEditor, lexicalHTML } from '@payloadcms/richtext-lexical'
import { revalidateTag } from 'next/cache'
import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    preview: (doc) => `/page/${doc?.slug}`,
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
      },
    ],
  },
  fields: [
    { type: 'text', name: 'title', required: true },
    { type: 'text', name: 'slug', required: true, index: true },
    {
      name: 'content',
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
    lexicalHTML('content', { name: 'content_html' }),
  ],
}
