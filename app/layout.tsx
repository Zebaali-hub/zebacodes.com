import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import '@fontsource/geist/300.css'
import '@fontsource/geist/400.css'
import '@fontsource/geist/500.css'
import '@fontsource/geist/600.css'
import '@fontsource/geist-mono/400.css'
import '@fontsource/geist-mono/500.css'
import './globals.css'
import './visual-polish.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://zebacodes.com'),
  title: {
    default: 'Zeba Ali — Backend Engineer',
    template: '%s — Zeba Ali',
  },
  description: 'Zeba Ali is a backend engineer building Java, Spring Boot, distributed systems, and database-heavy software.',
  authors: [{ name: 'Zeba Ali' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://zebacodes.com',
    siteName: 'Zeba Ali',
    title: 'Zeba Ali — Backend Engineer',
    description: 'Java · Spring Boot · Distributed Systems · Databases',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Zeba Ali — Backend Engineer' }],
  },
  twitter: { card: 'summary_large_image', title: 'Zeba Ali — Backend Engineer', description: 'Java · Spring Boot · Distributed Systems · Databases', images: ['/opengraph-image'] },
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={playfair.variable}>
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1 pt-[58px]" id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
