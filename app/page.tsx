import { Hero } from '@/components/sections/Hero'
import { IdentityPhilosophy } from '@/components/sections/IdentityPhilosophy'
import { FeaturedSystems } from '@/components/sections/FeaturedSystems'
import { SystemThinking } from '@/components/sections/SystemThinking'
import { ExperienceTechnology } from '@/components/sections/ExperienceTechnology'
import { ActivityContact } from '@/components/sections/ActivityContact'

export default function HomePage() {
  const person = {
    '@context': 'https://schema.org', '@type': 'Person', name: 'Zeba Ali', url: 'https://zebacodes.com',
    jobTitle: 'Backend Engineer', sameAs: ['https://github.com/Zebaali-hub', 'https://linkedin.com/in/zeba-a-7173251a0'],
    knowsAbout: ['Java', 'Spring Boot', 'Distributed Systems', 'Databases'],
  }
  return <div className="portfolio-v2">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, '\u003c') }} />
    <Hero />
    <IdentityPhilosophy />
    <FeaturedSystems />
    <SystemThinking />
    <ExperienceTechnology />
    <ActivityContact />
  </div>
}
