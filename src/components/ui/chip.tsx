import { cn } from '@/lib/utils'

interface ChipProps {
  children: React.ReactNode
  className?: string
}

export function Chip({ children, className }: ChipProps) {
  return (
    <span
      className={cn(
        'inline-block font-mono text-xs border border-[var(--color-border)] px-2 py-0.5 rounded-full text-[var(--color-text-secondary)] tracking-wide',
        className
      )}
    >
      {children}
    </span>
  )
}
