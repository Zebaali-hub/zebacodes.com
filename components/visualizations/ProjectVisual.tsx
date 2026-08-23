'use client'

import { useState } from 'react'
import type { Project } from '@/data/portfolio'

const orderNodes = [
  ['gateway', 'Gateway', 'Routes API traffic, validates JWTs, and applies Redis-backed rate limits.'],
  ['user', 'User', 'Owns registration, login, refresh tokens, and user profiles.'],
  ['order', 'Order', 'Owns order state, idempotent placement, and the transactional outbox.'],
  ['restaurant', 'Restaurant', 'Consumes order events and serves cached menu data.'],
  ['payment', 'Payment', 'Consumes order.placed and emits authorization or failure.'],
  ['delivery', 'Delivery', 'Finds nearby drivers through Redis GEO after confirmation.'],
  ['tracking', 'Tracking', 'Relays driver.location events to clients over STOMP/WebSocket.'],
  ['kafka', 'Kafka', 'Carries order, payment, delivery, and driver-location events.'],
] as const

export function ProjectVisual({ type }: { type: Project['visual'] }) {
  const [selected, setSelected] = useState('order')
  if (type === 'topology') {
    const active = orderNodes.find(([id]) => id === selected) ?? orderNodes[2]
    return <div className="project-visual topology-visual" aria-label="Interactive OrderFlow service topology">
      <svg viewBox="0 0 900 320" aria-hidden="true"><path d="M450 45 L450 105 M450 105 L110 180 M450 105 L285 180 M450 105 L450 180 M450 105 L615 180 M450 105 L790 180 M285 215 L450 270 M450 215 L450 270 M615 215 L450 270 M790 215 L450 270" /><path className="topology-event" d="M285 195 C360 150 520 150 615 195 C550 245 510 265 450 275" /></svg>
      {orderNodes.map(([id, label]) => <button key={id} className={`visual-node node-${id} ${selected === id ? 'active' : ''}`} onClick={() => setSelected(id)} aria-pressed={selected === id}>{label}</button>)}
      <div className="topology-detail" aria-live="polite"><span>{active[1]}</span><p>{active[2]}</p></div>
    </div>
  }
  if (type === 'load') return <div className="project-visual load-visual" aria-label="Concurrent database load visualization"><div className="load-connections">{Array.from({ length: 9 }, (_, i) => <span key={i}>worker {String(i + 1).padStart(2, '0')}</span>)}</div><div className="load-database">JDBC target</div><div className="load-bars">{[42, 66, 51, 82, 61, 88, 72, 94, 68, 79].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div><div className="load-labels"><span>connections</span><span>p50</span><span>p95</span><span>p99</span></div></div>
  if (type === 'logs') return <div className="project-visual log-visual" aria-label="Log parsing pipeline visualization"><code>ORA-00600 → KERNEL</code><code>deadlock → CONCURRENCY</code><code>GC overhead → MEMORY</code><div><span>logs</span><span>parse</span><span>patterns</span><span>diagnostics</span></div></div>
  if (type === 'pipeline') return <div className="project-visual pipeline-visual" aria-label="Job workflow pipeline visualization">{['Discover', 'Explain', 'Track', 'Prepare'].map((x, i) => <span key={x}><b>0{i + 1}</b>{x}</span>)}</div>
  if (type === 'resource') return <div className="project-visual pipeline-visual" aria-label="Java backend engineering learning path visualization">{['Collections', 'JVM & GC', 'Concurrency', 'Backend systems'].map((x, i) => <span key={x}><b>0{i + 1}</b>{x}</span>)}</div>
  return <div className="project-visual loop-visual" aria-label="Learning feedback loop visualization"><span>resume</span><span>extract</span><span>question</span><span>reflect</span><strong>repeat</strong></div>
}
