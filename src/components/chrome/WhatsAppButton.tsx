'use client'

import { motion, useReducedMotion } from 'motion/react'
import { WhatsappLogo } from '@phosphor-icons/react/dist/ssr'

import { company } from '../../lib/site'

const MESSAGE = 'Hi Dainamo, I would like to arrange a site assessment.'

/**
 * Floating WhatsApp affordance.
 *
 * It stays available across every page. The pulse fires roughly every six
 * seconds rather than running continuously, so it reads as a useful nudge
 * without becoming visual noise.
 */
export function WhatsAppButton() {
  const calm = useReducedMotion()
  const href = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(MESSAGE)}`

  return (
    <motion.a
      href={href}
      className="wa"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message Dainamo Holdings on WhatsApp"
      initial={calm ? { opacity: 0 } : { opacity: 0, transform: 'translate3d(0, 16px, 0) scale(0.9)' }}
      animate={calm ? { opacity: 1 } : { opacity: 1, transform: 'translate3d(0, 0px, 0) scale(1)' }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="wa__pulse" aria-hidden="true" />
      <WhatsappLogo size={29} weight="fill" aria-hidden="true" />
    </motion.a>
  )
}
