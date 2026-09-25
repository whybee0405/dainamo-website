'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react/dist/ssr'

import { Frame } from '../media/Frame'
import { sitePhoto } from '../../content/photos'
import type { PhotoKey } from '../media/Frame'

const reel: PhotoKey[] = [
  'epoxy-corridor',
  'roof-membrane-wide',
  'grinding-warehouse',
  'epoxy-flake',
  'roof-ridge-blue',
  'wall-injection',
  'thermo-crossing',
  'epoxy-entrance',
  'joint-repair',
]

const practices = [
  'Moisture readings and a written diagnosis before any damp treatment',
  'Roof details repaired into the structure, where most leaks start',
  'Measured areas and an itemised scope on every quotation',
]

/**
 * Positioning, then proof. The argument is made in three lines of copy, and
 * the rail underneath is nothing but photographs from Dainamo's own sites.
 */
export function SiteReel() {
  const rail = useRef<HTMLUListElement>(null)

  const step = (direction: 1 | -1) => {
    const node = rail.current
    if (!node) return
    const card = node.querySelector('li')
    const distance = card ? card.getBoundingClientRect().width + 16 : node.clientWidth * 0.8
    node.scrollBy({ left: distance * direction, behavior: 'smooth' })
  }

  return (
    <section className="reel section section--mist" aria-labelledby="reel-heading">
      <div className="shell reel__intro">
        <div>
          <h2 id="reel-heading" className="display-2">
            Built on handyman work, <span className="reel__accent">grown into specialist systems.</span>
          </h2>
        </div>
        <div className="reel__body">
          <p className="lede">
            Dainamo started in general handyman work and still does it. Over the years we added the
            systems that need training, equipment and product knowledge: resin floors, membranes,
            damp treatment and protective coatings. Today most of our work is in those.
          </p>
          <ul className="reel__practices">
            {practices.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="shell reel__bar">
        <h3 className="reel__label">From our sites</h3>
        <div className="reel__controls">
          <button type="button" className="icon-btn" onClick={() => step(-1)} aria-label="Previous photographs">
            <ArrowLeft size={18} weight="bold" />
          </button>
          <button type="button" className="icon-btn" onClick={() => step(1)} aria-label="Next photographs">
            <ArrowRight size={18} weight="bold" />
          </button>
          <Link href="/work" className="text-link">
            All work
            <ArrowRight size={16} weight="bold" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <ul ref={rail} className="reel__rail" aria-label="Photographs from Dainamo sites">
        {reel.map((key) => {
          const photo = sitePhoto(key)
          if (!photo) return null
          return (
            <li key={key} className="reel__item">
              <figure>
                <Frame media={key} alt={photo.alt} sizes="(min-width: 1080px) 30vw, 80vw" ratio={0.82} />
                <figcaption>{photo.caption}</figcaption>
              </figure>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
