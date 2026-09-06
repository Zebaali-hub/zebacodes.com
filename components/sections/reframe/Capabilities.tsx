import { capabilities } from '@/data/portfolio'

export function Capabilities() {
  return (
    <section className="rf-capabilities" id="work" aria-labelledby="rf-capabilities-heading">
      <div className="site-container">
        <h2 id="rf-capabilities-heading" className="rf-section-title"><span>What I work on</span></h2>
        <div className="rf-cap-grid">
          {capabilities.map((cap) => (
            <article key={cap.title} className="rf-cap">
              <h3>{cap.title}</h3>
              <p>{cap.body}</p>
              <ul>{cap.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
