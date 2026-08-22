'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Code2, Menu, X } from 'lucide-react'

const links = [
  { label: 'Home', href: '/' }, { label: 'Projects', href: '/projects' }, { label: 'Writing', href: '/writing' },
  { label: 'Roadmaps', href: '/roadmaps' }, { label: 'Journey', href: '/journey' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isActive = (href: string) => href === '/' ? pathname === '/' : !href.includes('#') && pathname.startsWith(href)
  return <header className="site-nav"><nav className="site-container" aria-label="Primary navigation">
    <Link href="/" className="nav-brand" onClick={() => setOpen(false)}><span /><strong>Zeba Ali</strong></Link>
    <div id="mobile-navigation" className={`nav-links ${open ? 'is-open' : ''}`}>{links.map((link) => <Link key={link.label} href={link.href} className={isActive(link.href) ? 'is-active' : ''} onClick={() => setOpen(false)}>{link.label}</Link>)}<a className="nav-github" href="https://github.com/Zebaali-hub" target="_blank" rel="noreferrer"><Code2 size={16} /> GitHub ↗</a></div>
    <p className="nav-status">Noida · open to work</p><button className="nav-toggle" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Close navigation' : 'Open navigation'}>{open ? <X /> : <Menu />}</button>
  </nav></header>
}
