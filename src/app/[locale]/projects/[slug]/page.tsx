import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { getProject, PROJECTS } from '@/content/projects'
import { Diagram, diagramWidth } from '@/components/diagrams/diagrams'
import { DiagramScroller } from '@/components/diagrams/diagram-scroller'
import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { SITE_URL } from '@/lib/site'
import type { Locale } from '@/types'

type Params = Promise<{ locale: string; slug: string }>

export function generateStaticParams() {
  return routing.locales.flatMap(locale =>
    PROJECTS.map(project => ({ locale, slug: project.slug }))
  )
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.summary[locale as Locale],
    alternates: {
      canonical: `${SITE_URL}/${locale}/projects/${slug}`,
      languages: {
        en: `${SITE_URL}/en/projects/${slug}`,
        es: `${SITE_URL}/es/projects/${slug}`,
      },
    },
  }
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { locale: rawLocale, slug } = await params
  setRequestLocale(rawLocale)
  const locale = rawLocale as Locale
  const project = getProject(slug)
  if (!project) notFound()

  const t = await getTranslations({ locale, namespace: 'project' })
  const index = PROJECTS.findIndex(item => item.slug === slug)
  const previous = PROJECTS[index - 1]
  const next = PROJECTS[index + 1]

  const sections = [
    { key: 'role', body: project.role[locale] },
    { key: 'problem', body: project.problem[locale] },
    { key: 'approach', body: project.approach[locale] },
  ] as const

  return (
    <>
      <Navbar />
      <main id="main" className="page pb-24 pt-28 md:pt-36">
        <Link
          href="/#work"
          className="link-underline meta inline-flex items-center gap-2 hover:text-fg"
        >
          <ArrowLeft size={14} aria-hidden="true" /> {t('back')}
        </Link>

        <header className="mt-10">
          <p className="meta">
            {project.context[locale]}
            {' '}· {project.year}
          </p>
          <h1 className="display mt-5">{project.title}</h1>
          <p className="lead mt-6 max-w-[52ch]">{project.summary[locale]}</p>
          {project.links.length > 0 ? (
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {project.links.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline inline-flex items-center gap-1 text-fg"
                  >
                    {link.label[locale]} <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </header>

        {project.image ? (
          <Image
            src={project.image.src}
            width={project.image.width}
            height={project.image.height}
            alt={project.image.alt[locale]}
            sizes="(min-width: 1320px) 1192px, 100vw"
            priority
            className="mt-12 h-auto w-full border border-rule"
          />
        ) : null}

        <figure className={`${project.image ? 'mt-6' : 'mt-12'} border border-rule p-6 md:p-10`}>
          <DiagramScroller
            label={`${project.title}: ${t('diagram')}`}
            minWidth={diagramWidth(project.diagram)}
          >
            <Diagram name={project.diagram} locale={locale} />
          </DiagramScroller>
          <figcaption className="meta mt-6">
            {t('diagram')} —{' '}
            {project.diagramScope === 'deployed' ? t('diagram_note_deployed') : t('diagram_note')}
            <span className="sm:hidden"> {t('scroll_hint')}.</span>
          </figcaption>
        </figure>

        <div className="mt-16 md:mt-24">
          {sections.map(section => (
            <section
              key={section.key}
              className="editorial-grid border-t border-rule py-8 md:py-10"
            >
              <h2 className="meta margin">{t(section.key)}</h2>
              <p className="main max-w-[62ch] text-lg">{section.body}</p>
            </section>
          ))}

          <section className="editorial-grid border-t border-rule py-8 md:py-10">
            <h2 className="meta margin">{t('highlights')}</h2>
            <ul className="main max-w-[62ch] space-y-5">
              {project.highlights[locale].map(item => (
                <li key={item} className="flex gap-4">
                  <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {project.stack.length > 0 ? (
            <section className="editorial-grid border-t border-rule py-8 md:py-10">
              <h2 className="meta margin">{t('stack')}</h2>
              <p className="main font-mono text-sm text-muted">{project.stack.join(' · ')}</p>
            </section>
          ) : null}

          {project.outcome ? (
            <section className="editorial-grid border-t border-rule py-8 md:py-10">
              <h2 className="meta margin">{t('outcome')}</h2>
              <p className="main max-w-[62ch] text-lg">{project.outcome[locale]}</p>
            </section>
          ) : null}
        </div>

        <nav
          aria-label={t('back')}
          className="mt-8 grid gap-px border-y border-rule bg-rule sm:grid-cols-2"
        >
          {previous ? (
            <Link href={`/projects/${previous.slug}`} className="group bg-bg py-8 sm:pr-8">
              <span className="meta flex items-center gap-2">
                <ArrowLeft size={14} aria-hidden="true" /> {t('previous')}
              </span>
              <span className="title mt-3 block group-hover:text-accent">{previous.title}</span>
            </Link>
          ) : (
            <span className="hidden bg-bg sm:block" />
          )}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="group bg-bg py-8 sm:pl-8 sm:text-right"
            >
              <span className="meta flex items-center gap-2 sm:justify-end">
                {t('next')} <ArrowRight size={14} aria-hidden="true" />
              </span>
              <span className="title mt-3 block group-hover:text-accent">{next.title}</span>
            </Link>
          ) : null}
        </nav>
      </main>
      <Footer />
    </>
  )
}
