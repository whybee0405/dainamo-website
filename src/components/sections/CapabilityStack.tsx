'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from 'motion/react'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'

import { Frame } from '../media/Frame'
import { flagshipCapabilities } from '../../content/capabilities'

gsap.registerPlugin(ScrollTrigger)

/**
 * The four core systems, pinned one at a time.
 *
 * The motion is doing real work here: each capability holds the viewport long
 * enough to be read on its own, and the outgoing card recedes rather than
 * vanishing, so the reader keeps a sense of where they are in the sequence.
 */
export function CapabilityStack() {
  const root = useRef<HTMLDivElement>(null)
  const calm = useReducedMotion()

  useEffect(() => {
    if (calm || !root.current) return
    if (window.matchMedia('(max-width: 899px)').matches) return

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.capability-card')
      const last = cards[cards.length - 1]

      cards.forEach((card, index) => {
        if (index === cards.length - 1) return

        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          endTrigger: last,
          end: 'top top',
          pin: true,
          pinSpacing: false,
        })

        // The outgoing card recedes and darkens, but never becomes
        // translucent. Fading the card itself would let the cards underneath
        // read through it and every line of type would ghost.
        const veil = card.querySelector('.capability-card__veil')
        const recede = gsap.timeline({
          scrollTrigger: {
            trigger: cards[index + 1],
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
        })
        recede.to(card, { scale: 0.965, ease: 'none' }, 0)
        if (veil) recede.to(veil, { opacity: 0.78, ease: 'none' }, 0)
      })
    }, root)

    return () => ctx.revert()
  }, [calm])

  return (
    <section className="capabilities" aria-labelledby="capabilities-heading">
      <div className="shell capabilities__head">
        <p className="eyebrow">What we are specified for</p>
        <h2 id="capabilities-heading" className="display-2">
          The four systems we get called in for.
        </h2>
      </div>

      <div ref={root} className="capabilities__stack">
        {flagshipCapabilities.map((capability, index) => (
          <article key={capability.slug} className="capability-card">
            <span className="capability-card__veil" aria-hidden="true" />
            <div className="capability-card__inner shell">
              <div className="capability-card__media">
                <Frame
                  media={capability.media}
                  alt={`${capability.name} carried out by Dainamo Holdings`}
                  sizes="(min-width: 900px) 46vw, 100vw"
                  ratio={1.22}
                />
              </div>

              <div className="capability-card__body">
                <p className="capability-card__index tabular" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="display-3">{capability.name}</h3>
                <p className="capability-card__lede">{capability.lede}</p>

                <ul className="capability-card__systems">
                  {capability.systems.map((system) => (
                    <li key={system.name}>
                      <span className="capability-card__system-name">{system.name}</span>
                      <span className="capability-card__system-detail">{system.detail}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/capabilities/${capability.slug}`}
                  className="capability-card__link"
                  data-cursor="link"
                >
                  <span>How we scope {capability.shortName.toLowerCase()}</span>
                  <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
