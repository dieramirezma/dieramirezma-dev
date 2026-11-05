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
  accent?: boolean
}

export function Node({ x, y, w, h, label, sub, accent }: NodeProps) {
  const cy = y + h / 2
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={2}
        className={accent ? 'fill-bg stroke-accent' : 'fill-bg stroke-rule-strong'}
        strokeWidth={1.25}
      />
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
}

export function Edge({ points, label, labelAt, anchor = 'middle' }: EdgeProps) {
  const marker = useContext(MarkerContext)
  const d = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x} ${y}`).join(' ')
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.25}
        className="text-muted"
        markerEnd={`url(#${marker})`}
      />
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
