# zebacodes.com — Zeba Ali's Portfolio

Personal portfolio for Zeba Ali — Backend Engineer specializing in high-scale databases, distributed systems, and AI infrastructure. Built with Next.js 15, TypeScript, Tailwind CSS v4, and Framer Motion.

## Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + Framer Motion
- **Database**: Supabase (contact form submissions)
- **Email**: Resend (contact form notifications)
- **Deployment**: Vercel (Mumbai region)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Hero, tech strip, stats, project previews, blog preview |
| `/about` | Career timeline, skill cards, open-to-work section |
| `/projects` | Log Intelligence Tool, DB Stress Framework, Vector Search Benchmark |
| `/blog` | Three technical articles on database internals and AI infra |
| `/contact` | Contact form (Supabase + Resend) |

## Local Development

```bash
# 1. Clone
git clone https://github.com/zebacodes/zebacodes.com
cd zebacodes.com

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase and Resend credentials

# 4. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `RESEND_API_KEY` | Resend API key for email |

## Supabase Setup

Run this SQL in your Supabase project to create the contact submissions table:

```sql
create table contact_submissions (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz default now()
);

-- Enable RLS
alter table contact_submissions enable row level security;

-- Allow inserts from anon (form submissions)
create policy "Allow anon inserts"
  on contact_submissions for insert
  to anon
  with check (true);
```

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Add environment variables in the Vercel dashboard under **Settings → Environment Variables**.

## Project Structure

```
├── app/
│   ├── page.tsx              # Home / Hero
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles + Tailwind theme
│   ├── about/page.tsx        # About + timeline
│   ├── projects/page.tsx     # Projects showcase
│   ├── blog/page.tsx         # Blog articles
│   ├── contact/page.tsx      # Contact form
│   └── api/contact/route.ts  # Contact API handler
├── components/
│   ├── Navbar.tsx            # Sticky nav with mobile menu
│   └── Footer.tsx            # Site footer
├── lib/
│   ├── supabase.ts           # Supabase client
│   └── resend.ts             # Resend email helper
├── tailwind.config.ts        # Tailwind configuration
├── vercel.json               # Vercel deployment config
└── .env.example              # Environment variable template
```

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#0A0F1E` | Page background |
| Accent | `#2E75B6` | Primary blue |
| Highlight | `#00D4FF` | Cyan highlight |
| Glass | `rgba(255,255,255,0.04)` + blur(20px) | Cards and surfaces |
