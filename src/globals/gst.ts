import { isAdmin } from '@/access/is-admin'
import type { GlobalConfig, Field } from 'payload'
import states from '@/features/states.json'
import { revalidateTag } from 'next/cache'

const categoryField: Field = {
  type: 'relationship',
  name: 'category',
  required: true,
  hasMany: true,
  relationTo: 'categories',
}

const businessStateField: Field = {
  type: 'select',
  name: 'state',
  label: 'Business State',
  required: true,
  options: [...Object.entries(states).map(([value, label]) => ({ label, value }))],
}

const rateField: Field = {
  name: 'rate',
  label: 'Rate (in percent)',
  type: 'number',
  required: true,
}

export const GST: GlobalConfig = {
  slug: 'gst',
  label: 'GST',
  fields: [
    businessStateField,
    {
      name: 'categoryGSTSets',
      label: 'Category GST Sets',
      labels: {
        singular: 'Category GST Set',
        plural: 'Category GST Sets',
      },
      type: 'array',
      fields: [rateField, categoryField],
    },
    {
      name: 'restGSTSet',
      label: 'Rest of the GST Set',
      type: 'group',
      fields: [rateField],
    },
  ],
  access: {
    read: isAdmin,
    update: isAdmin,
  },
  hooks: {
    afterChange: [
      () => {
        revalidateTag('gst-rates')
        revalidateTag('gst-category-rate')
      },
    ],
  },
}
