'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CornerDownLeft, Search } from 'lucide-react'
import type { IndexEntry } from './model'

/**
 * ⌘K — search and navigation across every roadmap.
 *
 * Structured retrieval, no model in the loop: deterministic scoring over a
 * few hundred authored nodes. It is instant, free, and cannot invent a
 * result. The model layer will later add phrasing on top of this, not
 * replace it.
 */
export function CommandBar({ index }: { index: IndexEntry[] }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [cursor, setCursor] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  // Opening resets state and focuses. Done in the handler rather than an
  // effect on `open` — setState synchronously inside an effect cascades.
  const openBar = useCallback(() => {
    setQuery('')
    setCursor(0)
    setOpen(true)
  }, [])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((v) => {
          if (v) return false
          setQuery('')
          setCursor(0)
          return true
        })
      }
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (q.length < 2) return []
    const terms = q.split(/\s+/)
    return index
      .map((entry) => {
        const title = entry.title.toLowerCase()
        const body = entry.summary.toLowerCase()
        let score = 0
        for (const t of terms) {
          if (title === t) score += 100
          else if (title.startsWith(t)) score += 60
          else if (title.includes(t)) score += 40
          if (entry.topic.includes(t)) score += 30
          if (body.includes(t)) score += 8
        }
        return { entry, score }
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
  }, [query, index])

  function go(i: number) {
    const hit = results[i]
    if (!hit) return
    setOpen(false)
    router.push(`/roadmaps/${hit.entry.slug}?topic=${hit.entry.topic}`)
  }

  if (!open) {
    return (
      <button type="button" className="cmd-trigger" onClick={openBar}>
        <Search size={14} aria-hidden="true" />
        <span>Search roadmaps</span>
        <kbd className="m">⌘K</kbd>
      </button>
    )
  }

  return (
    <div className="cmd-overlay" role="dialog" aria-modal="true" aria-label="Search"
      onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false) }}>
      <div className="cmd">
        <div className="cmd-input">
          <Search size={16} aria-hidden="true" />
          <input
            ref={inputRef}
            autoFocus
            value={query}
            placeholder="Search every roadmap — try MVCC, thread pool, outbox"
            aria-label="Search every roadmap"
            onChange={(e) => { setQuery(e.target.value); setCursor(0) }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') { e.preventDefault(); setCursor((c) => Math.min(c + 1, results.length - 1)) }
              if (e.key === 'ArrowUp') { e.preventDefault(); setCursor((c) => Math.max(c - 1, 0)) }
              if (e.key === 'Enter') { e.preventDefault(); go(cursor) }
            }}
          />
          <kbd className="m">esc</kbd>
        </div>

        {query.trim().length >= 2 ? (
          results.length > 0 ? (
            <ul className="cmd-results" role="listbox">
              {results.map((r, i) => (
                <li key={`${r.entry.roadmap}/${r.entry.topic}`} role="option" aria-selected={i === cursor}>
                  <button type="button" className={i === cursor ? 'is-cursor' : ''}
                    onMouseEnter={() => setCursor(i)} onClick={() => go(i)}>
                    <span className="cmd-title">{r.entry.title}</span>
                    <span className="cmd-path m">
                      {r.entry.roadmapTitle} → Tier {r.entry.tier}
                    </span>
                    {i === cursor ? <CornerDownLeft size={13} aria-hidden="true" /> : null}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="cmd-empty">
              Nothing in the roadmaps matches that. The graph only answers from authored content.
            </p>
          )
        ) : (
          <div className="cmd-hints">
            <p className="m">Try</p>
            <div>
              {['MVCC', 'thread pool', 'outbox', 'N+1', 'idempotency', 'sliding window'].map((s) => (
                <button key={s} type="button" onClick={() => setQuery(s)}>{s}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
