export function PageEnvironment({ tone = 'graphite' }: { tone?: 'graphite' | 'systems' | 'journal' | 'map' | 'timeline' }) {
  return <div className={`page-environment environment-${tone}`} aria-hidden="true"><div className="environment-grid" /><div className="environment-light" /><svg viewBox="0 0 1200 700" preserveAspectRatio="none"><path d="M-40 520 C190 310 350 610 570 360 S930 170 1240 390" /><path d="M80 80 C310 260 450 100 680 250 S980 540 1190 230" /><circle cx="570" cy="360" r="4" /><circle cx="930" cy="246" r="3" /></svg></div>
}
