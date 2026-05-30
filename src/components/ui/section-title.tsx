import { cn } from '@/lib/utils'

interface SectionTitleProps {
  children: React.ReactNode
  className?: string
}

export function SectionTitle({ children, className }: SectionTitleProps) {
  return (
    <h2
      className={cn(
        'text-2xl font-semibold text-[var(--color-text-primary)] tracking-tight',
        className
      )}
    >
      {children}
    </h2>
  )
}
