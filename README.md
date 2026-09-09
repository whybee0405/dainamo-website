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

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server on port 3111 |
| `npm run build` | Production build (type checks the whole project) |
| `npm run start` | Serves the production build |
| `npm run seed` | Creates the first user and seeds services, sectors, questions and company details |
| `npm run generate:types` | Regenerates `src/payload-types.ts` after changing a collection |
| `node src/scripts/build-media.mjs` | Re-downloads, trims and re-encodes the site photography |
| `node tests/shots.mjs` | Screenshots every route at 390 / 768 / 1440 and reports overflow and console errors |
| `node tests/form.mjs` | Exercises the enquiry form end to end |
| `node tests/cursor.mjs` | Checks pointer states and the reduced-motion and touch fallbacks |
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
    chrome/              header, footer, cursor, smooth scroll
    sections/            home page sections
    forms/               site assessment form
    media/Frame.tsx      responsive AVIF/WebP picture with a blurred placeholder
  content/               copy for capabilities, sectors and questions
  payload/               collections, globals, admin overrides
  lib/                   site facts, fonts, structured data
```

### Where the content lives

Copy currently ships in `src/content/*.ts` so the site renders with no database. The same shapes
exist as Payload collections and are seeded, which means each page can be switched to read from the
CMS one at a time without touching the layout. Start with `services` and `faqs`.

---

## Design system

One light theme, one accent, one radius scale. Tokens are in `src/app/(frontend)/globals.css`.

- **Royal blue** `#1b5cd0`, taken from the company profile wordmark, on a white ground with a
  `#f4f7fc` tint for alternating sections.
- **Orange** `#f4650f` is the single accent. It marks actions and figures and nothing else. It is
  deliberately clear of red and green, which are already spoken for by error and success states.
- **A surface ladder, not a white page.** Nothing is pure white. `--color-paper` is a tinted
  off-white, `--color-raised` sits above it for cards, `--color-tint` and `--color-band` are the
  sunken bands. Sections alternate down the ladder so the page has rhythm.
- **One theme flip, once, at the end.** The conversion band and footer form a single deep blue
  block (`#0c2a62` to `#08183c`) that closes every page. Nothing else inverts mid-scroll. Sections
  on it carry the `on-deep` class, which also declares `--audit-bg` so the contrast checker
  measures against the real ground rather than the transparent gradient.
- **Type**: two families only. Archivo, a grotesque drawn for signage and industrial print, carries
  the display type and every figure and small label. Manrope carries the reading. There is no
  monospace: on a building contractor it reads as costume, and it cost a third font file.
- **Radius**: 2 / 3 / 5px. Sharp, to match the chevron geometry of the mark.
- **Motion**: 150 to 300ms on state, `cubic-bezier(0.23, 1, 0.32, 1)` for anything entering.
  Everything above a hover state is gated behind `prefers-reduced-motion`.

To change the accent, edit the `--color-accent-*` ramp. Keep `600` and `700` dark enough to clear
4.5:1 on white; `node tests/audit.mjs` checks this against the rendered colours on every page.

### The logo

The mark was rebuilt as vector artwork (`src/components/brand/`). It is two-tone blue, following
the company profile rather than the navy and gold of the invoice template. It reverses cleanly onto
the deep blue block, scales to a favicon, and the wordmark is real text so it stays selectable. If
the original vector files turn up, drop them in and swap the component.

### The hero

The hero is the before and after slider, full bleed, with the copy on a scrim over it. It replaced a
headline-left / photo-right split, which is the composition every contractor site in the country
uses. Proof beats a claim for this buyer, and it gives a visitor something to do in the first three
seconds. The seam sweeps open once on load through the Web Animations API to teach the drag, then
hands control over; any real pointer input cancels the demo immediately.

### Scroll reveals

`src/components/motion/Reveal.tsx`. Three shapes: `rise` and `settle` run through Motion, `wipe`
uncovers photography with a CSS `clip-path` transition.

The clip goes on an inner element, never on the observed one. A clipped element reports an
intersection ratio of zero, so clipping the element you are watching means it can never register as
in view and the reveal waits on itself forever. `tests/audit.mjs` checks for exactly this: a reveal
sitting in the viewport that never fired.

### The cursor

`src/components/chrome/Cursor.tsx`. A dot pinned to the true pointer plus a spring-trailed ring.
States come from `data-cursor` on the element under the pointer: `link`, `cta`, `media`, `drag`,
`text`, `disabled`. It only activates on a precise pointer with motion allowed; touch devices and
reduced-motion users keep the native cursor untouched.

---

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
5. **Before and after photography.** The images currently on the site are generated stand-ins that
   match the described work. Replace them with real site photographs, which will also make the
   comparison slider far more persuasive.
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
