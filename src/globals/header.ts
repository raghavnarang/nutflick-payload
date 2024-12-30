import { revalidateTag } from 'next/cache'
import { GlobalConfig } from 'payload'

const HeaderSettings: GlobalConfig = {
  access: {
    read: ({ req: { user } }) => user?.collection === 'users',
    update: ({ req: { user } }) => user?.collection === 'users',
  },
  fields: [
    {
      type: 'text',
      name: 'messageStrip',
    },
  ],
  slug: 'header-settings',
  hooks: {
    afterChange: [() => revalidateTag('header')],
  },
}

export default HeaderSettings
