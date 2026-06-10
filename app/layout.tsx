import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import '@fontsource/geist/300.css'
import '@fontsource/geist/400.css'
import '@fontsource/geist/500.css'
import '@fontsource/geist/600.css'
import '@fontsource/geist-mono/400.css'
import '@fontsource/geist-mono/500.css'
import './globals.css'
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
  title: {
    default: 'Zeba Ali — Backend Engineer',
    template: '%s — Zeba Ali',
  },
  description:
    'Backend engineer. 4 years in Oracle RDBMS engineering (23ai & 19c). Building in public — distributed systems, Java internals, Spring Boot.',
  authors: [{ name: 'Zeba Ali' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://zebacodes.com',
    siteName: 'Zeba Ali',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={playfair.variable}>
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1 pt-[58px]">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
