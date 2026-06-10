export const CATEGORIES = {
  dsa:           { label: 'DSA',          bg: 'bg-indigo-950', text: 'text-indigo-400', border: 'border-indigo-800' },
  java:          { label: 'Java',         bg: 'bg-orange-950', text: 'text-orange-400', border: 'border-orange-800' },
  db:            { label: 'DB',           bg: 'bg-blue-950',   text: 'text-blue-400',   border: 'border-blue-800'   },
  'spring-boot': { label: 'Spring Boot',  bg: 'bg-green-950',  text: 'text-green-400',  border: 'border-green-800'  },
  lld:           { label: 'LLD',          bg: 'bg-purple-950', text: 'text-purple-400', border: 'border-purple-800' },
  hld:           { label: 'HLD',          bg: 'bg-teal-950',   text: 'text-teal-400',   border: 'border-teal-800'   },
  career:        { label: 'Career',       bg: 'bg-amber-950',  text: 'text-amber-400',  border: 'border-amber-800'  },
  'women-in-tech':{ label: 'Women in Tech', bg: 'bg-rose-950', text: 'text-rose-400',  border: 'border-rose-800'   },
} as const

export type CategoryKey = keyof typeof CATEGORIES

export function getCategoryConfig(category: string) {
  if (category in CATEGORIES) {
    return CATEGORIES[category as CategoryKey]
  }
  return { label: category, bg: 'bg-zinc-950', text: 'text-zinc-400', border: 'border-zinc-800' }
}
