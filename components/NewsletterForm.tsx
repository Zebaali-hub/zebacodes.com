'use client'

import { useState } from 'react'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  async function submit() {
    if (!email.includes('@')) return
    setState('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setState(res.ok ? 'done' : 'error')
    } catch {
      setState('error')
    }
  }

  if (state === 'done') {
    return (
      <p className="font-mono text-[12px]" style={{ color: 'rgba(232,228,220,0.45)' }}>
        You&apos;re in. ✓
      </p>
    )
  }

  return (
    <div className="flex shrink-0 flex-wrap gap-0">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && submit()}
        placeholder="your@email.com"
        className="font-mono text-[12px] px-4 py-2.5 w-[220px] outline-none rounded-l-md"
        style={{
          background:   'rgba(232,228,220,0.04)',
          border:       '1px solid rgba(232,228,220,0.1)',
          borderRight:  'none',
          color:        'rgba(232,228,220,0.7)',
        }}
      />
      <button
        onClick={submit}
        disabled={state === 'loading'}
        className="font-sans text-[12px] font-medium px-5 py-2.5 rounded-r-md transition-all duration-150 disabled:opacity-60"
        style={{ background: '#f5f1e8', color: '#0c0c0c' }}
      >
        {state === 'loading' ? '…' : 'Subscribe →'}
      </button>
      {state === 'error' && (
        <p className="w-full font-mono text-[11px] mt-2" style={{ color: '#6495ff' }}>
          Something went wrong. Try again.
        </p>
      )}
    </div>
  )
}
