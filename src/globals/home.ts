import HeroBlockConfig from '@/blocks/hero/config'
import ProductsBlockConfig from '@/blocks/products/config'
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
      blocks: [HeroBlockConfig, ProductsBlockConfig],
      name: 'pageBlocks',
    },
  ],
  slug: 'home-page-options',
  hooks: {
    afterChange: [() => revalidatePath('/')],
  },
}

export default HomePageOptions
