import type { Block } from 'payload'

const HeroBlockConfig: Block = {
  slug: 'Hero',
  fields: [
    {
      type: 'relationship',
      relationTo: 'products',
      name: 'product',
      hasMany: false,
      required: true,
    },
    {
      type: 'text',
      name: 'titleLeft',
      required: true,
    },
    {
      type: 'text',
      name: 'titleRight',
      required: true,
    },
    {
      type: 'text',
      name: 'tag',
      required: true,
    },
    {
      type: 'text',
      name: 'description',
      required: true,
    },
  ],
}

export default HeroBlockConfig
