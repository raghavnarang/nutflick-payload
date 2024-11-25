import { GlobalConfig } from 'payload'

const HomePageOptions: GlobalConfig = {
  access: {
    read: ({ req: { user } }) => user?.collection === 'users',
    update: ({ req: { user } }) => user?.collection === 'users',
  },
  fields: [],
  slug: 'home-page-options',
}

export default HomePageOptions
