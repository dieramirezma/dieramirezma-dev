import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Hero } from '@/components/home/hero'
import { ProfessionalProof } from '@/components/home/professional-proof'
import { Experience } from '@/components/home/experience'
import { SelectedWorks } from '@/components/home/selected-works'
import { Capabilities } from '@/components/home/capabilities'
import { EducationContact } from '@/components/home/education-contact'
import { Divider } from '@/components/ui/divider'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Divider className="mx-10 max-w-[1200px] md:mx-auto" />
        <ProfessionalProof />
        <Divider className="mx-10 max-w-[1200px] md:mx-auto" />
        <Experience />
        <Divider className="mx-10 max-w-[1200px] md:mx-auto" />
        <SelectedWorks />
        <Divider className="mx-10 max-w-[1200px] md:mx-auto" />
        <Capabilities />
        <Divider className="mx-10 max-w-[1200px] md:mx-auto" />
        <EducationContact />
      </main>
      <Footer />
    </>
  )
}
