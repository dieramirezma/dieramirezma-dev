import { setRequestLocale } from 'next-intl/server'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Hero } from '@/components/home/hero'
import { WorkIndex } from '@/components/home/work-index'
import { Experience } from '@/components/home/experience'
import { Capabilities } from '@/components/home/capabilities'
import { Activity } from '@/components/home/activity'
import { Contact } from '@/components/home/contact'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Experience />
        <WorkIndex />
        <Capabilities />
        <Contact />
        <Activity />
      </main>
      <Footer />
    </>
  )
}
