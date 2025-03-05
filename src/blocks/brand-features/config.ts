import type { Block } from 'payload'

const BrandFeaturesBlockConfig: Block = {
  slug: 'BrandFeatures',
  interfaceName: 'BrandFeatures',
  fields: [
    { name: 'title', type: 'text' },
    { name: 'subtitle', type: 'text' },
    {
      name: 'features',
      label: 'Features',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'text',
          type: 'text',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}

export default BrandFeaturesBlockConfig
