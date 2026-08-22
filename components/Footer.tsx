import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export default function Footer() {
  return <footer className="product-footer"><div className="footer-call"><p>Available for backend engineering roles</p><h2>Let&apos;s build something<br />that lasts.</h2></div><nav aria-label="Footer navigation"><a href="mailto:zebaali1415@gmail.com">Email <ArrowUpRight size={15} /></a><a href="https://github.com/Zebaali-hub" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15} /></a><Link href="/writing">Writing</Link><Link href="/roadmaps">Roadmaps</Link><a href="/Zeba_Ali_resume_.pdf" target="_blank">Résumé <ArrowUpRight size={15} /></a></nav><div className="footer-base"><strong>Zeba Ali</strong><span>Backend Engineer · Java · Spring Boot · Distributed Systems · Databases</span><small>zebacodes.com</small></div></footer>
}
