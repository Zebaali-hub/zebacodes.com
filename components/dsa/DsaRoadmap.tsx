import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { tiers } from '@/data/dsa/tiers'
import { topics } from '@/data/dsa/topics'
import { patterns } from '@/data/dsa/patterns'
import { questions } from '@/data/dsa/questions'
import { DsaRoadmapGraph } from './DsaRoadmapGraph'

/** The DSA roadmap: a short frame, then the graph. */
export function DsaRoadmap() {
  return (
    <div className="dsa-map">
      <header className="dsa-map-hero">
        <p className="dsa-map-eyebrow"><span>Roadmap</span> Data structures &amp; algorithms</p>
        <h1>Three tiers,<br />cumulative.</h1>
        <p className="dsa-map-scope">
          Tier 1 first, then Tier 2, then Tier 3 — and nothing below ever stops mattering.
          Every box is a pattern you can open.
        </p>
        <dl className="dsa-map-stats">
          <div><dt>Tiers</dt><dd>3</dd></div>
          <div><dt>Topics</dt><dd>{topics.length}</dd></div>
          <div><dt>Patterns</dt><dd>{patterns.length}</dd></div>
          <div><dt>Questions</dt><dd>{questions.length}</dd></div>
        </dl>
      </header>

      <ul className="rmg-legend">
        {tiers.map((tier) => (
          <li key={tier.id} data-tier={tier.id}>
            <i aria-hidden="true" />
            <b>Tier {tier.id}</b>
            <span>{tier.title}</span>
          </li>
        ))}
      </ul>

      <DsaRoadmapGraph />

      <p className="rmg-foot">
        <Link href="/roadmaps/dsa/patterns">
          Browse every pattern as a list <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </p>
    </div>
  )
}
