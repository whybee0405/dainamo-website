'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'

import { Comparison } from '../media/Comparison'
import { PRIMARY_CTA, SECONDARY_CTA } from '../../lib/site'

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * The hero is the proof, not a picture of a building.
 *
 * A facility manager arrives with a wall that is failing. Showing the same
 * elevation before and after, and letting them drag it themselves, answers the
 * only question they have in the first three seconds. It also gives them
 * something to do, which a static photograph never does.
 */
export function Hero() {
  const calm = useReducedMotion()

  const rise = (delay: number) => ({
    initial: calm ? false : { opacity: 0, transform: 'translate3d(0, 18px, 0)' },
    animate: { opacity: 1, transform: 'translate3d(0, 0px, 0)' },
    transition: { duration: 0.7, delay, ease: EASE },
  })

  return (
    <section className="hero">
      <div className="hero__stage">
        <Comparison
          before="case-before"
          after="case-after"
          beforeAlt="A residential block in Buccleuch with peeling paint, cracked plaster and damp staining across the elevation"
          afterAlt="The same elevation after repair, damp proofing, waterproofing and a sprayed finish"
          label="Drag to compare the elevation before and after refurbishment"
          sizes="100vw"
          start={54}
          fill
          sweepOnLoad
          priority
          className="hero__compare"
        />

        <div className="hero__scrim" aria-hidden="true" />

        <div className="hero__content shell">
          <div className="hero__lead">
            <motion.h1 className="hero__headline" {...rise(0)}>
              Repairs that don’t close the building.
            </motion.h1>

            <motion.p className="hero__lede" {...rise(0.08)}>
              Epoxy flooring, waterproofing and damp proofing for the shopping centres, hospitals,
              warehouses and complexes of Johannesburg.
            </motion.p>

            <motion.div className="hero__actions" {...rise(0.15)}>
              <Link href={PRIMARY_CTA.href} className="btn btn-primary" data-cursor="cta">
                {PRIMARY_CTA.label}
                <ArrowRight size={17} weight="bold" aria-hidden="true" />
              </Link>
              <Link href={SECONDARY_CTA.href} className="btn btn-secondary" data-cursor="link">
                {SECONDARY_CTA.label}
              </Link>
            </motion.div>
          </div>

          <motion.p className="hero__caption" {...rise(0.24)}>
            Exterior refurbishment, Buccleuch. 26 747 m² prepared, damp proofed and sprayed over
            four months, with residents in place throughout.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
