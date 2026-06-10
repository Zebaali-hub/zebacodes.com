'use client'

import { useRef, useState } from 'react'

export default function CopyCodeBlock({ children, ...props }: React.ComponentPropsWithoutRef<'pre'>) {
  const preRef = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    if (!preRef.current) return
    navigator.clipboard.writeText(preRef.current.innerText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="relative group">
      <pre ref={preRef} {...props}>
        {children}
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity font-mono text-xs px-2 py-1 rounded bg-[#1a1a1a] border border-[#2a2a2a] text-[#4a4a4a] hover:text-[#f2f2f2] hover:border-[#4a4a4a] transition-colors"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  )
}
