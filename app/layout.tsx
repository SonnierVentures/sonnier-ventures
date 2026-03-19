import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sonnier Ventures',
  description: 'Building AI infrastructure, developer tooling, and SaaS products.',
  openGraph: {
    title: 'Sonnier Ventures',
    description: 'Building AI infrastructure, developer tooling, and SaaS products.',
    url: 'https://sonnierventures.com',
    siteName: 'Sonnier Ventures',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sonnier Ventures',
    description: 'Building AI infrastructure, developer tooling, and SaaS products.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}
