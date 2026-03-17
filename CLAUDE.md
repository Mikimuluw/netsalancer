# Netsalancer

Freelancer platform website for the Ethiopian market. Built with Next.js 16 + TypeScript, deployed on Vercel.

## Critical Rules

- **NEVER push to `main`** — Vercel auto-deploys from main to netsalancer.info. All work must go on feature branches.
- The coffee flavor wheel feature has been removed from this repo and lives separately in `~/coffee-flavor-wheel/`.

## Development

```bash
npm install
npm run dev        # starts on localhost:3000
npx next build     # production build check
```

## Stack

- Next.js 16 (App Router, Turbopack)
- TypeScript 5.9
- Tailwind CSS
- Vercel (deployment)

## Structure

- `app/` — routes and pages
- `components/` — React components
- `lib/` — utilities (exchange rates, etc.)
- `public/` — static assets
