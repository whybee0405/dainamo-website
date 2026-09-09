'use client'

import { motion, useReducedMotion } from 'motion/react'

const EASE = [0.16, 1, 0.3, 1] as const

const contrasts = [
  {
    common: 'Paint over the stain',
    dainamo: 'Find the source, treat it, then finish',
  },
  {
    common: 'Seal the leak at the surface',
    dainamo: 'Take the detail back into the structure',
  },
  {
    common: 'Quote a lump sum',
    dainamo: 'Measure the area and itemise the scope',
  },
]

export function Position() {
  const calm = useReducedMotion()

  return (
    <section className="position section" aria-labelledby="position-heading">
      <div className="shell position__inner">
        <motion.h2
          id="position-heading"
          className="display-2 position__headline"
          initial={calm ? false : { opacity: 0, transform: 'translate3d(0, 26px, 0)' }}
          whileInView={{ opacity: 1, transform: 'translate3d(0, 0px, 0)' }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          Paint hides a problem.
          <br />
          <span className="position__accent">A system solves it.</span>
        </motion.h2>

        <motion.div
          className="position__body"
          initial={calm ? false : { opacity: 0, transform: 'translate3d(0, 20px, 0)' }}
          whileInView={{ opacity: 1, transform: 'translate3d(0, 0px, 0)' }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
        >
          <p>
            Dainamo started in general handyman work and moved out of it on purpose. Resin floors,
            membranes, damp treatment and protective coatings need training, equipment and product
            knowledge that a general trade does not carry. They also need a contractor willing to put
            in writing what is underneath the finish.
          </p>
          <p>
            That is the work we take now, for clients who have to justify the spend to a board, a
            body corporate or an insurer.
          </p>

          <ul className="position__contrasts">
            {contrasts.map((row, index) => (
              <motion.li
                key={row.common}
                initial={calm ? false : { opacity: 0, transform: 'translate3d(0, 14px, 0)' }}
                whileInView={{ opacity: 1, transform: 'translate3d(0, 0px, 0)' }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: 0.06 * index, ease: EASE }}
              >
                <span className="position__common">{row.common}</span>
                <span className="position__dainamo">{row.dainamo}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
