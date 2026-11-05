import { useTranslations } from 'next-intl'
import { CopyEmail } from '@/components/home/copy-email'
import { Reveal } from '@/components/ui/reveal'
import { EMAIL, GITHUB_URL, LINKEDIN_URL, RESUME } from '@/lib/site'

export function Contact() {
  const t = useTranslations('contact')

  const links = [
    { label: t('linkedin'), href: LINKEDIN_URL, external: true },
    { label: t('github'), href: GITHUB_URL, external: true },
    { label: t('resume_en'), href: RESUME.en, external: false },
    { label: t('resume_es'), href: RESUME.es, external: false },
  ]

  return (
    <section id="contact" aria-labelledby="contact-heading" className="section">
      <div className="page">
        <div className="editorial-grid">
          <p className="meta margin">{t('label')}</p>
          <Reveal className="main">
            <h2 id="contact-heading" className="h2">
              {t('title')}
            </h2>
            <p className="lead mt-5 max-w-[48ch]">{t('body')}</p>

            <p className="mt-10">
              <a
                href={`mailto:${EMAIL}`}
                className="link-underline link-underline-static break-all font-display text-2xl font-light sm:text-3xl md:text-4xl"
              >
                {EMAIL}
              </a>
            </p>
            <div className="mt-4">
              <CopyEmail email={EMAIL} />
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-rule pt-6">
              {links.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : { download: true })}
                    className="link-underline text-fg"
                  >
                    {link.label} {link.external ? '↗' : '↓'}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
