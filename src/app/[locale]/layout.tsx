import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { QueryProvider } from '@/providers/query-provider'
import '../globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Diego Nicolás Ramírez',
  url: 'https://dieramirezma.dev',
  email: 'mailto:dieramirezma.dev@gmail.com',
  jobTitle: 'Software Engineer',
  address: { '@type': 'PostalAddress', addressLocality: 'Bogotá', addressCountry: 'CO' },
  sameAs: ['https://github.com/dieramirezma', 'https://linkedin.com/in/dieramirezma'],
  worksFor: { '@type': 'Organization', name: 'Dapper' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universidad Nacional de Colombia' },
}

export const metadata: Metadata = {
  metadataBase: new URL('https://dieramirezma.dev'),
  title: {
    default: 'Diego Ramírez — Software Engineer | React, Next.js & TypeScript',
    template: '%s | Diego Ramírez',
  },
  description:
    'Software Engineer based in Bogotá building scalable web products with React, Next.js and TypeScript, with full-stack experience in Python/Django, PostgreSQL and AWS.',
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
  alternates: { canonical: 'https://dieramirezma.dev' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dieramirezma.dev',
    siteName: 'Diego Ramírez',
    title: 'Diego Ramírez — Software Engineer',
    description:
      'Software Engineer building scalable web products with React, Next.js and TypeScript.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diego Ramírez — Software Engineer',
    description: 'React, Next.js and TypeScript specialist with full-stack and cloud experience.',
  },
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const messages = await getMessages()
  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(STRUCTURED_DATA).replace(/</g, '\\u003c'),
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <NextIntlClientProvider messages={messages}>
            <QueryProvider>{children}</QueryProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
