'use client'

import { useState } from 'react'
import { ArrowUpRight, BriefcaseBusiness, Code2, Mail, MousePointer2 } from 'lucide-react'

const actions = [['build()', 'shape'], ['breakThings()', 'failure'], ['observe()', 'signal'], ['improve()', 'clarity']]

export function ActivityContact() {
  const [state, setState] = useState('ready')
  return <>
    <section className="section activity-section"><div className="site-container activity-grid"><div><p className="section-label"><span>08</span> Engineering activity</p><h2>Work in the open.</h2><p>Source, documentation, experiments, and learning notes live on GitHub. No contribution graph theatre; follow the repositories that matter.</p><a className="button button-secondary" href="https://github.com/Zebaali-hub" target="_blank" rel="noreferrer"><Code2 size={17} /> github.com/Zebaali-hub <ArrowUpRight size={14} /></a></div><div className={`code-playground state-${state}`}><div className="code-top"><span /><span /><span /><em><MousePointer2 size={13} /> try a function</em></div><code><b>while</b> (learning) {'{'}</code>{actions.map(([fn, result]) => <button key={fn} onClick={() => setState(result)} onMouseEnter={() => setState(result)} onFocus={() => setState(result)}>{fn};</button>)}<code>{'}'} <span>{'//'} {state}</span></code></div></div></section>
    <section className="contact-v2" id="contact"><div className="site-container contact-grid"><div><p>Available for backend engineering roles</p><h2>Let&apos;s build systems that last.</h2></div><div className="contact-links"><a href="mailto:zebaali1415@gmail.com"><Mail size={18} /> Email <ArrowUpRight size={14} /></a><a href="https://github.com/Zebaali-hub" target="_blank" rel="noreferrer"><Code2 size={18} /> GitHub <ArrowUpRight size={14} /></a><a href="https://linkedin.com/in/zeba-a-7173251a0" target="_blank" rel="noreferrer"><BriefcaseBusiness size={18} /> LinkedIn <ArrowUpRight size={14} /></a></div></div></section>
  </>
}
