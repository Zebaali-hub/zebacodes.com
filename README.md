# zebacodes.com

The source for [Zeba Ali's engineering portfolio](https://zebacodes.com): an editorial, interactive presentation of backend systems, technical writing, and professional experience.

The homepage is structured around engineering evidence rather than a résumé dump. Its project case studies were written after reviewing the linked repositories and explicitly distinguish implemented behavior from documented limitations.

## What is here

- Interactive spatial backend-system hero with keyboard and reduced-motion support
- Verified case studies for OrderFlow, DB Stress Framework, Log Intelligence Tool, Job Radar, and Self Drill
- Backend architecture mental model and technology map
- Experience timeline and public learning repository
- Filesystem-backed MDX writing with syntax highlighting, generated routes, and table of contents
- Optional Supabase-backed contact/newsletter persistence and Resend email delivery
- Generated Open Graph image, structured data, robots file, and sitemap

## Stack

- Next.js 16 App Router, React 19, and strict TypeScript
- Tailwind CSS 4 plus focused global CSS for the portfolio visual system
- Framer Motion for restrained viewport reveals
- MDX via `next-mdx-remote`, `gray-matter`, remark, and rehype
- Supabase and Resend for optional form integrations
- Vitest and ESLint
- Vercel deployment in the Mumbai region

## Run locally

Requirements: a current Node.js LTS release and npm.

```bash
git clone https://github.com/Zebaali-hub/zebacodes.com.git
cd zebacodes.com
npm ci
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. The portfolio and writing pages do not require external services. Contact and newsletter submissions return a service-unavailable response until their variables are configured.

## Environment

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
RESEND_API_KEY=
```

The Supabase project needs `contact_submissions` and `newsletter_subscribers` tables. Their reference schemas are documented in `.env.example`. Keep Row Level Security enabled and permit only the insert behavior required by the public forms.

## Quality checks

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm audit --omit=dev
```

## Content

Project evidence is centralized in `data/portfolio.ts`. Writing lives in `posts/<category>/*.mdx`; see [WRITING.md](WRITING.md) for the publishing format.

## Deployment

`vercel.json` preserves the production Vercel build, security headers, and Mumbai region. Pushes to `main` deploy through the existing connected Vercel project. DNS and domain ownership are managed outside this repository.

## License

This repository currently has no open-source license. The source is publicly visible, but reuse is not granted unless a license is added later.
