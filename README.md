# Frenzy Interiors

Premium interior decoration, painting services, wall finishes, and furniture solutions in Nigeria.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth (Email/Password)
- **Deployment**: Netlify, Vercel, or any Node.js host

## Prerequisites

1. **Node.js 18+** and npm
2. **Supabase Project** - Create free at [supabase.com](https://supabase.com)
3. **Git** (for GitHub deployment)

## Quick Start

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd frenzy-interiors
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

Get credentials from your Supabase Dashboard > Project Settings > API:
- `NEXT_PUBLIC_SUPABASE_URL` - Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - `anon` public key
- `SUPABASE_SERVICE_ROLE_KEY` - `service_role` secret key (for admin scripts)

### 3. Database Setup

Run migrations in order via Supabase SQL Editor (or use Supabase CLI):

1. `supabase/migrations/001_create_core_schema.sql`
2. `supabase/migrations/002_rls_policies.sql`
3. `supabase/migrations/003_seed_data.sql`
4. `supabase/migrations/004_seed_products_and_posts.sql`

### 4. Create Admin User

After running migrations, create your admin login:

```sql
-- In Supabase SQL Editor
INSERT INTO admin_users (user_id, email, role, full_name)
VALUES (
  'your-auth-user-id',
  'your-email@example.com',
  'admin',
  'Your Name'
);
```

Or use Supabase Auth to sign up, then insert the matching row into `admin_users`.

### 5. Run Locally

```bash
npm run dev
```

- Website: http://localhost:9091
- Admin: http://localhost:9091/login

## Deployment

### Deploy to Netlify

1. Push code to GitHub
2. Connect repo in Netlify Dashboard
3. Set environment variables in Netlify UI
4. Build command: `next build` (already configured in `netlify.toml`)

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel Dashboard
3. Set environment variables in Vercel UI
4. Framework preset: Next.js (already configured in `vercel.json`)

### Deploy to GitHub Pages

For static hosting, use `output: 'export'` in `next.config.js` and build with `next build`.

**Note**: This requires Supabase to be accessible from the client (use public `anon` key).

## Project Structure

```
app/
  ├── admin/            # Admin dashboard pages
  ├── api/              # API routes
  ├── blog/             # Blog pages
  ├── contact/          # Contact page
  ├── services/         # Service pages
  ├── products/         # Product pages
  ├── portfolio/        # Portfolio pages
  ├── gallery/          # Gallery page
  ├── about/            # About page
  ├── faq/              # FAQ page
  └── ...
components/
  ├── admin/            # Admin components (sidebar, auth guard, dashboard)
  ├── sections/         # Homepage sections
  ├── ui/               # shadcn/ui components
  └── ...
lib/
  └── supabase/         # Supabase client
supabase/
  └── migrations/       # SQL migrations
```

## Admin Dashboard

- **URL**: `/login`
- **Features**: Products, Services, Portfolio, Blog, Gallery, Testimonials, Leads, Settings
- **Auth**: Supabase email/password with role-based access

## SEO

- `robots.txt` - Blocks `/admin/*`
- `sitemap.xml` - Auto-generated static sitemap
- `manifest.json` - PWA manifest
- Open Graph metadata on every page

## Customization

- Edit colors in `tailwind.config.ts` (primary: `#0a1a3a`, accent: `#d4af37`)
- Edit site info in `app/layout.tsx` metadata
- Update phone numbers in `components/whatsapp-button.tsx`

## License

MIT - Built for Frenzy Interiors Nigeria.
