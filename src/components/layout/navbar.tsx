'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { ThemeToggle } from './theme-toggle'

const NAV_LINKS = [
  { key: 'home', href: '' },
  { key: 'projects', href: '/projects' },
  { key: 'experience', href: '/experience' },
  { key: 'about', href: '/about' },
  { key: 'labs', href: '/labs' },
] as const

export function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  function toggleLocale() {
    const nextLocale = locale === 'en' ? 'es' : 'en'
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
    router.push(`/${nextLocale}${pathWithoutLocale}`)
  }

  function isActive(href: string) {
    const fullPath = `/${locale}${href}`
    if (href === '') return pathname === fullPath || pathname === `/${locale}`
    return pathname.startsWith(fullPath)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-sm">
      <nav className="mx-auto max-w-[1200px] px-10 h-14 flex items-center justify-between">
        <Link
          href={`/${locale}`}
          className="font-mono text-sm font-bold tracking-[0.2em] text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors duration-200"
        >
          DNRM
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(link => (
            <Link
              key={link.key}
              href={`/${locale}${link.href}`}
              className={`text-sm transition-colors duration-200 ${
                isActive(link.href)
                  ? 'text-[var(--color-primary)]'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              {t(link.key)}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleLocale}
            className="font-mono text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
          >
            {locale === 'en' ? 'ES' : 'EN'}
          </button>
          <div className="w-px h-4 bg-[var(--color-border)]" />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
