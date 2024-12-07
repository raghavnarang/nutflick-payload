import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
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
    imageSizes: [
      {
        name: 'optimised',
        generateImageName: ({ originalName, extension }) =>
          `${originalName}-optimised.${extension}`,
        width: 500,
      },
    ],
  },
}
