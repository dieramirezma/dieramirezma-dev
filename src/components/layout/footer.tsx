import { useTranslations } from 'next-intl'

export function Footer() {
  const t = useTranslations('footer')
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-rule">
      <div className="page flex flex-col gap-6 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-xl">Diego Ramírez</p>
          <p className="mt-2 text-sm text-subtle">{t('copyright', { year })}</p>
        </div>
        <p className="max-w-[48ch] text-sm text-subtle md:text-right">
          {t('colophon')}{' '}
          <a
            href="https://github.com/dieramirezma/dieramirezma-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline link-underline-static text-muted"
          >
            {t('source')} ↗
          </a>
        </p>
      </div>
    </footer>
  )
}
