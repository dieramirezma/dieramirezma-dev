import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Hero } from '@/components/home/hero'
import { LiveMetrics } from '@/components/home/live-metrics'
import { SelectedWorks } from '@/components/home/selected-works'
import { Divider } from '@/components/ui/divider'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Divider className="mx-10 max-w-[1200px] md:mx-auto" />
        <LiveMetrics />
        <Divider className="mx-10 max-w-[1200px] md:mx-auto" />
        <SelectedWorks />
      </main>
      <Footer />
    </>
  )
}
