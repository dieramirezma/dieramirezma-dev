import { cn } from '@/lib/utils'

interface ChipProps {
  children: React.ReactNode
  className?: string
}

export function Chip({ children, className }: ChipProps) {
  return (
    <span
      className={cn(
        'inline-block rounded-[2px] border border-rule px-2 py-0.5 font-mono text-xs text-muted',
        className
      )}
    >
      {children}
    </span>
  )
}
