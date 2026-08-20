'use client'

import { useState } from 'react'
import { Activity, Box, CircleDotDashed, CloudCog, Database, Gauge, Layers3, RotateCcw, ShieldCheck } from 'lucide-react'

const layers = [
  { name: 'Client', note: 'Intent enters the system', icon: CircleDotDashed },
  { name: 'API', note: 'Contract · identity · validation', icon: ShieldCheck },
  { name: 'Service layer', note: 'Coordination and boundaries', icon: Layers3 },
  { name: 'Business logic', note: 'Rules, invariants, state', icon: Box },
  { name: 'Data · Events · Cache', note: 'Durability, decoupling, speed', icon: Database },
  { name: 'Observability', note: 'Metrics · logs · traces', icon: Activity },
]

export function SystemThinking() {
  const [active, setActive] = useState(2)
  return (
    <section className="section thinking-section" id="thinking">
      <div className="site-container thinking-grid">
        <div className="thinking-copy"><p className="section-label"><span>04</span> How I think about backend systems</p><h2>Every layer earns its place.</h2><p>This is a mental model, not a claim that every project needs the same architecture. Start with the path of a request, then make state, failure, and evidence explicit.</p><div className="failure-legend"><span><Gauge size={15} /> timeout</span><span><RotateCcw size={15} /> retry</span><span><CloudCog size={15} /> event</span></div></div>
        <div className="system-stack" role="list" aria-label="Backend system mental model">
          {layers.map(({ name, note, icon: Icon }, i) => <button key={name} role="listitem" className={active === i ? 'active' : ''} onClick={() => setActive(i)} onFocus={() => setActive(i)}><span>0{i + 1}</span><Icon size={20} /><strong>{name}</strong><small>{note}</small></button>)}
          <div className="infra-rail"><span>Docker</span><span>Kubernetes</span><em>failure crosses boundaries</em></div>
        </div>
      </div>
    </section>
  )
}
