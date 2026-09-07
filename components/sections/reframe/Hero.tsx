import dynamic from 'next/dynamic'
import { ArrowUpRight, Mail } from 'lucide-react'

const PortraitSystem = dynamic(() => import('@/components/visualizations/PortraitSystem'))

export function Hero() {
  return (
    <section className="rf-hero" id="top">
      <div className="site-container rf-hero-grid">
        <div className="rf-hero-copy">
          <p className="rf-eyebrow"><i aria-hidden="true" /> Zeba Ali · Noida, India · open to backend roles</p>
          <h1>Backend engineer working at the <em>database</em> and <em className="rf-nowrap">AI-infrastructure</em> layer.</h1>
          <p className="rf-subline">
            Four years inside Oracle&apos;s RDBMS engine — query processing, execution plans, and the first
            parameterized vector-search benchmarking engine at Oracle, measuring recall and latency across
            500+ HNSW/IVF configurations at billion-row scale.
          </p>
          <div className="rf-hero-actions">
            <a className="rf-cta" href="mailto:zebaali1415@gmail.com"><Mail size={17} aria-hidden="true" /> zebaali1415@gmail.com</a>
            <a className="rf-cta-ghost" href="https://github.com/Zebaali-hub" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} aria-hidden="true" /></a>
            <a className="rf-cta-ghost" href="https://linkedin.com/in/zeba-a-7173251a0" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={14} aria-hidden="true" /></a>
          </div>
        </div>

        <div className="hero-system rf-hero-portrait">
          <PortraitSystem />
        </div>
      </div>
    </section>
  )
}
