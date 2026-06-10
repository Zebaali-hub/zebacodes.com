'use client'

import { useState } from 'react'

export default function NewsletterSignup({ variant = 'inline' }: { variant?: 'inline' | 'compact' }) {
  const [email, setEmail]   = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'already' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@')) return
    setStatus('loading')
    try {
      const res  = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) { setStatus('error'); return }
      setStatus(data.already ? 'already' : 'success')
      if (!data.already) setEmail('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return <p className="font-mono text-xs text-[#4a4a4a]">✓ You&apos;re in.</p>
  }
  if (status === 'already') {
    return <p className="font-mono text-xs text-[#4a4a4a]">Already subscribed.</p>
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 flex-wrap">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="bg-[#141414] border border-[#2a2a2a] text-sm px-4 py-2 rounded text-[#f2f2f2] placeholder-[#4a4a4a] focus:border-[#e11d48] outline-none transition-colors flex-1 min-w-[180px]"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="bg-[#e11d48] text-white text-sm px-4 py-2 rounded hover:bg-[#be123c] transition-colors disabled:opacity-60 whitespace-nowrap"
      >
        {status === 'loading' ? 'Subscribing…' : 'Subscribe →'}
      </button>
      {status === 'error' && (
        <p className="w-full font-mono text-xs text-[#e11d48]">Something went wrong. Try again.</p>
      )}
    </form>
  )
}
