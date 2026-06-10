'use client'

import { useState, useEffect } from 'react'

type Heading = { level: number; text: string; id: string }

function ToCItems({ headings, active }: { headings: Heading[]; active?: string }) {
  return (
    <ul className="space-y-2">
      {headings.map((h) => (
        <li key={h.id} className={h.level === 3 ? 'pl-3' : ''}>
          <a
            href={`#${h.id}`}
            className="block font-mono text-[11px] leading-snug transition-colors duration-150"
            style={{ color: active === h.id ? '#c8f000' : 'rgba(240,235,224,0.3)' }}
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  )
}

export function DesktopToC({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string | undefined>()

  useEffect(() => {
    if (headings.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '0px 0px -65% 0px', threshold: 0 }
    )
    headings.forEach((h) => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <div>
      <p
        className="font-mono text-[10px] uppercase tracking-[0.14em] mb-4"
        style={{ color: 'rgba(240,235,224,0.25)' }}
      >
        On this page
      </p>
      <ToCItems headings={headings} active={active} />
    </div>
  )
}

export function MobileToC({ headings }: { headings: Heading[] }) {
  const [open, setOpen] = useState(false)
  if (headings.length === 0) return null

  return (
    <div
      className="mb-8 rounded-[6px] p-4 lg:hidden"
      style={{ border: '1px solid rgba(240,235,224,0.07)' }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full"
      >
        <span
          className="font-mono text-[10px] uppercase tracking-[0.14em]"
          style={{ color: 'rgba(240,235,224,0.28)' }}
        >
          On this page
        </span>
        <span
          className="font-mono text-[10px]"
          style={{ color: 'rgba(240,235,224,0.28)' }}
        >
          {open ? '▲' : '▼'}
        </span>
      </button>
      {open && (
        <div className="mt-4">
          <ToCItems headings={headings} />
        </div>
      )}
    </div>
  )
}
