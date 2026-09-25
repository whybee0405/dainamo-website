import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'

/**
 * Figures below are taken from the project's own scope document. Nothing has
 * been rounded up and nothing has been invented. The client is not named.
 */
const facts = [
  { value: '26 747', unit: 'm²', label: 'Surface prepared and coated' },
  { value: '554', unit: 'm', label: 'Boundary wall treated' },
  { value: '116', unit: '', label: 'Balustrades refinished' },
  { value: '4', unit: 'months', label: 'Scaffold standing on site' },
]

const scope = [
  'Pressure washing and removal of loose and flaking paint',
  'Crack repair and patching across every elevation',
  'Damp proofing to roughly a quarter of the project',
  'Waterproofing to parapets and specified areas',
  'Two coats of exterior paint, applied by airless spray',
  'Gutters, window frames, door frames and entrance doors',
]

export function CaseStudy({ showLink = true }: { showLink?: boolean }) {
  return (
    <section className="case section" aria-labelledby="case-heading">
      <div className="shell">
        <div className="case__panel on-deep">
          <div className="case__head">
            <p className="case__eyebrow">Project record · Buccleuch, Sandton</p>
            <h2 id="case-heading" className="display-2">
              Exterior refurbishment of a residential complex, with residents living on site.
            </h2>
            <p className="case__lede">
              Damp proofing, waterproofing and repainting of the walls, boundary walls, parapets,
              gutters, frames, doors and balcony balustrades. Everything was prepared and repaired,
              then sprayed.
            </p>
          </div>

          <dl className="case__facts">
            {facts.map((fact) => (
              <div key={fact.label} className="case__fact">
                <dt>{fact.label}</dt>
                <dd>
                  <span className="stat-value">{fact.value}</span>
                  {fact.unit && <span className="case__unit">{fact.unit}</span>}
                </dd>
              </div>
            ))}
          </dl>

          <div className="case__foot">
            <ul className="case__scope" aria-label="What the contract covered">
              {scope.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {showLink && (
              <Link href="/work#project" className="btn btn-light case__cta">
                Read the project record
                <ArrowRight size={17} weight="bold" aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
