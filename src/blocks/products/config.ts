import type { Block } from 'payload'

const ProductsBlockConfig: Block = {
  slug: 'Products',
  fields: [
    {
      type: 'relationship',
      relationTo: 'products',
      name: 'products',
      hasMany: true,
      required: true,
    },
    {
      type: 'text',
      name: 'title',
      required: true,
    },
    {
      type: 'text',
      name: 'subtitle',
      required: true,
    },
  ],
}

export default ProductsBlockConfig
