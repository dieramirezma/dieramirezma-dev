import { useTranslations } from 'next-intl'
import { Reveal } from '@/components/ui/reveal'

const GROUPS = [
  {
    key: 'interfaces',
    primary: ['React', 'Next.js', 'TypeScript'],
    secondary: ['TanStack Query', 'Tailwind CSS', 'Orval'],
    supporting: ['Astro', 'Shadcn UI'],
  },
  {
    key: 'systems',
    primary: ['Python', 'Django', 'PostgreSQL'],
    secondary: ['Node.js', 'REST APIs'],
    supporting: ['FastAPI', 'Flask', 'Go', 'NextAuth'],
  },
  {
    key: 'delivery',
    primary: ['AWS', 'Docker', 'GitHub Actions'],
    secondary: ['Vitest', 'React Testing Library'],
    supporting: ['Google Cloud', 'Kubernetes / GKE'],
  },
] as const

const CREDENTIALS = [
  ['degree', 'degree_meta'],
  ['cred_1', 'cred_1_meta'],
  ['cred_2', 'cred_2_meta'],
  ['cred_3', 'cred_3_meta'],
] as const

export function Capabilities() {
  const t = useTranslations('capabilities')
  const about = useTranslations('about')

  return (
    <section id="about" aria-labelledby="capabilities-heading" className="section">
      <div className="page">
        <div className="editorial-grid">
          <h2 id="capabilities-heading" className="meta margin">
            {about('label')}
          </h2>
          <p className="lead main max-w-[56ch]">{about('body_1')}</p>
        </div>

        <div className="mt-12 grid gap-px border-y border-rule bg-rule md:mt-20 lg:grid-cols-3">
          {GROUPS.map((group, index) => (
            <Reveal
              key={group.key}
              delay={index * 0.08}
              className="bg-bg py-8 lg:px-8 lg:first:pl-0 lg:last:pr-0"
            >
              <h3 className="meta text-fg">{t(group.key)}</h3>
              <ul className="mt-4 space-y-0.5 font-display text-2xl leading-snug">
                {group.primary.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-base text-muted">{group.secondary.join(' · ')}</p>
              <p className="mt-3 font-mono text-xs leading-relaxed text-subtle">
                {group.supporting.join(' · ')}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="editorial-grid mt-14 md:mt-20">
          <h3 className="meta margin">{about('education_label')}</h3>
          <dl className="main border-t border-rule">
            {CREDENTIALS.map(([title, meta]) => (
              <div
                key={title}
                className="grid gap-1 border-b border-rule py-4 md:grid-cols-[1fr_1.4fr] md:gap-6"
              >
                <dt className="text-fg">{about(title)}</dt>
                <dd className="text-sm text-muted md:text-base">{about(meta)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
