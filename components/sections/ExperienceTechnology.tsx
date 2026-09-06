import { ArrowUpRight } from 'lucide-react'
import { technologies } from '@/data/portfolio'
import { Reveal } from '@/components/ui/Reveal'

const experience = [
  { period: '2022 — 2026', company: 'Oracle India', role: 'Member of Technical Staff · Server Technologies', body: 'Worked on Oracle RDBMS 23ai and 19c validation: concurrent Java workload frameworks, database-kernel defect reproduction, vector-search benchmarking, and production escalations.', evidence: ['RAC · Exadata · Exascale', 'MVCC and kernel failure analysis', 'RDBMS features owned end to end'] },
  { period: '2021 — 2022', company: 'Wabtec Corporation', role: 'Software Engineer Intern', body: 'Built Java backend data pipelines and SQL Server integrations for rail-logistics workflows, plus MDM automation with Informatica PowerCenter.', evidence: ['Java backend', 'SQL Server', 'Data integration'] },
]

export function ExperienceTechnology() {
  return <>
    <section className="section experience-section" id="experience">
      <div className="site-container section-heading horizontal"><div><p><span>05</span> Experience</p><h2>Depth built over time.</h2></div></div>
      <div className="site-container timeline-v2">{experience.map((item, i) => <Reveal key={item.company} className="timeline-entry"><span className="timeline-period">{item.period}</span><div className="timeline-marker">0{i + 1}</div><div><h3>{item.company}</h3><h4>{item.role}</h4><p>{item.body}</p><ul>{item.evidence.map((x) => <li key={x}>{x}</li>)}</ul></div></Reveal>)}</div>
    </section>
    <section className="section technology-section" id="technology"><div className="site-container tech-layout"><div className="tech-intro"><p className="section-label"><span>06</span> Technology</p><h2>A restrained toolkit.</h2><p>Tools I have used in professional work or in the verified projects featured above.</p></div><div className="tech-constellation">{technologies.map(({ group, items }) => <div key={group}><span>{group}</span>{items.map((item) => <strong key={item}>{item}</strong>)}</div>)}</div></div></section>
    <section className="building-section" id="building"><div className="site-container building-grid"><div><p className="section-label"><span>07</span> Building in public</p><h2>Java Backend Engineering</h2><p>A practical, engineering-first learning repository connecting Java and JVM mechanics to concurrency, Spring, databases, event-driven systems, and interview reasoning.</p><div className="module-status"><span><i className="ready" />3 modules ready</span><span><i className="progress" />2 in progress</span><span><i />11 planned</span></div><a className="button button-primary" href="https://github.com/Zebaali-hub/java-backend-engineering" target="_blank" rel="noreferrer">Explore the repository <ArrowUpRight size={16} /></a></div><div className="learning-path" aria-label="Java backend learning path"><span>Java</span><i /><span>JVM</span><i /><span>Concurrency</span><i /><span>Spring</span><i /><span>Data</span><i /><span>Systems</span></div></div></section>
  </>
}
