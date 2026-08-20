'use client'

import { useState } from 'react'
import { Activity, Box, Braces, Database, Radio, Server, Waves } from 'lucide-react'

const nodes = [
  { id: 'api', label: 'API', tech: 'Spring Boot', detail: 'Contracts, validation, identity', icon: Braces, pos: 'orbit-api' },
  { id: 'service', label: 'SERVICE', tech: 'Java', detail: 'Business rules and state', icon: Server, pos: 'orbit-service' },
  { id: 'events', label: 'EVENTS', tech: 'Kafka', detail: 'Asynchronous state changes', icon: Radio, pos: 'orbit-events' },
  { id: 'database', label: 'DATABASE', tech: 'PostgreSQL', detail: 'Durable source of truth', icon: Database, pos: 'orbit-database' },
  { id: 'cache', label: 'CACHE', tech: 'Redis', detail: 'Fast, disposable derived state', icon: Waves, pos: 'orbit-cache' },
  { id: 'observe', label: 'OBSERVE', tech: 'Prometheus', detail: 'Metrics make behavior visible', icon: Activity, pos: 'orbit-observe' },
]

export default function SystemOrbit() {
  const [active, setActive] = useState('service')
  const selected = nodes.find((node) => node.id === active) ?? nodes[1]

  return (
    <div className="system-orbit" aria-label="Interactive distributed backend system map">
      <svg className="orbit-lines" viewBox="0 0 700 560" aria-hidden="true">
        <path d="M350 280 L350 78 M350 280 L573 166 M350 280 L573 400 M350 280 L350 505 M350 280 L128 400 M350 280 L128 166" />
        <path className="event-line" d="M128 166 C240 30 470 30 573 166" />
        <path className="event-line delay" d="M573 400 C470 535 235 535 128 400" />
      </svg>
      <button className="orbit-core" onFocus={() => setActive('service')} onMouseEnter={() => setActive('service')} aria-label="System core: Java service layer">
        <Box size={25} />
        <strong>SYSTEM</strong>
        <span>request · state · event</span>
      </button>
      {nodes.map(({ id, label, tech, detail, icon: Icon, pos }) => (
        <button key={id} className={`orbit-node ${pos} ${active === id ? 'is-active' : ''}`} onClick={() => setActive(id)} onFocus={() => setActive(id)} onMouseEnter={() => setActive(id)} aria-pressed={active === id}>
          <Icon size={17} />
          <span>{label}</span>
          <small>{tech}</small>
          <span className="sr-only">{detail}</span>
        </button>
      ))}
      <div className="orbit-caption" aria-live="polite">
        <span>{selected.label}</span>
        <strong>{selected.tech}</strong>
        <p>{selected.detail}</p>
      </div>
    </div>
  )
}
