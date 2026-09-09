import Link from 'next/link'
import { ArrowUpRight, Mail } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { SectionTitle } from '@/components/ui/section-title'

export function EducationContact() {
  const education = useTranslations('education')
  const contact = useTranslations('contact')
  return (
    <>
      <section
        aria-labelledby="education-heading"
        className="mx-auto max-w-[1200px] px-5 py-20 sm:px-10"
      >
        <SectionTitle id="education-heading">{education('title')}</SectionTitle>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <article className="rounded-lg border border-[var(--color-border)] p-6 md:row-span-2">
            <p className="font-semibold text-[var(--color-text-primary)]">{education('degree')}</p>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
              {education('institution')}
            </p>
            <p className="mt-5 font-mono text-xs text-[var(--color-primary)]">
              {education('details')}
            </p>
          </article>
          <article className="rounded-lg border border-[var(--color-border)] p-6">
            <p className="font-medium text-[var(--color-text-primary)]">
              {education('credential')}
            </p>
            <p className="mt-2 text-xs text-[var(--color-text-muted)]">
              {education('credential_details')}
            </p>
          </article>
          <article className="rounded-lg border border-[var(--color-border)] p-6">
            <p className="font-medium text-[var(--color-text-primary)]">{education('forward')}</p>
            <p className="mt-2 text-xs text-[var(--color-text-muted)]">
              {education('forward_details')}
            </p>
          </article>
        </div>
      </section>
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="scroll-mt-24 mx-auto max-w-[1200px] px-5 py-20 sm:px-10"
      >
        <div className="rounded-lg bg-[var(--color-surface-3)] p-7 sm:p-12">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--color-primary)]">
            {contact('eyebrow')}
          </p>
          <h2
            id="contact-heading"
            className="mt-5 max-w-3xl text-2xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-4xl"
          >
            {contact('title')}
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="mailto:dieramirezma.dev@gmail.com"
              className="inline-flex items-center gap-2 rounded bg-[var(--color-text-primary)] px-5 py-3 text-sm font-medium text-[var(--color-bg)]"
            >
              <Mail size={15} aria-hidden="true" /> {contact('email')}
            </Link>
            <Link
              href="https://linkedin.com/in/dieramirezma"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded border border-[var(--color-border)] px-5 py-3 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            >
              {contact('linkedin')} <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
