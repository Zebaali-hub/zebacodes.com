import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowDownRight, ArrowUpRight, Code2, Mail } from 'lucide-react'

const PortraitSystem = dynamic(() => import('@/components/visualizations/PortraitSystem'))

export function Hero() {
  return <section className="hero-v2" id="top"><div className="hero-ghost" aria-hidden="true">engineer</div><div className="hero-grid site-container">
    <div className="hero-copy">
      <p className="hero-intro"><i /> Backend engineer · Building in public</p>
      <h1><span>Zeba</span><em>Ali</em></h1>
      <p className="hero-role">Backend Engineer</p>
      <p className="hero-stack">Java <i /> Spring Boot <i /> Distributed Systems <i /> Databases</p>
      <p className="hero-statement">I spent four years inside Oracle&apos;s Server Technologies Group working on the database engine itself. Now I build backend systems where <strong>correctness, failure handling, performance</strong> and <strong>observability</strong> matter.</p>
      <div className="hero-actions"><Link href="#systems" className="button button-primary">Explore my systems <ArrowDownRight size={17} /></Link><a href="https://github.com/Zebaali-hub" target="_blank" rel="noreferrer" className="button button-secondary"><Code2 size={17} /> GitHub <ArrowUpRight size={14} /></a><a href="mailto:zebaali1415@gmail.com" className="text-link"><Mail size={15} /> Contact</a></div>
    </div>
    <div className="hero-system"><PortraitSystem /></div>
  </div><div className="hero-index" aria-hidden="true">01 / ENGINEER</div></section>
}
