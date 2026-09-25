# Dainamo Holdings website

Marketing site and content studio for **Dainamo Holdings (Pty) Ltd**, a Johannesburg specialist
contractor for epoxy and resin flooring, waterproofing, damp proofing, protective coatings and
planned building maintenance.

Next.js 16 (App Router, React 19) · Tailwind v4 · Motion · GSAP ScrollTrigger · Lenis ·
Payload CMS 3 on SQLite.

---

## Running it

```bash
npm install
cp .env.example .env      # then fill in PAYLOAD_SECRET
npm run seed              # creates the owner account and loads the content
npm run dev               # http://localhost:3111
```

### Run in Docker

```bash
docker compose up --build
```

The production container is available at **http://localhost:3111**. Compose seeds the Payload
database once before starting the web service; repeated starts leave existing records intact.
SQLite data and uploaded Payload media are kept in named Docker volumes. The seed service runs as the same user as the web service (uid 1001), so the database stays writable for enquiries. To push copy changes from `src/content` into the container's database, run `docker compose run --rm seed npm run seed -- --sync`. Set `PAYLOAD_SECRET` in
`.env` before using the container outside local development; the Compose default is only for local
testing.

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server on port 3111 |
| `npm run build` | Production build (type checks the whole project) |
| `npm run start` | Serves the production build |
| `npm run seed` | Creates the first user and seeds services, sectors, questions and company details |
| `npm run seed -- --sync` | Rewrites the copy on existing services, sectors and questions from `src/content` (overwrites studio edits) |
| `npm run generate:types` | Regenerates `src/payload-types.ts` after changing a collection |
| `node src/scripts/build-photos.mjs [key ...]` | Encodes the photo library (AVIF + WebP + blur placeholder) into `public/media/photos` |
| `node tests/shots.mjs` | Screenshots every route at 390 / 768 / 1440 and reports overflow and console errors |
| `node tests/form.mjs` | Exercises the enquiry form end to end |
| `node tests/audit.mjs` | Heading order, alt text, rendered contrast, target sizes, accessible names, and content that is present but invisible |

The content studio is at **`/admin`**. Seeded credentials are
`dainamoholdings@gmail.com` / `ChangeMe-2026!`. Change the password on first sign in.

---

## Structure

```
src/
  app/
    (frontend)/          public site, one CSS file per concern
    (payload)/           the studio, plus custom.css which brands it
    actions/enquiry.ts   server action behind the site assessment form
    llms.txt/            plain-text brief for AI assistants
    robots.ts sitemap.ts
  components/
    brand/               emblem and lockup, rebuilt as vector artwork
    chrome/              header, footer, smooth scroll, WhatsApp button
    sections/            home page sections
    forms/               site assessment form
    media/Frame.tsx      responsive AVIF/WebP picture with a blurred placeholder
  content/               copy for capabilities, sectors, questions, and photo captions (photos.ts)
  payload/               collections, globals, admin overrides
  lib/                   site facts, fonts, structured data
```

### Where the content lives

Copy currently ships in `src/content/*.ts` so the site renders with no database. The same shapes
exist as Payload collections and are seeded, which means each page can be switched to read from the
CMS one at a time without touching the layout. Start with `services` and `faqs`.

---

## Design system

One light theme, one action colour, one signal colour. Tokens are in `src/app/(frontend)/globals.css`.

- **Navy ink** `#0a1630` for type, **royal blue** `#1b5cd0` (from the company profile wordmark) for
  everything you can act on, and **demarcation yellow** `#f5b300`, borrowed from the aisle lines in
  the site photographs, used only as a marker or highlight. Never yellow text on white.
- **White surfaces** with a `#f5f7fb` mist band for alternating sections. The only dark ground is the
  navy project panel and the closing block (conversion band and footer).
- **Type**: Geist, one variable family. Display at 600 with tight negative tracking, reading at 400,
  every figure with tabular numerals.
- **Radius**: 10 / 14 / 20 / 28px, pill buttons. Soft, modern, and consistent across cards and media.
- **Motion**: short rises on scroll through `Reveal`, hover lifts on cards, and nothing that moves
  under `prefers-reduced-motion`. The custom cursor was removed for usability.

### Photography

`src/scripts/build-photos.mjs` is the single photo pipeline. It lists every image the site uses:

- **`site`**: real Dainamo photographs from `references/Client Pictures`. These carry every claim about
  the work: the hero, the service cards, the site photo rail, the capability page strips and the Work
  gallery. Captions and alt text live in `src/content/photos.ts` and describe only what is visible.
- **`scene`**: generated environment images in `references/generated` (sector settings, the
  Johannesburg skyline, a survey detail, a spray application). They set the scene and are never
  presented as Dainamo projects: `Frame` tags every one as *Illustrative*, and `describePhoto()` keeps
  their alt text honest.

- **Enhanced**: `references/enhanced` holds upscaled copies of the phone photographs most used on
  the site (Higgsfield's upscaler, no generative edits: same scene, same framing, cleaner detail). The
  pipeline uses an enhanced file automatically when its name matches the original. Close-ups of bare
  damaged concrete are deliberately left out, because upscaling smooths real texture, and a before
  photograph has to look exactly as it was.

To add a photograph, drop the source in, add a line to `SOURCES`, run the script for that key, then
caption it in `src/content/photos.ts`.

### Before and after

`src/components/sections/BeforeAfter.tsx`, on the home page and the Work page. A drag slider (a
native range input underneath, so arrow keys and screen readers work) with a switcher for each job.
Pairs live in `beforeAfterPairs` in `src/content/photos.ts`, and each pair must be two photographs of
the same spot on the same job. Each layer takes its own `position` and `zoom` so shots taken from
slightly different spots line up on the subject. The two current pairs are a warehouse joint repair
and a residential resin floor. More real pairs from site are the best way to strengthen this section.

### The hero

A real photograph of self-levelling epoxy being spread on a commercial floor, next to the proposition
and the primary action. It replaced a generated before and after slider of a building Dainamo never
worked on.

### The Work page

A filterable gallery of the curated site photographs, grouped by discipline, with a native `<dialog>`
lightbox (focus trap, Escape to close, arrow keys to step), followed by the Buccleuch project record.

## Search, answer engines and local visibility

- **Structured data** (`src/lib/schema.ts`): a `GeneralContractor` / `LocalBusiness` graph with
  address, geo, opening hours, service catalogue and 16 `areaServed` cities, plus `Service`,
  `FAQPage`, `BreadcrumbList` and `CreativeWork` per page.
- **`/llms.txt`**: a plain-text company brief for assistants, including an explicit list of things
  the company has **not** claimed, so a model cannot invent a VAT number or a warranty.
- **Answer-shaped copy**: every page opens with one self-contained paragraph that answers the
  page's question without marketing language. That paragraph is also the meta description.
- **Local**: suburb-level service areas in the footer, in the schema and in `/llms.txt`.
- **Matrix**: six capability pages and five sector pages cross-link, which is what wins queries like
  "epoxy flooring for hospitals Johannesburg".
- Sitemap, robots and a web manifest are generated. Marketing pages are static or SSG.

---

## Things to confirm before this goes live

These are unknowns from the source material, not omissions. Nothing has been invented in their place.

1. **Company registration number**. Not published anywhere on the site yet.
2. **VAT registration status and number**. The FAQ deliberately says to confirm with the office.
   Once confirmed, update `/questions` and the `site-settings` global.
3. **Client names.** `Specialized Coating Systems, Anaprop, Family Dental, Sasol Garages, Engine,
   Sanlam, DVI` appear in the company profile and are shown as typographic wordmarks, not
   reconstructed logos. Get written permission before launch, then upload the official SVGs against
   each client in the studio. The `permissionConfirmed` flags are currently **false**.
4. **The case study.** Figures (26 747 m², 554 m, 116 balustrades, 4 months) come from the real
   project document. The client name is deliberately omitted and only the suburb is shown.
5. **Before and after photography.** The generated stand-ins are gone and the slider now uses two
   real pairs. Ask the team to photograph the same spot before and after on every job from now on.
6. **Banking details** are not on the website at all, on purpose. Keep it that way.
7. **Deposit percentage** is described as "stated on each quotation" rather than fixed at 70%,
   because that number should not be a public commitment.
8. **Email delivery.** Payload has no email adapter configured, so password resets print to the
   server console. Add one (Resend, SMTP) before handing the studio over.

---

## Deploying

The database is SQLite via libSQL. For production, point `DATABASE_URI` at a hosted libSQL/Turso
instance and add `DATABASE_AUTH_TOKEN`, or swap `@payloadcms/db-sqlite` for the Postgres adapter in
`src/payload.config.ts`. Uploaded media is written to `public/uploads`, which needs persistent
storage or a storage adapter (S3, Vercel Blob) on a serverless host.

Set `NEXT_PUBLIC_SITE_URL` to the real origin. Every canonical URL, the sitemap, the structured data
and the share cards read from it.
