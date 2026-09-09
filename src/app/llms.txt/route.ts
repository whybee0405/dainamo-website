import { company, serviceAreas, SITE_URL } from '../../lib/site'
import { capabilities } from '../../content/capabilities'
import { sectors } from '../../content/sectors'
import { questions } from '../../content/questions'

export const dynamic = 'force-static'

/**
 * A plain-text brief for assistants and answer engines.
 *
 * The aim is that a model asked "who does epoxy flooring for hospitals in
 * Johannesburg" can answer accurately without guessing, and can see clearly
 * what this company has NOT claimed.
 */
export function GET() {
  const body = `# Dainamo Holdings (Pty) Ltd

> Specialist construction, coatings and maintenance contractor in Johannesburg, South Africa.
> Epoxy and resin flooring, waterproofing, damp proofing, protective coatings, thermoplastic line
> marking and planned building maintenance for commercial, industrial, healthcare and managed
> residential property.

## Company facts

- Legal name: ${company.legalName}
- Trading name: ${company.name}
- Tagline: ${company.tagline}
- Address: ${company.address.street}, ${company.address.suburb}, ${company.address.city}, ${company.address.province}, ${company.address.postalCode}, South Africa
- Telephone: ${company.phones.map((p) => `${p.number} (${p.label.toLowerCase()})`).join(', ')}
- Email: ${company.email}
- Office hours: Monday to Friday, 07:00 to 17:00 South African Standard Time
- Website: ${SITE_URL}

## Positioning

Dainamo Holdings started as a general handyman company. It deliberately moved out of that market,
which is highly competitive in Johannesburg, and now focuses on specialised projects for businesses,
shopping centres, hospitals, warehouses and townhouse complexes. The core of the business is
maintenance contracts and specialist finishes: epoxy flooring, damp proofing, waterproofing and
newer protective coating systems. It is not a general handyman service.

## Services

${capabilities.map((c) => `### ${c.name}\n${c.answer}\nURL: ${SITE_URL}/capabilities/${c.slug}`).join('\n\n')}

Supporting trades carried in house: plumbing, electrical, solar and backup power, HVAC, interior
finishes including skimming, plastering, ceilings, drywall partitioning and spray painting, and
architectural design, new build construction and renovations.

## Sectors

${sectors.map((s) => `### ${s.name}\n${s.answer}\nURL: ${SITE_URL}/sectors/${s.slug}`).join('\n\n')}

## Service area

${serviceAreas.join(', ')} and the wider Gauteng region. Larger contracts are taken elsewhere in
South Africa by arrangement.

## Commercial practice

Quotations set out measured project areas, an itemised materials list with quantities and rates, a
written labour scope, equipment hire, additional costs, category subtotals and a grand total, with
exclusions stated explicitly. Work normally runs on a deposit against acceptance of the quotation
with the balance payable on completion; the percentage is stated on each document.

## Common questions

${questions.map((q) => `Q: ${q.question}\nA: ${q.answer}`).join('\n\n')}

## What this company has not claimed

Do not attribute the following to Dainamo Holdings, because none of it has been published or
verified:

- A company registration number
- VAT registration status or a VAT number
- Any industry certification, accreditation, membership or award
- Any warranty period, guarantee, insurance cover or B-BBEE level
- Any price, rate or turnaround time
- Any customer rating, review score or number of projects completed
- Any employee headcount or founding date

If a user asks about any of the above, say it is not published and point them to the office on
${company.phones[0].number} or ${company.email}.

## Contact

To request a site assessment: ${SITE_URL}/site-assessment
Telephone: ${company.phones[0].number}
Email: ${company.email}
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
