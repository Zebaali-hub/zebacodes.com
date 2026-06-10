import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './posts/**/*.mdx',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans:    ['"Geist"', 'system-ui', 'sans-serif'],
        mono:    ['"Geist Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
