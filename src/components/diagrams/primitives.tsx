'use client'

import { createContext, useContext, useId } from 'react'

const MarkerContext = createContext('arrow')

interface FrameProps {
  title: string
  desc: string
  width: number
  height: number
  children: React.ReactNode
}

export function DiagramFrame({ title, desc, width, height, children }: FrameProps) {
  const raw = useId().replace(/:/g, '')
  const markerId = `arrow-${raw}`
  const titleId = `title-${raw}`
  const descId = `desc-${raw}`
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
      className="h-auto w-full text-fg"
    >
      <title id={titleId}>{title}</title>
      <desc id={descId}>{desc}</desc>
      <defs>
        <marker
          id={markerId}
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 1 L9 5 L0 9" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </marker>
      </defs>
      <MarkerContext.Provider value={markerId}>{children}</MarkerContext.Provider>
    </svg>
  )
}

interface NodeProps {
  x: number
  y: number
  w: number
  h: number
  label: string
  sub?: string
  note?: string
  accent?: boolean
  muted?: boolean
}

export function Node({ x, y, w, h, label, sub, note, accent, muted }: NodeProps) {
  const cy = y + h / 2 - (sub && note ? 8 : 0)
  const tone = accent
    ? 'fill-bg stroke-accent'
    : muted
      ? 'fill-raised stroke-rule-strong'
      : 'fill-bg stroke-rule-strong'
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={2} className={tone} strokeWidth={1.25} />
      <text
        x={x + w / 2}
        y={sub ? cy - 4 : cy + 4.5}
        textAnchor="middle"
        className="fill-fg font-mono"
        fontSize={13}
      >
        {label}
      </text>
      {sub ? (
        <text
          x={x + w / 2}
          y={cy + 13}
          textAnchor="middle"
          className="fill-subtle font-mono"
          fontSize={12}
        >
          {sub}
        </text>
      ) : null}
      {sub && note ? (
        <text
          x={x + w / 2}
          y={cy + 30}
          textAnchor="middle"
          className="fill-subtle font-mono"
          fontSize={12}
        >
          {note}
        </text>
      ) : null}
    </g>
  )
}

interface GroupProps {
  x: number
  y: number
  w: number
  h: number
  label: string
}

export function Group({ x, y, w, h, label }: GroupProps) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={2}
        fill="none"
        className="stroke-rule-strong"
        strokeWidth={1}
        strokeDasharray="4 4"
      />
      <text x={x + 12} y={y - 9} className="fill-subtle font-mono" fontSize={12} letterSpacing={1}>
        {label.toUpperCase()}
      </text>
    </g>
  )
}

interface EdgeProps {
  points: [number, number][]
  label?: string
  labelAt?: [number, number]
  anchor?: 'start' | 'middle' | 'end'
  dashed?: boolean
}

const CORNER = 8
const CHAR = 7.2

function roundedPath(points: [number, number][]) {
  const [first, ...rest] = points
  let d = `M${first[0]} ${first[1]}`
  rest.forEach((point, i) => {
    const next = rest[i + 1]
    if (!next) {
      d += ` L${point[0]} ${point[1]}`
      return
    }
    const prev = points[i]
    const inLen = Math.hypot(point[0] - prev[0], point[1] - prev[1])
    const outLen = Math.hypot(next[0] - point[0], next[1] - point[1])
    const r = Math.min(CORNER, inLen / 2, outLen / 2)
    const before: [number, number] = [
      point[0] - ((point[0] - prev[0]) / inLen) * r,
      point[1] - ((point[1] - prev[1]) / inLen) * r,
    ]
    const after: [number, number] = [
      point[0] + ((next[0] - point[0]) / outLen) * r,
      point[1] + ((next[1] - point[1]) / outLen) * r,
    ]
    d += ` L${before[0]} ${before[1]} Q${point[0]} ${point[1]} ${after[0]} ${after[1]}`
  })
  return d
}

export function Edge({ points, label, labelAt, anchor = 'middle', dashed }: EdgeProps) {
  const marker = useContext(MarkerContext)
  const maskWidth = label ? label.length * CHAR + 8 : 0
  const maskX = labelAt
    ? anchor === 'start'
      ? labelAt[0] - 4
      : anchor === 'end'
        ? labelAt[0] - maskWidth + 4
        : labelAt[0] - maskWidth / 2
    : 0
  return (
    <g>
      <path
        d={roundedPath(points)}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.25}
        strokeDasharray={dashed ? '5 4' : undefined}
        className="text-muted"
        markerEnd={`url(#${marker})`}
      />
      {label && labelAt ? (
        <rect x={maskX} y={labelAt[1] - 12} width={maskWidth} height={16} className="fill-bg" />
      ) : null}
      {label && labelAt ? (
        <text
          x={labelAt[0]}
          y={labelAt[1]}
          textAnchor={anchor}
          className="fill-muted font-mono"
          fontSize={12}
        >
          {label}
        </text>
      ) : null}
    </g>
  )
}

export function Caption({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <text x={x} y={y} className="fill-subtle font-mono" fontSize={12} letterSpacing={1}>
      {children.toUpperCase()}
    </text>
  )
}
