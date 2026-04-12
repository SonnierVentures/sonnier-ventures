import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Allow images from Supabase Storage and Stripe CDN
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: 'files.stripe.com' },
    ],
  },
  // Required for Stripe webhook raw body parsing
  experimental: {},
}

export default nextConfig
