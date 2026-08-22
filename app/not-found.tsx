import Link from 'next/link'
import { ArrowLeft, GitBranch } from 'lucide-react'
import { PageEnvironment } from '@/components/ui/PageEnvironment'

export default function NotFound() {
  return <div className="experience-page not-found"><PageEnvironment tone="systems" /><div><span>404 · route unresolved</span><GitBranch size={42} /><h1>This path<br /><em>does not exist.</em></h1><p>The system is healthy. The requested route is not part of the graph.</p><Link href="/"><ArrowLeft size={16} /> Return home</Link></div></div>
}
