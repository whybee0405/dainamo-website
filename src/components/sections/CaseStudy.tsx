'use client'

import { motion, useReducedMotion } from 'motion/react'

import { Comparison } from '../media/Comparison'

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * Figures below are taken from the project's own scope document. Nothing has
 * been rounded up and nothing has been invented.
 */
const facts = [
  { value: '26 747', unit: 'm²', label: 'Surface prepared and coated' },
  { value: '554', unit: 'm', label: 'Boundary wall treated' },
  { value: '116', unit: '', label: 'Balustrades refinished' },
  { value: '4', unit: 'months', label: 'Access standing on site' },
]

const scope = [
  'Pressure washing and removal of loose and flaking paint',
  'Crack repair and patching across every elevation',
  'Damp proofing to roughly a quarter of the project',
  'Waterproofing to parapets and specified areas',
  'Two coats of exterior paint, applied by airless spray',
  'Gutters, window frames, door frames and entrance doors',
  'Daily site cleaning, rubble removal and disposal',
]

export function CaseStudy({ showComparison = true }: { showComparison?: boolean }) {
  const calm = useReducedMotion()

  return (
    <section className="case section" aria-labelledby="case-heading">
      <div className="shell case__inner" data-wide={!showComparison || undefined}>
        <div className="case__copy">
          <h2 id="case-heading" className="display-2">
            One elevation, start to finish.
          </h2>
          <p className="lede">
            Exterior refurbishment, waterproofing and repainting of a residential complex in
            Buccleuch, Sandton. Walls, boundary walls, parapets, gutters, frames, doors and balcony
            balustrades, prepared, repaired, damp proofed, waterproofed and sprayed.
          </p>

          <dl className="case__facts">
            {facts.map((fact, index) => (
              <motion.div
                key={fact.label}
                className="case__fact"
                initial={calm ? false : { opacity: 0, transform: 'translate3d(0, 14px, 0)' }}
                whileInView={{ opacity: 1, transform: 'translate3d(0, 0px, 0)' }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: EASE }}
              >
                <dt>{fact.label}</dt>
                <dd>
                  <span className="stat-value">{fact.value}</span>
                  {fact.unit && <span className="case__unit">{fact.unit}</span>}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>

        {showComparison ? (
          <motion.div
            className="case__viewer"
            initial={calm ? false : { opacity: 0, clipPath: 'inset(0 0 12% 0)' }}
            whileInView={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <Comparison
              before="case-before"
              after="case-after"
              beforeAlt="Apartment building facade before refurbishment, with peeling paint, cracked plaster and damp staining"
              afterAlt="The same apartment building facade after repair, waterproofing and repainting"
              label="Drag to compare the elevation before and after refurbishment"
              sizes="(min-width: 1000px) 56vw, 100vw"
              ratio={1.912}
            />
          </motion.div>
        ) : (
          <div className="case__scope">
            <h3 className="case__scope-heading">What that covered</h3>
            <ul>
              {scope.map((item, index) => (
                <motion.li
                  key={item}
                  initial={calm ? false : { opacity: 0, transform: 'translate3d(0, 10px, 0)' }}
                  whileInView={{ opacity: 1, transform: 'translate3d(0, 0px, 0)' }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.45, delay: Math.min(index, 6) * 0.04, ease: EASE }}
                >
                  <span className="case__tick" aria-hidden="true" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
