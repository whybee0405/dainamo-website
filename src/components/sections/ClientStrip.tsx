'use client'

import { useReducedMotion } from 'motion/react'

/**
 * Names published by Dainamo in its own company profile. They are set as
 * typographic wordmarks rather than reconstructed logos, because using an
 * approximation of another company's mark is a brand misuse risk. Official SVGs
 * can be uploaded per client in the studio and will replace this treatment.
 */
const clients = [
  'Specialized Coating Systems',
  'Anaprop',
  'Family Dental',
  'Sasol Garages',
  'Engine',
  'Sanlam',
  'DVI',
]

export function ClientStrip() {
  const calm = useReducedMotion()

  return (
    <section className="client-strip" aria-labelledby="clients-heading">
      <div className="shell">
        <h2 id="clients-heading" className="client-strip__heading">
          Sites we have worked on
        </h2>
      </div>

      <div className="client-strip__track" data-static={calm || undefined}>
        <div className="client-strip__rail" aria-hidden={calm ? undefined : 'false'}>
          {clients.map((name) => (
            <span key={name} className="client-strip__item">
              {name}
            </span>
          ))}
        </div>
        {!calm && (
          <div className="client-strip__rail" aria-hidden="true">
            {clients.map((name) => (
              <span key={`${name}-repeat`} className="client-strip__item">
                {name}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
