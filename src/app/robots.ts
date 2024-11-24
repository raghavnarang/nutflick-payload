import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL!
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        // Cart Checkout
        '/cart',
        '/checkout',

        // Auth
        '/forgot',
        '/login',
        '/logout',
        '/register',
        '/reset',
        '/verify',
        '/verify-done',

        // User Pages
        '/account',

        // Order
        '/order-complete',
        '/payment-complete',
        '/place-order',
        '/verify-payment',

        // Misc
        '/shop-error',

        // Payload
        '/admin',
      ],
    },
    sitemap: baseUrl + '/sitemap.xml',
  }
}
