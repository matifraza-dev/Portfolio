# Atif Raza — Portfolio (Django + React)

A full rebuild of the portfolio on a real Python stack: a Django REST
Framework API serving all résumé content and three genuinely-functional
analysis tools, and a React 19 + TypeScript + Tailwind + Framer Motion
frontend consuming it.

## Why this stack
- **Backend: Django + DRF.** Matches the stack on your CV, and gives you an
  admin panel (`/admin/`) to edit projects, experience, skills, and stats
  without touching code or redeploying the frontend.
- **Frontend: React 19 + TypeScript + Vite + Tailwind + Framer Motion.**
  Same frontend stack as SolidPrime, so the portfolio itself doubles as a
  live example of it.
- **Tools are real, not decorative.** The three free tools (SEO Checker,
  Site Performance, Competitor Analysis) fetch the URL you give them
  server-side and measure it — title/meta length, heading structure, alt
  text, response time, page weight, robots.txt/sitemap.xml — live, every
  time. Nothing is hardcoded or AI-hallucinated, and the Site Performance
  tool explicitly tells the visitor it can't show real traffic numbers
  (that requires a paid analytics data source), rather than making them up.

## Project layout
```
backend/            Django project
  portfolio_backend/   settings, urls
  core/                Project/Experience/Skill/Stat models + API + seed_data command
  contact/             Contact form model + API (emails you on submit)
  tools/               scraper.py (real analysis engine) + 3 tool endpoints
frontend/            React app
  src/components/      Nav, Hero, About, Experience, Projects, Skills, Tools, Contact
  src/lib/             API client, TypeScript types, offline fallback data
```

## Run it locally

### Backend
```bash
cd backend
python -m venv venv && source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env      # then edit as needed
python manage.py migrate
python manage.py seed_data          # loads your résumé content
python manage.py createsuperuser    # optional, for /admin/
python manage.py runserver
```
API now live at `http://127.0.0.1:8000/api/`.

### Frontend
```bash
cd frontend
cp .env.example .env      # VITE_API_BASE_URL, defaults to localhost:8000
npm install
npm run dev
```
Site now live at `http://127.0.0.1:5173`. If the backend isn't running,
the résumé sections still render from `src/lib/fallbackData.ts` so the
site is never empty — only the three live tools need the backend up.

## Editing your content
Everything résumé-shaped (stats, skills, experience, education, projects)
lives in the database, editable at `/admin/` once you've created a
superuser — no more editing HTML by hand for a new project or job. The
seed command (`core/management/commands/seed_data.py`) is the source of
truth for the initial load; edit it and re-run `seed_data` to reset, or
just use the admin going forward.

## Deploying (matching your current setup)
- **Frontend → Vercel**, same as now: point Vercel at `frontend/`, set
  `VITE_API_BASE_URL` to your deployed backend's `/api` URL in the Vercel
  project's environment variables, build command `npm run build`, output
  `dist`.
- **Backend → PythonAnywhere** (or Render/Railway): set `DJANGO_DEBUG=False`,
  `DJANGO_SECRET_KEY`, `DJANGO_ALLOWED_HOSTS`, and `CORS_ALLOWED_ORIGINS`
  (your Vercel domain) as environment variables, run
  `python manage.py migrate && python manage.py collectstatic`, then serve
  via WSGI (PythonAnywhere's web app config points at
  `portfolio_backend.wsgi.application`).
- Point your contact form's `CONTACT_NOTIFICATION_EMAIL` env var and
  configure Django's `EMAIL_*` settings (not included by default — add an
  SMTP or provider backend) if you want form submissions emailed to you;
  they're always saved to the database either way, visible in `/admin/`.

## Design notes
Palette is near-black (`#0D1117`) with a signal-amber accent (`#FFB454`)
and a muted teal for secondary emphasis — a terminal/engineering register
that fits a developer-coordinator brand, rather than a generic SaaS
gradient. Type pairing is Space Grotesk (display) + IBM Plex Sans (body).
Motion is a single staggered hero reveal plus a looping tech-stack ticker;
everything else animates only on scroll-into-view or user interaction, and
respects `prefers-reduced-motion`.
