'use client'

import Image from 'next/image'
import { useRef } from 'react'

const nodes = [
  { label: 'API', className: 'portrait-node node-api' },
  { label: 'SERVICE', className: 'portrait-node node-service' },
  { label: 'EVENT', className: 'portrait-node node-event' },
  { label: 'DB', className: 'portrait-node node-db' },
  { label: 'CACHE', className: 'portrait-node node-cache' },
]

export default function PortraitSystem() {
  const frame = useRef<HTMLDivElement>(null)
  function move(event: React.PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    frame.current?.style.setProperty('--rx', `${-y * 4}deg`)
    frame.current?.style.setProperty('--ry', `${x * 4}deg`)
  }
  function reset() {
    frame.current?.style.setProperty('--rx', '0deg')
    frame.current?.style.setProperty('--ry', '0deg')
  }
  return <div ref={frame} className="portrait-system" onPointerMove={move} onPointerLeave={reset}>
    <div className="portrait-grid" aria-hidden="true" />
    <svg className="portrait-connections" viewBox="0 0 560 650" aria-hidden="true"><path d="M70 130 L235 225 L455 125 M235 225 L420 300 L485 505 M235 225 L90 470 M90 470 L310 570 L485 505" /><circle cx="235" cy="225" r="3" /><circle cx="420" cy="300" r="3" /></svg>
    {nodes.map((node) => <span key={node.label} className={node.className}>{node.label}</span>)}
    <div className="portrait-card"><span className="portrait-accent" /><Image src="/zeba-corporate.jpeg" alt="Zeba Ali, backend engineer" fill sizes="(max-width: 768px) 70vw, 360px" priority /></div>
    <div className="portrait-status status-oracle"><span>Oracle RDBMS</span><strong>4 years</strong><small>kernel engineering</small></div>
    <div className="portrait-status status-building"><span>Status</span><strong>Building</strong><small>in public</small></div>
    <div className="portrait-signal" aria-hidden="true"><i /><span>event delivered</span></div>
  </div>
}
