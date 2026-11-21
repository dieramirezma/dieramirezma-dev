import { MARK_CURSOR, MARK_GLYPHS, MARK_VIEWBOX } from '@/lib/brand'

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox={MARK_VIEWBOX} className={className} aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="8" className="fill-fg" />
      <path d={MARK_GLYPHS} className="fill-bg" />
      <rect {...MARK_CURSOR} className="fill-accent" />
    </svg>
  )
}
