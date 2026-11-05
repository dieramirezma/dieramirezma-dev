'use client'

import { useEffect, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Menu, X } from 'lucide-react'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { RESUME } from '@/lib/site'
import { ThemeToggle } from '@/components/layout/theme-toggle'

const NAV_LINKS = [
  { key: 'experience', href: '/#experience' },
  { key: 'work', href: '/#work' },
  { key: 'about', href: '/#about' },
  { key: 'contact', href: '/#contact' },
] as const

export function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale() as 'en' | 'es'
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let last = window.scrollY
    let lastInput = 0
    function onInput() {
      lastInput = Date.now()
    }
    function onScroll() {
      const y = window.scrollY
      const userDriven = Date.now() - lastInput < 400
      if (y <= 160 || y < last) setHidden(false)
      else if (userDriven) setHidden(true)
      last = y
    }
    const inputs = ['wheel', 'touchmove', 'keydown'] as const
    inputs.forEach(type => window.addEventListener(type, onInput, { passive: true }))
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      inputs.forEach(type => window.removeEventListener(type, onInput))
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const toggle = toggleRef.current
    const menu = menuRef.current
    menu?.querySelector<HTMLElement>('a, button')?.focus()

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
      if (e.key !== 'Tab' || !menu || !toggle) return
      const items = [toggle, ...menu.querySelectorAll<HTMLElement>('a[href], button')]
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement
      if (e.shiftKey && active === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      toggle?.focus()
    }
  }, [open])

  function switchLocale() {
    const next = locale === 'en' ? 'es' : 'en'
    router.replace(`${pathname}${window.location.hash}`, { locale: next })
  }

  const linkClass = 'link-underline text-sm text-muted transition-colors hover:text-fg'

  return (
    <>
      <header
        inert={hidden && !open}
        onFocusCapture={() => setHidden(false)}
        className={`fixed inset-x-0 top-0 z-50 border-b border-rule bg-bg/90 backdrop-blur transition-transform duration-300 ${
          hidden && !open ? '-translate-y-full' : ''
        }`}
      >
        <nav className="page flex h-16 items-center justify-between" aria-label={t('primary')}>
          <Link href="/" className="font-display text-xl text-fg">
            Diego Ramírez
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map(link => (
              <Link key={link.key} href={link.href} className={linkClass}>
                {t(link.key)}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href={RESUME[locale]}
              download
              className="link-underline hidden font-mono text-xs uppercase tracking-[0.08em] text-fg sm:inline"
            >
              {t('resume')} ↓
            </a>
            <button
              type="button"
              onClick={switchLocale}
              lang={locale === 'en' ? 'es' : 'en'}
              aria-label={t('switch_language')}
              className="-m-2 p-2 font-mono text-xs uppercase tracking-[0.08em] text-muted hover:text-fg"
            >
              {locale === 'en' ? 'ES' : 'EN'}
            </button>
            <ThemeToggle />
            <button
              ref={toggleRef}
              type="button"
              className="-mr-2 p-2 text-fg md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t('close_menu') : t('open_menu')}
              onClick={() => setOpen(value => !value)}
            >
              {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </header>

      {open ? (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-bg md:hidden"
        >
          <ul className="page flex flex-col py-8">
            {NAV_LINKS.map(link => (
              <li key={link.key} className="border-b border-rule">
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-5 font-display text-4xl font-light text-fg"
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
            <li className="pt-8">
              <a href={RESUME[locale]} download className="btn btn-secondary">
                {t('resume')} ↓
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </>
  )
}
