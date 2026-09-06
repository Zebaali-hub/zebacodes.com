import { readdirSync } from 'node:fs'
import path from 'node:path'
import Image from 'next/image'

const IMAGE = /\.(png|jpe?g|webp|avif)$/i

/**
 * Renders screenshots (Grafana dashboards, Swagger UI, anything visual) for a
 * project by scanning public/projects/<dir> at build time. Drop files in and
 * they appear; until then nothing renders, so there is no dead UI.
 */
export function ProjectShots({ dir, name }: { dir: string; name: string }) {
  let files: string[] = []
  try {
    files = readdirSync(path.join(process.cwd(), 'public', 'projects', dir))
      .filter((file) => IMAGE.test(file))
      .sort()
  } catch {
    return null
  }
  if (files.length === 0) return null
  return (
    <div className="shot-grid">
      {files.map((file) => (
        <figure key={file} className="shot">
          <Image src={`/projects/${dir}/${file}`} alt={`${name} — ${file.replace(IMAGE, '').replace(/[-_]/g, ' ')}`} fill sizes="(max-width: 900px) 100vw, 50vw" />
        </figure>
      ))}
    </div>
  )
}
