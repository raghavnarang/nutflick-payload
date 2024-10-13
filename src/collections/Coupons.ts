import { isAdmin } from '@/access/is-admin'
import type { CollectionConfig } from 'payload'

export const Coupons: CollectionConfig = {
  slug: 'coupons',
  access: {
    create: isAdmin,
    read: ({ req: { user } }) => {
      if (user?.collection === 'users') {
        return true
      }
      // TODO: Implement is_infinite & max_use logic after order implementation
      return {
        is_active: {
          equals: true,
        },
      }
    },
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'coupon',
  },
  fields: [
    {
      type: 'checkbox',
      name: 'is_active',
      label: 'Active',
      defaultValue: true,
    },
    {
      type: 'row',
      fields: [
        {
          type: 'text',
          required: true,
          name: 'coupon',
          unique: true,
          index: true,
          hooks: {
            beforeValidate: [
              ({ value }) => {
                return value.toUpperCase()
              },
            ],
          },
        },
        {
          type: 'number',
          required: true,
          name: 'value',
        },
        {
          type: 'select',
          required: true,
          name: 'type',
          defaultValue: 'fixed',
          options: [
            {
              value: 'fixed',
              label: 'Fixed',
            },
            {
              value: 'percent',
              label: 'Percent',
            },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Coupon Limits',
      fields: [
        {
          type: 'row',
          fields: [
            {
              type: 'number',
              name: 'min_cart_value',
              label: 'Minimum cart value required for using this coupon',
              defaultValue: 0,
            },
            {
              type: 'number',
              name: 'max_discount',
              label: 'Maximum discount (Upto)',
            },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Coupon Usage',
      fields: [
        {
          type: 'radio',
          name: 'is_infinite',
          required: true,
          label: 'Coupon Usage',
          defaultValue: '1',
          options: [
            {
              value: '1',
              label: 'User can use this coupon infinitely',
            },
            {
              value: '0',
              label: 'User can use this coupon for limited number of times',
            },
          ],
          access: {
            read: ({ req: { user } }) => user?.collection === 'users',
          },
        },
        {
          type: 'number',
          name: 'max_use',
          label: 'Number of usages per user',
          admin: {
            condition: (data) => {
              return data?.is_infinite === '0'
            },
          },
          access: {
            read: ({ req: { user } }) => user?.collection === 'users',
          },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Coupon Visibility',
      fields: [
        {
          type: 'checkbox',
          name: 'checkout_visible',
          label: 'Show coupon on checkout coupons (discount) panel',
          defaultValue: true,
        },
      ],
      access: {
        read: ({ req: { user } }) => user?.collection === 'users',
      },
    },
  ],
}
