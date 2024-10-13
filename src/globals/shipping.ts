import { GlobalConfig } from 'payload'

const ShippingOptions: GlobalConfig = {
  access: {
    read: () => true,
    // Is Admin
    update: ({ req: { user } }) => user?.collection === 'users',
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
          name: 'rate',
          type: 'number',
          required: true,
        },
        {
          name: 'days',
          label: 'Estimated Days',
          type: 'number',
        },
      ],
    },
  ],
  slug: 'shipping-options',
}

export default ShippingOptions
