import { useTranslations } from 'next-intl'
import { Reveal } from '@/components/ui/reveal'

const ROLES = [
  {
    key: 'dapper',
    visible: ['dapper_1', 'dapper_2', 'dapper_3'],
    more: ['dapper_4', 'dapper_5'],
    stack: [
      'React',
      'Next.js',
      'TypeScript',
      'Python',
      'Django',
      'PostgreSQL',
      'AWS',
      'Vitest',
      'GitHub Actions',
      'FastAPI',
    ],
  },
  {
    key: 'freelance',
    visible: ['freelance_1', 'freelance_2'],
    more: [],
    stack: ['Next.js', 'Astro', 'React', 'Django', 'PostgreSQL', 'Wompi'],
  },
] as const

export function Experience() {
  const t = useTranslations('experience')

  return (
    <section id="experience" aria-labelledby="experience-heading" className="section">
      <div className="page">
        <h2 id="experience-heading" className="meta">
          {t('label')}
        </h2>

        <div className="mt-6">
          {ROLES.map(role => (
            <Reveal key={role.key}>
              <article className="editorial-grid border-t border-rule py-10 md:py-12">
                <div className="margin">
                  <p className="meta text-fg">{t(`${role.key}_date`)}</p>
                  <p className="meta mt-2">{t(`${role.key}_meta`)}</p>
                </div>
                <div className="main">
                  <h3 className="title">{t(`${role.key}_company`)}</h3>
                  <p className="mt-2 text-lg text-fg">{t(`${role.key}_role`)}</p>
                  <p className="mt-6 max-w-[60ch] text-muted">{t(`${role.key}_summary`)}</p>

                  <ul className="mt-8 max-w-[68ch] space-y-5">
                    {role.visible.map(bullet => (
                      <li key={bullet} className="flex gap-4">
                        <span
                          aria-hidden="true"
                          className="mt-[0.7em] h-px w-4 shrink-0 bg-accent"
                        />
                        <span>{t(bullet)}</span>
                      </li>
                    ))}
                  </ul>

                  {role.more.length > 0 ? (
                    <details className="group mt-6 max-w-[68ch]">
                      <summary className="link-underline-static link-underline inline-block cursor-pointer font-mono text-xs uppercase tracking-[0.08em] text-muted hover:text-accent">
                        <span className="group-open:hidden">+ {t('full_detail')}</span>
                        <span className="hidden group-open:inline">− {t('full_detail')}</span>
                      </summary>
                      <ul className="mt-5 space-y-5">
                        {role.more.map(bullet => (
                          <li key={bullet} className="flex gap-4">
                            <span
                              aria-hidden="true"
                              className="mt-[0.7em] h-px w-4 shrink-0 bg-rule-strong"
                            />
                            <span>{t(bullet)}</span>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : null}

                  <p className="mt-8 font-mono text-xs leading-relaxed text-subtle">
                    <span className="uppercase tracking-[0.08em]">{t('stack')}</span> —{' '}
                    {role.stack.join(' · ')}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
