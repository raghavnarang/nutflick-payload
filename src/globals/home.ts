import HeroBlockConfig from '@/blocks/hero/config'
import ProductsBlockConfig from '@/blocks/products/config'
import SyncCartBlockConfig from '@/blocks/sync-cart/config'
import { revalidatePath } from 'next/cache'
import { GlobalConfig } from 'payload'

const HomePageOptions: GlobalConfig = {
  access: {
    read: ({ req: { user } }) => user?.collection === 'users',
    update: ({ req: { user } }) => user?.collection === 'users',
  },
  fields: [
    {
      type: 'blocks',
      blocks: [HeroBlockConfig, ProductsBlockConfig, SyncCartBlockConfig],
      name: 'pageBlocks',
    },
  ],
  slug: 'home-page-options',
  hooks: {
    afterChange: [() => revalidatePath('/')],
  },
}

export default HomePageOptions
