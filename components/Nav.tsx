'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { label: 'home',       href: '/',          external: false },
  { label: 'writing',    href: '/writing',   external: false },
  { label: 'projects',   href: '/projects',  external: false },
  { label: 'journey',    href: '/journey',   external: false },
  { label: 'resources',  href: '/resources', external: false },
  { label: 'GitHub ↗',   href: 'https://github.com/zebacodes', external: true },
]

export default function Nav() {
  const path  = usePathname()
  const [open, setOpen] = useState(false)

  function isActive(href: string) {
    if (href === '/') return path === '/'
    return path === href || path.startsWith(href + '/')
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-14"
      style={{
        background:    'rgba(10,10,10,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom:  '1px solid rgba(240,235,224,0.06)',
      }}
    >
      <div className="flex items-center justify-between h-full px-6 sm:px-12">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium"
          style={{ color: '#f0ebe0' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] inline-block flex-shrink-0" />
          Zeba Ali
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-9 list-none">
          {links.map(({ label, href, external }) => (
            <li key={label}>
              <Link
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="text-[13px] font-normal transition-colors duration-150"
                style={{ color: isActive(href) ? '#f0ebe0' : 'rgba(240,235,224,0.35)' }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div
          className="hidden md:block font-mono text-[11px] tracking-wide"
          style={{ color: 'rgba(240,235,224,0.22)' }}
        >
          Noida · open to work
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2"
          style={{ color: 'rgba(240,235,224,0.5)' }}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden px-6 py-5 flex flex-col gap-5 border-t"
          style={{ background: 'rgba(10,10,10,0.98)', borderColor: 'rgba(240,235,224,0.07)' }}
        >
          {links.map(({ label, href, external }) => (
            <Link
              key={label}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              onClick={() => setOpen(false)}
              className="text-[13px] font-normal"
              style={{ color: isActive(href) ? '#f0ebe0' : 'rgba(240,235,224,0.38)' }}
            >
              {label}
            </Link>
          ))}
          <span className="font-mono text-[11px]" style={{ color: 'rgba(240,235,224,0.22)' }}>
            Noida · open to work
          </span>
        </div>
      )}
    </nav>
  )
}
