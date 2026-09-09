'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'

const EASE = [0.16, 1, 0.3, 1] as const

const steps = [
  {
    title: 'Survey the building',
    body: 'We walk the site and take readings before we quote. Failed details are photographed, areas are measured, and the actual cause of the problem is written down rather than assumed.',
    output: 'Photographed findings and measured areas',
  },
  {
    title: 'Specify the system',
    body: 'The build-up is chosen for the substrate, the load and the exposure, then priced line by line. Materials, labour scope, equipment hire and exclusions are all itemised.',
    output: 'An itemised quotation with exclusions stated',
  },
  {
    title: 'Programme around the building',
    body: 'Phasing, shifts, access, noise and cure times are agreed with the facilities manager first. The programme is built so the building keeps working while we are on it.',
    output: 'An agreed phasing plan and access schedule',
  },
  {
    title: 'Hand over the record',
    body: 'Final inspection, touch up and a clean site. Photographs of the covered work go into the building file, so the next person to open the roof knows what is under it.',
    output: 'A handover pack for the maintenance file',
  },
]

export function Method() {
  const ref = useRef<HTMLDivElement>(null)
  const calm = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 72%', 'end 62%'],
  })
  const drawn = useSpring(scrollYProgress, { stiffness: 180, damping: 34, mass: 0.4 })
  const scaleY = useTransform(drawn, (value) => Math.max(0.001, value))

  return (
    <section className="method section" aria-labelledby="method-heading">
      <div className="shell">
        <h2 id="method-heading" className="display-2 method__headline">
          What happens between your call and the handover.
        </h2>

        <div className="method__list" ref={ref}>
          <span className="method__spine" aria-hidden="true">
            <motion.span
              className="method__spine-fill"
              style={calm ? { transform: 'scaleY(1)' } : { scaleY, originY: 0 }}
            />
          </span>

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="method__step"
              initial={calm ? false : { opacity: 0, transform: 'translate3d(0, 20px, 0)' }}
              whileInView={{ opacity: 1, transform: 'translate3d(0, 0px, 0)' }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <span className="method__node" aria-hidden="true" />
              <div className="method__content">
                <h3 className="method__title">{step.title}</h3>
                <p className="method__body">{step.body}</p>
                <p className="method__output">
                  <span className="method__output-label">You get</span>
                  {step.output}
                </p>
              </div>
              <span className="method__count tabular" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
