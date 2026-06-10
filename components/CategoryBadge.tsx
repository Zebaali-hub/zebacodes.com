import { getCategoryConfig } from '@/lib/categories'

export default function CategoryBadge({ category }: { category: string }) {
  const cfg = getCategoryConfig(category)
  return (
    <span
      className={`inline-flex items-center font-mono text-xs px-2 py-0.5 rounded border shrink-0 ${cfg.bg} ${cfg.text} ${cfg.border}`}
    >
      {cfg.label}
    </span>
  )
}
