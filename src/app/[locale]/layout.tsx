import type { Metadata } from 'next'
import { Geist, Geist_Mono, Sofia_Sans_Condensed } from 'next/font/google'
import { notFound } from 'next/navigation'
import { ThemeProvider } from 'next-themes'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { MotionProvider } from '@/components/ui/motion-provider'
import { QueryProvider } from '@/providers/query-provider'
import { routing } from '@/i18n/routing'
import { SITE_URL } from '@/lib/site'
import '../globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })
const sofiaCondensed = Sofia_Sans_Condensed({
  variable: '--font-sofia-condensed',
  subsets: ['latin'],
  weight: ['300', '400'],
})

const PERSON = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Diego Nicolás Ramírez',
  url: SITE_URL,
  email: 'mailto:dieramirezma.dev@gmail.com',
  jobTitle: 'Software Engineer',
  address: { '@type': 'PostalAddress', addressLocality: 'Bogotá', addressCountry: 'CO' },
  sameAs: ['https://github.com/dieramirezma', 'https://linkedin.com/in/dieramirezma'],
  worksFor: { '@type': 'Organization', name: 'Dapper' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universidad Nacional de Colombia' },
}

const WEBSITE = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Diego Ramírez',
  url: SITE_URL,
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  const url = `${SITE_URL}/${locale}`
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t('title'), template: '%s | Diego Ramírez' },
    description: t('description'),
    keywords: [
      'Software Engineer',
      'Frontend Engineer',
      'Full Stack Engineer',
      'React',
      'Next.js',
      'TypeScript',
      'Python',
      'Django',
      'PostgreSQL',
      'AWS',
      'Bogotá',
      'Colombia',
    ],
    alternates: {
      canonical: url,
      languages: { en: `${SITE_URL}/en`, es: `${SITE_URL}/es`, 'x-default': `${SITE_URL}/en` },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'es' ? 'es_CO' : 'en_US',
      url,
      siteName: 'Diego Ramírez',
      title: t('og_title'),
      description: t('og_description'),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('og_title'),
      description: t('og_description'),
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const messages = await getMessages()
  const skip = (await getTranslations({ locale, namespace: 'nav' }))('skip')

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} ${sofiaCondensed.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <noscript>
          <style>{'[data-reveal]{opacity:1!important;transform:none!important}'}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([PERSON, WEBSITE]).replace(/</g, '\\u003c'),
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
        >
          {skip}
        </a>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <NextIntlClientProvider messages={messages}>
            <MotionProvider>
              <QueryProvider>{children}</QueryProvider>
            </MotionProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
