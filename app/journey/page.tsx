import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { PageEnvironment } from '@/components/ui/PageEnvironment'

export const metadata: Metadata = {
  title: 'Journey',
  description: 'The engineering journey of Zeba Ali: Oracle RDBMS, backend systems, and building in public.',
  alternates: { canonical: '/journey' },
}
const timeline = [
  { period: 'NOW', isCurrent: true, content: 'Building in public. Writing. OSS projects. Distributed systems at implementation depth. Becoming a voice for women in tech.' },
  { period: 'APR 2026', content: 'Oracle India layoffs. Nearly 4 years as MTS IC2, Server Technologies Group. Nominated for SMTS IC3 by manager. Ended anyway.' },
  { period: '2022–2026', content: 'Oracle India · MTS IC2 · RDBMS 23ai & 19c. 5B row concurrent workloads. Vector search benchmarking framework adopted cross-team. Fortune 500 production escalations. 150 bugs filed, 13 shipped to production releases. 4 RDBMS features owned end-to-end.' },
  { period: '2021–2022', content: 'Wabtec Corporation · Software Engineer Intern. Java backend pipelines. MS SQL Server integrations. MDM automation with Informatica PowerCenter.' },
  { period: 'MAY 2022', content: 'B.Tech Computer Science · IGDTUW, Delhi NCR' },
]

const learning = [
  { title: 'Distributed Systems', desc: 'Consensus protocols, replication, CAP theorem at implementation level' },
  { title: 'Java Internals', desc: 'JVM, GC mechanics, concurrency primitives' },
  { title: 'LLD', desc: 'Design patterns, SOLID, real system-level thinking' },
  { title: 'HLD', desc: 'System design trade-offs I can defend end-to-end' },
  { title: 'Spring Boot', desc: 'Building real backend services, not just knowing annotations' },
]

export default function JourneyPage() {
  return <div className="experience-page journey-experience"><PageEnvironment tone="timeline" /><header className="experience-hero journey-hero"><p><span>J</span> Engineering timeline</p><h1>Built through<br /><em>doing.</em></h1><strong>Nearly four years inside Oracle RDBMS engineering, a difficult transition, and a deliberate move toward building in public.</strong><div className="journey-portrait"><Image src="/zeba-corporate.jpeg" alt="Zeba Ali" fill sizes="220px" /></div></header><section className="spatial-timeline">{timeline.map((item, index) => <article key={item.period} className={item.isCurrent ? 'current' : ''}><span>0{timeline.length - index}</span><time>{item.period}</time><div><i /><p>{item.content}</p></div></article>)}</section><blockquote className="journey-quote">&ldquo;I never watched a tutorial.<br />I learned by doing, by failing, and by building.&rdquo;</blockquote><section className="learning-direction"><header><span>Current direction</span><h2>Going deeper.</h2></header><div>{learning.map((item, index) => <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.desc}</p></article>)}</div></section><section className="journey-contact"><div><span>Open to backend engineering roles</span><h2>Technical depth. Thoughtful teams. Work that matters.</h2><p>Java, Spring Boot, distributed systems, and database engineering.</p></div><div><a href="mailto:zebaali1415@gmail.com">Email me <ArrowUpRight size={16} /></a><a href="https://linkedin.com/in/zeba-a-7173251a0" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={16} /></a></div></section></div>
}
