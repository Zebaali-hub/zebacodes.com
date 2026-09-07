import Link from 'next/link'
import { CANVAS_WIDTH, layoutRoadmap, spinePath, type Box } from '@/lib/dsa/roadmap-layout'

/**
 * The DSA roadmap as a box-and-line graph.
 *
 * Server-rendered SVG with real anchors, so every node is a working link,
 * it is crawlable, and it costs no client JavaScript. Geometry comes from
 * lib/dsa/roadmap-layout.
 */
export function DsaRoadmapGraph() {
  const { boxes, edges, height } = layoutRoadmap()

  return (
    <div className="rmg-scroll">
      <svg
        className="rmg"
        viewBox={`0 0 ${CANVAS_WIDTH} ${height}`}
        style={{ height }}
        role="img"
        aria-label="DSA roadmap: three cumulative tiers, each branching into topics and their patterns."
      >
        <path className="rmg-spine" d={spinePath(height)} />
        {edges.map((edge, i) => (
          <path key={i} className="rmg-edge" data-tier={edge.tier} d={edge.d} />
        ))}
        {boxes.map((box) => <Node key={`${box.kind}-${box.id}`} box={box} />)}
      </svg>
    </div>
  )
}

function Node({ box }: { box: Box }) {
  const body = (
    <g className={`rmg-node rmg-${box.kind}`} data-tier={box.tier}>
      <rect x={box.x} y={box.y} width={box.w} height={box.h} rx={box.kind === 'tier' ? 7 : 5} />
      {box.kind === 'tier' ? (
        <>
          <text className="rmg-tier-kicker" x={box.x + box.w / 2} y={box.y + 22}>{box.lines[0]}</text>
          <text className="rmg-tier-title" x={box.x + box.w / 2} y={box.y + 43}>{box.lines[1]}</text>
        </>
      ) : (
        box.lines.map((line, i) => (
          <text
            key={i}
            className={box.kind === 'topic' ? 'rmg-topic-text' : 'rmg-pattern-text'}
            x={box.x + 13}
            y={box.y + (box.kind === 'topic' ? 20 : 18) + i * 15}
          >
            {line}
          </text>
        ))
      )}
      {box.meta && box.kind !== 'tier' ? (
        <text className="rmg-meta" x={box.x + box.w - 11} y={box.y + (box.kind === 'topic' ? 20 : 18)}>
          {box.meta}
        </text>
      ) : null}
      {box.meta && box.kind === 'tier' ? (
        <text className="rmg-tier-meta" x={box.x + box.w - 14} y={box.y + 22}>{box.meta}</text>
      ) : null}
    </g>
  )

  if (!box.href) return body
  return <Link href={box.href}>{body}</Link>
}
