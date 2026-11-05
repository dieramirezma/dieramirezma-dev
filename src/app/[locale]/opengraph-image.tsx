import { ImageResponse } from 'next/og'

export const alt = 'Diego Ramírez — Software Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#0e0e0c',
        color: '#ecebe5',
        padding: 72,
      }}
    >
      <div style={{ fontSize: 28, color: '#9a988f', letterSpacing: 2 }}>
        SOFTWARE ENGINEER · BOGOTÁ, COLOMBIA
      </div>
      <div style={{ fontSize: 92, lineHeight: 1, letterSpacing: -2, display: 'flex' }}>
        Software, from the interface to the infrastructure.
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 30 }}>
        <span>Diego Ramírez</span>
        <span style={{ color: '#ff5a2e' }}>dieramirezma.dev</span>
      </div>
    </div>,
    size
  )
}
