interface DiagramScrollerProps {
  label: string
  children: React.ReactNode
  id?: string
}

export function DiagramScroller({ label, children, id }: DiagramScrollerProps) {
  return (
    <div
      id={id}
      role="region"
      aria-label={label}
      tabIndex={0}
      className="max-w-full overflow-x-auto overscroll-x-contain"
    >
      <div className="min-w-[640px] lg:min-w-0">{children}</div>
    </div>
  )
}
