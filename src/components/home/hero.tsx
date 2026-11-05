import { useLocale, useTranslations } from 'next-intl'
import { ArrowDownRight, Download, Mail } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { EMAIL, RESUME } from '@/lib/site'
import { BogotaClock } from '@/components/home/bogota-clock'

export function Hero() {
  const t = useTranslations('hero')
  const locale = useLocale() as 'en' | 'es'

  return (
    <section className="page pb-16 pt-28 sm:pt-32 md:pb-20 md:pt-36">
      <p className="meta mb-8 flex flex-wrap items-center gap-x-4 gap-y-1">
        <span>{t('role')}</span>
        <span aria-hidden="true">/</span>
        <span>{t('location')}</span>
        <span aria-hidden="true">/</span>
        <BogotaClock />
      </p>

      <h1 className="display reveal-line max-w-[22ch] text-fg">{t('title')}</h1>

      <div className="editorial-grid mt-10 md:mt-12">
        <div className="main">
          <p className="lead max-w-[54ch]">{t('description')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/#work" className="btn btn-primary">
              {t('cta_work')} <ArrowDownRight size={16} aria-hidden="true" />
            </Link>
            <a href={`mailto:${EMAIL}`} className="btn btn-secondary">
              <Mail size={16} aria-hidden="true" /> {t('cta_email')}
            </a>
            <a href={RESUME[locale]} download className="btn btn-secondary">
              <Download size={16} aria-hidden="true" /> {t('cta_resume')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
