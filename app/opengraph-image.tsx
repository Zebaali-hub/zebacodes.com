import { ImageResponse } from 'next/og'

export const alt = 'Zeba Ali — Backend Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  const nodes = [['API', 810, 100], ['SERVICE', 970, 205], ['EVENTS', 935, 410], ['DATABASE', 705, 460], ['CACHE', 590, 260]]
  return new ImageResponse(<div style={{ width: '100%', height: '100%', display: 'flex', background: '#0a0a0a', color: '#f3efe6', padding: 72, fontFamily: 'sans-serif', position: 'relative' }}>
    <div style={{ position:'absolute', inset:0, display:'flex', border:'1px solid #202020' }} />
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: 660 }}><div style={{ fontSize: 20, color: '#c8f000', marginBottom: 24 }}>JAVA · SPRING BOOT · DISTRIBUTED SYSTEMS</div><div style={{ fontSize: 82, fontWeight: 800, lineHeight: .95 }}>Zeba Ali</div><div style={{ fontSize: 42, color: '#8d8b86', marginTop: 17 }}>Backend Engineer</div><div style={{ width: 90, height: 4, background: '#c8f000', marginTop: 42 }} /></div>
    <div style={{ position: 'absolute', left: 820, top: 265, width: 170, height: 170, borderRadius: 100, background: '#151515', border:'2px solid #303030', color: '#f3efe6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700 }}>SYSTEM</div>
    {nodes.map(([name, left, top]) => <div key={name} style={{ position: 'absolute', left, top, padding: '16px 22px', border: '1px solid #3b3b3b', background: '#111', borderRadius: 5, fontSize: 15, color: '#c8f000' }}>{name}</div>)}
  </div>, size)
}
