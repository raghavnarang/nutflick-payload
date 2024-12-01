// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Products } from './collections/Products'
import { Categories } from './collections/Categories'
import { Customers } from './collections/Customers'
import { Addresses } from './collections/Addresses'
import ShippingOptions from './globals/shipping'
import { Coupons } from './collections/Coupons'
import { Orders } from './collections/Orders'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { Pages } from './collections/Pages'
import { seoPlugin } from '@payloadcms/plugin-seo'
import HomePageOptions from './globals/home'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Products, Categories, Customers, Addresses, Coupons, Orders, Pages],
  globals: [ShippingOptions, HomePageOptions],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    seoPlugin({
      collections: ['pages', 'products'],
      globals: ['home-page-options'],
      uploadsCollection: 'media',
      generateTitle: ({ doc, collectionSlug }) => {
        if (collectionSlug === 'products') {
          return `Buy ${doc.title} Online | Nutflick - Premium Quality`
        }
        return `${doc.title} | Nutflick`
      },
      generateDescription: ({ doc }) => doc.excerpt,
    }),
  ],
  graphQL: { disable: true },
  cors: {
    origins: [process.env.NEXT_PUBLIC_VERCEL_URL!],
  },
  csrf: [process.env.NEXT_PUBLIC_VERCEL_URL!],
  email: nodemailerAdapter({
    defaultFromAddress: 'noreply@nutflick.com',
    defaultFromName: 'Nutflick',
    // Nodemailer transportOptions
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  }),
})
