type DiagramKind = 'stress' | 'orderflow' | 'logs'

const NODE = 'arch-node'
const LABEL = 'arch-label'

function StressDiagram() {
  return (
    <svg viewBox="0 0 720 260" role="img" aria-label="Database stress framework: a worker pool drives JDBC load through an isolated connection pool into the target database, while plan capture and a metrics collector feed comparison reports." className="arch-svg">
      <defs>
        <marker id="s-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" /></marker>
      </defs>
      <g className={NODE}><rect x="8" y="96" width="118" height="64" rx="4" /><text x="67" y="122">Workload</text><text x="67" y="140" className="arch-sub">profile · concurrency</text></g>
      <g className={NODE}><rect x="166" y="96" width="118" height="64" rx="4" /><text x="225" y="122">Worker pool</text><text x="225" y="140" className="arch-sub">fixed executor</text></g>
      <g className={NODE}><rect x="324" y="96" width="118" height="64" rx="4" /><text x="383" y="122">HikariCP</text><text x="383" y="140" className="arch-sub">isolated per test</text></g>
      <g className={`${NODE} arch-node-key`}><rect x="482" y="96" width="118" height="64" rx="4" /><text x="541" y="122">Target DB</text><text x="541" y="140" className="arch-sub">JDBC</text></g>
      <g className={NODE}><rect x="324" y="14" width="118" height="52" rx="4" /><text x="383" y="38">Plan capture</text><text x="383" y="55" className="arch-sub">per query</text></g>
      <g className={NODE}><rect x="166" y="192" width="276" height="52" rx="4" /><text x="304" y="216">Metrics collector</text><text x="304" y="233" className="arch-sub">p50 · p95 · p99 · TPS · errors</text></g>
      <g className={`${NODE} arch-node-out`}><rect x="482" y="192" width="118" height="52" rx="4" /><text x="541" y="216">Comparison</text><text x="541" y="233" className="arch-sub">run over run</text></g>
      <g className="arch-edge" markerEnd="url(#s-arrow)">
        <path d="M126 128 H160" /><path d="M284 128 H318" /><path d="M442 128 H476" />
        <path d="M383 96 V72" /><path d="M304 160 V186" /><path d="M442 218 H476" />
      </g>
      <g className={LABEL}><text x="143" y="120">drive</text><text x="500" y="86">observe</text></g>
    </svg>
  )
}

function OrderFlowDiagram() {
  return (
    <svg viewBox="0 0 720 300" role="img" aria-label="OrderFlow architecture: a gateway fronts order, payment, restaurant, delivery, tracking and notification services; the order service writes state and an outbox record in one transaction, and Kafka carries events to idempotent consumers with a dead-letter queue." className="arch-svg">
      <defs>
        <marker id="o-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" /></marker>
      </defs>
      <g className={NODE}><rect x="8" y="18" width="112" height="52" rx="4" /><text x="64" y="42">Gateway</text><text x="64" y="59" className="arch-sub">HTTP at the edge</text></g>
      <g className={`${NODE} arch-node-key`}><rect x="160" y="8" width="150" height="72" rx="4" /><text x="235" y="34">Order service</text><text x="235" y="52" className="arch-sub">state + outbox</text><text x="235" y="68" className="arch-sub">one transaction</text></g>
      <g className={NODE}><rect x="352" y="18" width="112" height="52" rx="4" /><text x="408" y="42">PostgreSQL</text><text x="408" y="59" className="arch-sub">per service</text></g>
      <g className={`${NODE} arch-node-bus`}><rect x="160" y="122" width="480" height="46" rx="4" /><text x="400" y="150">Kafka · order · payment · delivery · location events</text></g>
      <g className={NODE}><rect x="160" y="206" width="108" height="60" rx="4" /><text x="214" y="230">Payment</text><text x="214" y="248" className="arch-sub">compensates</text></g>
      <g className={NODE}><rect x="288" y="206" width="108" height="60" rx="4" /><text x="342" y="230">Restaurant</text><text x="342" y="248" className="arch-sub">idempotent</text></g>
      <g className={NODE}><rect x="416" y="206" width="108" height="60" rx="4" /><text x="470" y="230">Delivery</text><text x="470" y="248" className="arch-sub">Redis GEO</text></g>
      <g className={NODE}><rect x="544" y="206" width="108" height="60" rx="4" /><text x="598" y="230">Tracking</text><text x="598" y="248" className="arch-sub">WebSocket</text></g>
      <g className={`${NODE} arch-node-out`}><rect x="544" y="18" width="112" height="52" rx="4" /><text x="600" y="42">DLQ</text><text x="600" y="59" className="arch-sub">after retry</text></g>
      <g className="arch-edge" markerEnd="url(#o-arrow)">
        <path d="M120 44 H154" /><path d="M310 44 H346" /><path d="M235 80 V116" />
        <path d="M214 168 V200" /><path d="M342 168 V200" /><path d="M470 168 V200" /><path d="M598 168 V200" />
        <path d="M640 145 H672 V44 H662" />
      </g>
      <g className={LABEL}><text x="252" y="104">publish</text><text x="660" y="112">retry ✕3</text></g>
    </svg>
  )
}

function LogsDiagram() {
  return (
    <svg viewBox="0 0 720 260" role="img" aria-label="Log intelligence pipeline: database traces, kernel logs, performance reports and Java stack traces enter type detection, then format-specific parsers, cross-layer correlation, layer classification, and a structured root-cause report." className="arch-svg">
      <defs>
        <marker id="l-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" /></marker>
      </defs>
      <g className={NODE}><rect x="8" y="10" width="130" height="40" rx="4" /><text x="73" y="35">DB traces</text></g>
      <g className={NODE}><rect x="8" y="66" width="130" height="40" rx="4" /><text x="73" y="91">Kernel logs</text></g>
      <g className={NODE}><rect x="8" y="122" width="130" height="40" rx="4" /><text x="73" y="147">Perf reports</text></g>
      <g className={NODE}><rect x="8" y="178" width="130" height="40" rx="4" /><text x="73" y="203">Java traces</text></g>
      <g className={NODE}><rect x="188" y="76" width="118" height="76" rx="4" /><text x="247" y="106">Type detect</text><text x="247" y="126" className="arch-sub">+ parsers</text><text x="247" y="143" className="arch-sub">async, bounded</text></g>
      <g className={`${NODE} arch-node-key`}><rect x="348" y="76" width="128" height="76" rx="4" /><text x="412" y="106">Correlation</text><text x="412" y="126" className="arch-sub">app · db · kernel</text><text x="412" y="143" className="arch-sub">pattern match</text></g>
      <g className={NODE}><rect x="518" y="30" width="126" height="56" rx="4" /><text x="581" y="54">Layer class.</text><text x="581" y="72" className="arch-sub">7 failure layers</text></g>
      <g className={`${NODE} arch-node-out`}><rect x="518" y="142" width="126" height="56" rx="4" /><text x="581" y="166">Root cause</text><text x="581" y="184" className="arch-sub">+ remediation</text></g>
      <g className="arch-edge" markerEnd="url(#l-arrow)">
        <path d="M138 30 H164 V110 H182" /><path d="M138 86 H164 V110 H182" /><path d="M138 142 H164 V114 H182" /><path d="M138 198 H164 V118 H182" />
        <path d="M306 114 H342" /><path d="M476 100 H498 V58 H512" /><path d="M476 128 H498 V170 H512" />
      </g>
      <g className={LABEL}><text x="316" y="102">normalize</text></g>
    </svg>
  )
}

const diagrams: Record<DiagramKind, () => React.JSX.Element> = {
  stress: StressDiagram,
  orderflow: OrderFlowDiagram,
  logs: LogsDiagram,
}

export function ArchitectureDiagram({ kind }: { kind: DiagramKind }) {
  const Diagram = diagrams[kind]
  return (
    <figure className="arch-figure">
      <div className="arch-scroll"><Diagram /></div>
      <figcaption>Architecture — drawn from the repository.</figcaption>
    </figure>
  )
}
