'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { WhatsappLogo } from '@phosphor-icons/react/dist/ssr'

import { company } from '../../lib/site'

const MESSAGE = 'Hi Dainamo, I would like to arrange a site assessment.'

/**
 * Floating WhatsApp affordance.
 *
 * It appears once the hero has been passed, so it never covers the first fold
 * or the comparison handle. The pulse fires roughly every six seconds rather
 * than looping continuously: a thing that is permanently on screen and
 * permanently animating stops reading as a nudge and starts reading as noise.
 */
export function WhatsAppButton() {
  const [shown, setShown] = useState(false)
  const calm = useReducedMotion()

  useEffect(() => {
    const hero = document.querySelector('.hero, .page-head')
    if (!hero) {
      setShown(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => setShown(!entry.isIntersecting || entry.intersectionRatio < 0.25),
      { threshold: [0, 0.25] },
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  const href = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(MESSAGE)}`

  return (
    <AnimatePresence>
      {shown && (
        <motion.a
          href={href}
          className="wa"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="cta"
          aria-label="Message Dainamo Holdings on WhatsApp"
          initial={calm ? { opacity: 0 } : { opacity: 0, transform: 'translate3d(0, 16px, 0) scale(0.9)' }}
          animate={calm ? { opacity: 1 } : { opacity: 1, transform: 'translate3d(0, 0px, 0) scale(1)' }}
          exit={calm ? { opacity: 0 } : { opacity: 0, transform: 'translate3d(0, 10px, 0) scale(0.94)' }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="wa__pulse" aria-hidden="true" />
          <WhatsappLogo size={26} weight="fill" aria-hidden="true" />
          <span className="wa__label">WhatsApp us</span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
