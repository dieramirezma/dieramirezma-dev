'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { useTranslations } from 'next-intl'
import { Moon, Sun } from 'lucide-react'

const FALLBACK_MS = 400

function applyThemeClass(theme: 'light' | 'dark') {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  root.classList.toggle('light', theme === 'light')
  root.style.colorScheme = theme
}

export function ThemeToggle() {
  const t = useTranslations('nav')
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="h-8 w-8" aria-hidden="true" />

  const isDark = resolvedTheme === 'dark'

  function toggle() {
    const next = isDark ? 'light' : 'dark'
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      setTheme(next)
      return
    }

    if (typeof document.startViewTransition === 'function') {
      document.startViewTransition(() => {
        applyThemeClass(next)
        setTheme(next)
      })
      return
    }

    const root = document.documentElement
    root.classList.add('theme-transition')
    setTheme(next)
    window.setTimeout(() => root.classList.remove('theme-transition'), FALLBACK_MS)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex h-8 w-8 items-center justify-center text-muted transition-colors hover:text-fg"
      aria-label={t('toggle_theme')}
    >
      {isDark ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
    </button>
  )
}
