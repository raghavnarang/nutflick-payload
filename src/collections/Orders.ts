import { isAdmin } from '@/access/is-admin'
import type { CollectionConfig } from 'payload'
import states from '@/features/states.json'

export const Orders: CollectionConfig = {
  slug: 'orders',
  access: {
    create: isAdmin,
    read: ({ req: { user } }) => {
      if (user?.collection === 'users') {
        return true
      }

      if (user?.collection === 'customers') {
        return {
          customer: {
            equals: user.id,
          },
        }
      }

      return false
    },
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      type: 'relationship',
      relationTo: 'customers',
      hasMany: false,
      name: 'customer',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      type: 'collapsible',
      label: 'Address',
      admin: {
        readOnly: true,
      },
      fields: [
        {
          type: 'relationship',
          name: 'addressRef',
          relationTo: 'addresses',
          hasMany: false,
        },
        {
          type: 'row',
          fields: [
            {
              type: 'text',
              name: 'name',
              required: true,
            },
            {
              type: 'textarea',
              name: 'address',
              required: true,
            },
            {
              type: 'text',
              name: 'phone',
              required: true,
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              type: 'text',
              name: 'city',
              required: true,
            },
            {
              type: 'select',
              name: 'state',
              required: true,
              options: Object.entries(states).map(([value, label]) => ({ label, value })),
            },
            {
              type: 'text',
              name: 'pincode',
              required: true,
            },
          ],
        },
      ],
    },
    {
      type: 'array',
      name: 'products',
      required: true,
      admin: {
        readOnly: true,
      },
      fields: [
        {
          type: 'relationship',
          relationTo: 'products',
          name: 'productRef',
          hasMany: false,
        },
        {
          type: 'row',
          fields: [
            {
              type: 'text',
              name: 'variantId',
              required: true,
            },
            {
              type: 'text',
              name: 'title',
              required: true,
            },
            {
              type: 'number',
              name: 'qty',
              required: true,
            },
            {
              type: 'number',
              name: 'price',
              required: true,
            },
            {
              type: 'number',
              name: 'weight',
              required: true,
            },
            {
              type: 'number',
              name: 'includedShippingCost',
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'afterOrder',
      admin: {
        position: 'sidebar',
        description: 'These fields need to be set by admin',
      },
      fields: [
        {
          type: 'text',
          name: 'trackLink',
        },
        {
          type: 'select',
          name: 'status',
          defaultValue: 'processing',
          options: [
            { label: 'Processing', value: 'processing' },
            { label: 'Shipped', value: 'shipped' },
            { label: 'Completed', value: 'completed' },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Coupon',
      admin: { position: 'sidebar', readOnly: true },
      fields: [
        {
          type: 'row',
          fields: [
            {
              type: 'relationship',
              name: 'couponRef',
              relationTo: 'coupons',
              hasMany: false,
            },
            {
              type: 'text',
              name: 'coupon',
            },
            {
              type: 'number',
              name: 'discount',
            },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Shipping',
      admin: { position: 'sidebar', readOnly: true },
      fields: [
        {
          type: 'row',
          fields: [
            {
              type: 'text',
              name: 'mode',
            },
            {
              type: 'number',
              name: 'rate',
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'razorpay',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
      fields: [
        {
          type: 'text',
          name: 'orderId',
        },
        {
          type: 'text',
          name: 'paymentId',
        },
        {
          type: 'text',
          name: 'signature',
        },
        {
          type: 'number',
          name: 'total',
        },
      ],
    },
  ],
}
