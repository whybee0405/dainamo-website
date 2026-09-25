'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, Phone } from '@phosphor-icons/react/dist/ssr'

import { Frame } from '../media/Frame'
import { company, PRIMARY_CTA } from '../../lib/site'

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * The hero is a real Dainamo photograph: self-levelling epoxy going down on a
 * commercial floor, wet edge and all. It says more about the company than any
 * rendering of a finished building could, and it is the work the site is
 * trying to win.
 */
export function Hero() {
  const calm = useReducedMotion()

  const rise = (delay: number) => ({
    initial: calm ? false : { opacity: 0, transform: 'translate3d(0, 16px, 0)' },
    animate: { opacity: 1, transform: 'translate3d(0, 0px, 0)' },
    transition: { duration: 0.7, delay, ease: EASE },
  })

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="shell hero__grid">
        <div className="hero__copy">
          <motion.p className="eyebrow" {...rise(0)}>
            Specialist contractor · Johannesburg and Gauteng
          </motion.p>

          <motion.h1 id="hero-heading" className="display-1 hero__headline" {...rise(0.05)}>
            Specialist floors, roofs and walls for buildings that stay open.
          </motion.h1>

          <motion.p className="lede hero__lede" {...rise(0.1)}>
            Epoxy and resin flooring, waterproofing, damp proofing and planned maintenance for
            shopping centres, hospitals, warehouses, offices and residential complexes.
          </motion.p>

          <motion.div className="hero__actions" {...rise(0.15)}>
            <Link href={PRIMARY_CTA.href} className="btn btn-primary">
              {PRIMARY_CTA.label}
              <ArrowRight size={17} weight="bold" aria-hidden="true" />
            </Link>
            <Link href="/work" className="btn btn-secondary">
              See our work
            </Link>
          </motion.div>

          <motion.p className="hero__call" {...rise(0.2)}>
            <Phone size={16} weight="fill" aria-hidden="true" />
            <span>
              Or call <a href={`tel:${company.phones[0].tel}`}>{company.phones[0].number}</a>, Monday
              to Friday, 07:00 to 17:00. Site assessments are free.
            </span>
          </motion.p>
        </div>

        <motion.figure
          className="hero__media"
          initial={calm ? false : { opacity: 0, transform: 'translate3d(0, 20px, 0) scale(0.99)' }}
          animate={{ opacity: 1, transform: 'translate3d(0, 0px, 0) scale(1)' }}
          transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
        >
          <Frame
            media="epoxy-pour"
            alt="A Dainamo applicator spreading grey self-levelling epoxy across a commercial floor, the wet surface reflecting the windows"
            sizes="(min-width: 1080px) 52vw, 100vw"
            ratio={0}
            position="64% 60%"
            priority
            className="hero__frame"
          />
          <figcaption className="hero__caption">
            <span className="hero__caption-dot" aria-hidden="true" />
            <span>
              <strong>On site</strong> Self-levelling epoxy, commercial unit
            </span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  )
}
