import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Hero } from '@/components/home/hero'
import { TechStack } from '@/components/home/tech-stack'
import { NowPlaying } from '@/components/home/now-playing'
import { ChessStats } from '@/components/home/chess-stats'
import { SelectedWorks } from '@/components/home/selected-works'
import { Divider } from '@/components/ui/divider'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Divider className="mx-10 max-w-[1200px] md:mx-auto" />
        <TechStack />
        <Divider className="mx-10 max-w-[1200px] md:mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-2">
          <NowPlaying />
          <ChessStats />
        </div>
        <Divider className="mx-10 max-w-[1200px] md:mx-auto" />
        <SelectedWorks />
      </main>
      <Footer />
    </>
  )
}
