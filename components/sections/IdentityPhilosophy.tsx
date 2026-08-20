import { Activity, Braces, Database, Network, Radio } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'

const identity = [
  { label: 'Backend', value: 'Java + Spring Boot', icon: Braces },
  { label: 'Systems', value: 'Distributed architecture', icon: Network },
  { label: 'Data', value: 'PostgreSQL + Oracle + Redis', icon: Database },
  { label: 'Events', value: 'Kafka', icon: Radio },
  { label: 'Reliability', value: 'Observe + handle failure', icon: Activity },
]

const principles = [
  ['Correctness', 'Make invariants and state transitions explicit before optimizing the happy path.'],
  ['Scalability', 'Scale the constrained boundary, not every component by default.'],
  ['Observability', 'A system is not understood until its behavior can be explained from evidence.'],
  ['Simplicity', 'Prefer the smallest design that keeps failure and change manageable.'],
]

export function IdentityPhilosophy() {
  return (
    <>
      <section className="identity-strip" aria-label="Engineering identity">
        <div className="site-container identity-grid">
          {identity.map(({ label, value, icon: Icon }) => <div key={label}><Icon size={17} /><span>{label}</span><strong>{value}</strong></div>)}
        </div>
      </section>
      <section className="section philosophy" id="principles">
        <div className="site-container split-heading">
          <Reveal className="section-kicker"><span>02</span> Engineering, with intent</Reveal>
          <Reveal className="philosophy-copy">
            <h2>I enjoy building systems where correctness, failure handling, performance and observability matter.</h2>
            <p>Good backend engineering is less about collecting infrastructure and more about knowing where state lives, what can fail, and how the system tells you the truth.</p>
          </Reveal>
        </div>
        <div className="site-container principle-grid">
          {principles.map(([title, text], i) => <Reveal key={title} className="principle" delay={i * 0.06}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p></Reveal>)}
        </div>
      </section>
    </>
  )
}
