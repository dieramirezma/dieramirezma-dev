interface DiagramScrollerProps {
  label: string
  children: React.ReactNode
  id?: string
  minWidth?: number
}

export function DiagramScroller({ label, children, id, minWidth = 640 }: DiagramScrollerProps) {
  return (
    <div
      id={id}
      role="region"
      aria-label={label}
      tabIndex={0}
      className="max-w-full overflow-x-auto overscroll-x-contain"
    >
      <div
        className="min-w-[var(--diagram-min)] lg:min-w-0"
        style={{ '--diagram-min': `${minWidth}px` } as React.CSSProperties}
      >
        {children}
      </div>
    </div>
  )
}
