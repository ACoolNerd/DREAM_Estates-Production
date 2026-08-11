# Gia Michèle Design — Web Platform

Production web application for the first DREAM.Estates Production Ltd. client case study.

## Stack
- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Supabase/PostgreSQL

## Data already expected
The public storefront reads from:
- `service_tiers(id, title, price_display, description, sort_order)`
- `portfolio_assets(id, title, location, image_url, category, is_featured)`

Existing public-read RLS policies remain the authorization boundary for these public catalog tables.

## Local setup
```bash
cd apps/gia-michele-web
cp .env.example .env.local
npm install
npm run dev
```

Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` from the Supabase project Connect dialog. Never use a service-role key in this app's public environment.

## Build
```bash
npm run build
npm run start
```

## Brand rule
Gia Michèle Design owns the client-facing visual identity. ACoolBRANDING orange `#E8520F` is used only as a restrained production/system signature unless separately approved for public creative.

## Content integrity
Do not fabricate portfolio projects, testimonials, manufacturer relationships, exclusivity, licensing, lead times, pricing, or trade terms. Promote only approved records and rights-cleared media.
