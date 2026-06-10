'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

const links = [
  { href: '/blog',      label: 'Blog'      },
  { href: '/journey',   label: 'Journey'   },
  { href: '/resources', label: 'Resources' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b ${
        scrolled
          ? 'bg-[#0c0c0c]/95 backdrop-blur-sm border-[#1f1f1f]'
          : 'bg-[#0c0c0c]/80 backdrop-blur-sm border-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center text-sm font-medium text-[#f2f2f2] hover:text-[#f2f2f2] transition-colors"
        >
          Zeba Ali
          <span className="text-[#e11d48] ml-0.5 leading-none">·</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                pathname === link.href || pathname.startsWith(link.href + '/')
                  ? 'text-[#f2f2f2]'
                  : 'text-[#9a9a9a] hover:text-[#f2f2f2]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://github.com/zebacodes"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#9a9a9a] hover:text-[#f2f2f2] transition-colors"
          >
            GitHub ↗
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 text-[#9a9a9a] hover:text-[#f2f2f2] transition-colors"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-[#1f1f1f] bg-[#0c0c0c]"
          >
            <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm transition-colors ${
                    pathname === link.href || pathname.startsWith(link.href + '/')
                      ? 'text-[#f2f2f2]'
                      : 'text-[#9a9a9a]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://github.com/zebacodes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#9a9a9a]"
              >
                GitHub ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
