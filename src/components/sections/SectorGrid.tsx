'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'

import { Frame } from '../media/Frame'
import { sectors as fallbackSectors, type Sector } from '../../content/sectors'

const EASE = [0.16, 1, 0.3, 1] as const

export function SectorGrid({ sectors = fallbackSectors }: { sectors?: Sector[] }) {
  const calm = useReducedMotion()

  return (
    <section className="sectors section" aria-labelledby="sectors-heading">
      <div className="shell">
        <div className="sectors__head">
          <h2 id="sectors-heading" className="display-2">
            The building decides how the work gets done.
          </h2>
        </div>

        <div className="sectors__grid">
          {sectors.map((sector, index) => (
            <motion.article
              key={sector.slug}
              className="sector-tile"
              data-span={sector.span}
              initial={calm ? false : { opacity: 0, transform: 'translate3d(0, 22px, 0)' }}
              whileInView={{ opacity: 1, transform: 'translate3d(0, 0px, 0)' }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: Math.min(index, 3) * 0.05, ease: EASE }}
            >
              <Link href={`/sectors/${sector.slug}`} className="sector-tile__link" data-cursor="media">
                <Frame
                  media={sector.media}
                  alt={`${sector.name} work carried out by Dainamo Holdings`}
                  sizes="(min-width: 1100px) 40vw, (min-width: 700px) 50vw, 100vw"
                  ratio={sector.span === 'tall' ? 0.86 : sector.span === 'wide' ? 1.7 : 1.28}
                  className="sector-tile__frame"
                />
                <div className="sector-tile__scrim" aria-hidden="true" />
                <div className="sector-tile__content">
                  <h3 className="sector-tile__name">{sector.name}</h3>
                  <p className="sector-tile__lede">{sector.lede}</p>
                  <span className="sector-tile__cue">
                    <span>Constraints and method</span>
                    <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
