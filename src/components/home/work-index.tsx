'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { ALSO, PROJECTS } from '@/content/projects'
import { Diagram, diagramWidth } from '@/components/diagrams/diagrams'
import { DiagramScroller } from '@/components/diagrams/diagram-scroller'
import type { Locale, Project } from '@/types'

const toggleClass =
  'link-underline-static link-underline py-2 font-mono text-xs uppercase tracking-[0.08em] text-muted hover:text-accent'

function ProjectLinks({ project, locale }: { project: Project; locale: Locale }) {
  const t = useTranslations('work')
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
      <li>
        <Link
          href={`/projects/${project.slug}`}
          className="link-underline inline-flex items-center gap-1 text-fg"
        >
          {t('case_study')}
          <span className="sr-only">: {project.title}</span>
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </li>
      {project.links.map(link => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline inline-flex items-center gap-1 text-muted hover:text-fg"
          >
            {link.label[locale]}
            <span className="sr-only">: {project.title}</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  )
}

interface DiagramToggleProps {
  project: Project
  open: boolean
  onToggle: () => void
  locale: Locale
  className?: string
  wideOnDesktop?: boolean
}

function DiagramToggle({
  project,
  open,
  onToggle,
  locale,
  className = '',
  wideOnDesktop = false,
}: DiagramToggleProps) {
  const t = useTranslations('work')
  const id = `diagram-${project.slug}`
  return (
    <div className={className}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={wideOnDesktop ? `${id} ${id}-wide` : id}
        className={toggleClass}
      >
        {open ? '− ' : '+ '}
        {open ? t('hide_diagram') : t('show_diagram')}
      </button>
      {open ? (
        <div id={id} className={`mt-4 border border-rule p-3 ${wideOnDesktop ? 'lg:hidden' : ''}`}>
          <DiagramScroller
            label={`${project.title}: ${t('diagram')}`}
            minWidth={diagramWidth(project.diagram)}
          >
            <Diagram name={project.diagram} locale={locale} />
          </DiagramScroller>
          <p className="meta mt-3 sm:hidden">{t('scroll_hint')}</p>
        </div>
      ) : null}
    </div>
  )
}

interface ProjectImageProps {
  project: Project
  locale: Locale
  sizes: string
}

function ProjectImageFigure({ project, locale, sizes }: ProjectImageProps) {
  if (!project.image) return null
  return (
    <Image
      src={project.image.src}
      width={project.image.width}
      height={project.image.height}
      alt={project.image.alt[locale]}
      sizes={sizes}
      className="h-auto w-full border border-rule"
    />
  )
}

export function WorkIndex() {
  const t = useTranslations('work')
  const locale = useLocale() as Locale
  const [open, setOpen] = useState<string | null>(null)
  const [featured, ...rest] = PROJECTS
  const toggle = (slug: string) => setOpen(current => (current === slug ? null : slug))
  const openSecondary = rest.find(project => project.slug === open)

  return (
    <section id="work" aria-labelledby="work-heading" className="section">
      <div className="page">
        <div className="editorial-grid">
          <p className="meta margin">{t('label')}</p>
          <div className="main">
            <h2
              id="work-heading"
              className="max-w-[30ch] font-display text-2xl font-light leading-tight md:text-3xl"
            >
              {t('title')}
            </h2>
          </div>
        </div>

        <article className="mt-10 grid grid-cols-1 gap-8 border-t border-rule pt-8 md:mt-12 xl:grid-cols-12 xl:gap-x-6">
          <div className="min-w-0 xl:col-span-4">
            <p className="meta">
              {featured.context[locale]}
              {' '}· {featured.year}
            </p>
            <h3 className="h2 mt-4">
              <Link href={`/projects/${featured.slug}`} className="hover:text-accent">
                {featured.title}
              </Link>
            </h3>
            <p className="mt-5 max-w-[48ch] text-muted">{featured.summary[locale]}</p>
            <p className="mt-5 font-mono text-xs leading-relaxed text-subtle">
              {featured.stack.join(' · ')}
            </p>
            <div className="mt-6">
              <ProjectLinks project={featured} locale={locale} />
            </div>
            <DiagramToggle
              project={featured}
              open={open === featured.slug}
              onToggle={() => toggle(featured.slug)}
              locale={locale}
              className="mt-4 md:hidden"
            />
          </div>
          <figure className="hidden md:block xl:col-span-8">
            <ProjectImageFigure
              project={featured}
              locale={locale}
              sizes="(min-width: 1024px) 58vw, 100vw"
            />
            <div className={`border border-rule p-6 ${featured.image ? 'mt-4' : ''}`}>
              <div className="mx-auto max-w-[760px]">
                <Diagram name={featured.diagram} locale={locale} />
              </div>
            </div>
            <figcaption className="meta mt-3">{t('diagram')}</figcaption>
          </figure>
        </article>

        <ol className="mt-12 grid grid-cols-1 gap-px border-y border-rule bg-rule md:mt-16 lg:grid-cols-3">
          {rest.map(project => (
            <li
              key={project.slug}
              className="flex min-w-0 flex-col bg-bg py-8 lg:px-6 lg:first:pl-0 lg:last:pr-0"
            >
              <ProjectImageFigure
                project={project}
                locale={locale}
                sizes="(min-width: 1024px) 30vw, 100vw"
              />
              <p className={`meta ${project.image ? 'mt-5' : ''}`}>
                {project.context[locale]}
                {' '}· {project.year}
              </p>
              <h3 className="title mt-3">
                <Link href={`/projects/${project.slug}`} className="hover:text-accent">
                  {project.title}
                </Link>
              </h3>
              <p className="mt-3 max-w-[52ch] text-base text-muted">{project.summary[locale]}</p>
              {project.stack.length > 0 ? (
                <p className="mt-4 font-mono text-xs leading-relaxed text-subtle">
                  {project.stack.slice(0, 6).join(' · ')}
                </p>
              ) : null}
              <div className="mt-auto pt-6">
                <ProjectLinks project={project} locale={locale} />
                <DiagramToggle
                  project={project}
                  open={open === project.slug}
                  onToggle={() => toggle(project.slug)}
                  locale={locale}
                  className="mt-3"
                  wideOnDesktop
                />
              </div>
            </li>
          ))}
        </ol>

        {openSecondary ? (
          <figure
            id={`diagram-${openSecondary.slug}-wide`}
            className="mt-6 hidden border border-rule p-6 lg:block"
          >
            <div className="mx-auto max-w-[880px]">
              <Diagram name={openSecondary.diagram} locale={locale} />
            </div>
            <figcaption className="meta mt-3">
              {openSecondary.title} · {t('diagram')}
            </figcaption>
          </figure>
        ) : null}

        <p className="mt-6 text-sm text-muted">
          <span className="meta mr-3">{t('also')}</span>
          {ALSO.map(item => (
            <span key={item.title}>
              <span className="text-fg">{item.title}</span> · {item.context[locale]}
              {' '}· {item.year}
              <span className="font-mono text-xs text-subtle"> — {item.stack.join(' · ')}</span>
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
