import { cn } from '@/lib/utils'

interface SectionTitleProps extends React.ComponentPropsWithoutRef<'h2'> {
  children: React.ReactNode
}

export function SectionTitle({ children, className, ...props }: SectionTitleProps) {
  return (
    <h2
      {...props}
      className={cn(
        'text-2xl font-semibold text-[var(--color-text-primary)] tracking-tight',
        className
      )}
    >
      {children}
    </h2>
  )
}
