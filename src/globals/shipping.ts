import { revalidateTag } from 'next/cache'
import { GlobalConfig } from 'payload'

const ShippingOptions: GlobalConfig = {
  access: {
    read: () => true,
    // Is Admin
    update: ({ req: { user } }) => user?.collection === 'users',
  },
  hooks: {
    afterChange: [
      () => {
        revalidateTag('shipping-options')
      },
    ],
  },
  fields: [
    {
      type: 'array',
      name: 'option',
      minRows: 1,
      required: true,
      fields: [
        {
          name: 'mode',
          type: 'text',
          required: true,
        },
        {
          name: 'days',
          label: 'Estimated Days',
          type: 'number',
        },
        {
          name: 'rates',
          type: 'array',
          required: true,
          fields: [
            {
              type: 'number',
              required: true,
              name: 'rate',
            },
            {
              type: 'number',
              required: true,
              name: 'weight',
              label: 'Upto Weight (in Kgs.)',
            },
          ],
        },
      ],
    },
  ],
  slug: 'shipping-options',
}

export default ShippingOptions
