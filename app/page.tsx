import type { Metadata } from 'next'
import { Hero } from '@/components/sections/reframe/Hero'
import { Capabilities } from '@/components/sections/reframe/Capabilities'
import { Work } from '@/components/sections/reframe/Work'
import { Experience } from '@/components/sections/reframe/Experience'
import { Contact } from '@/components/sections/reframe/Contact'

export const metadata: Metadata = {
  title: 'Zeba Ali — Backend Engineer, Database & AI Infrastructure',
  description:
    'Backend engineer working at the database and AI-infrastructure layer. Four years inside Oracle’s RDBMS engine — query processing, execution plans, and vector-search benchmarking at billion-row scale.',
  alternates: { canonical: '/' },
}

const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Zeba Ali',
  url: 'https://zebacodes.com',
  email: 'mailto:zebaali1415@gmail.com',
  jobTitle: 'Backend Engineer — Database & AI Infrastructure',
  description: 'Backend engineer working at the database and AI-infrastructure layer.',
  sameAs: ['https://github.com/Zebaali-hub', 'https://linkedin.com/in/zeba-a-7173251a0'],
  knowsAbout: [
    'Database internals', 'Query processing', 'Execution plans', 'Vector search', 'HNSW', 'IVF',
    'pgvector', 'Java', 'Spring Boot', 'Kafka', 'PostgreSQL', 'Redis', 'Kubernetes', 'Distributed systems',
  ],
}

export default function HomePage() {
  return (
    <div className="portfolio-v3">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, '\\u003c') }}
      />
      <Hero />
      <Capabilities />
      <Work />
      <Experience />
      <Contact />
    </div>
  )
}
