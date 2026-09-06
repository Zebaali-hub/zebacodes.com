import { ArrowUpRight } from 'lucide-react'

export function Contact() {
  return (
    <section className="rf-contact" id="contact" aria-labelledby="rf-contact-heading">
      <div className="site-container">
        <p className="rf-contact-status">Immediate joiner · open to backend and database engineering roles</p>
        <h2 id="rf-contact-heading">Let&apos;s talk about the systems layer.</h2>
        <a className="rf-contact-mail" href="mailto:zebaali1415@gmail.com">zebaali1415@gmail.com</a>
        <div className="rf-contact-links">
          <a href="https://github.com/Zebaali-hub" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15} aria-hidden="true" /></a>
          <a href="https://linkedin.com/in/zeba-a-7173251a0" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={15} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  )
}
