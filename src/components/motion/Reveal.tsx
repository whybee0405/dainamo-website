'use client'

import { useRef, type ComponentPropsWithoutRef } from 'react'
import { motion, useInView, useReducedMotion, type TargetAndTransition } from 'motion/react'

const EASE = [0.16, 1, 0.3, 1] as const

type Variant = 'rise' | 'wipe' | 'settle'

const VARIANTS: Record<
  Exclude<Variant, 'wipe'>,
  { from: TargetAndTransition; to: TargetAndTransition; duration: number }
> = {
  /** Text and small blocks. Short travel, quick settle. */
  rise: {
    from: { opacity: 0, transform: 'translate3d(0, 20px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0px, 0)' },
    duration: 0.62,
  },
  /** Large panels that should barely move. */
  settle: {
    from: { opacity: 0, transform: 'translate3d(0, 10px, 0) scale(0.995)' },
    to: { opacity: 1, transform: 'translate3d(0, 0px, 0) scale(1)' },
    duration: 0.7,
  },
}

/* A deliberately small surface. The wipe branch renders a real div and the
   others render a motion div, and the two prop types disagree about event
   handlers, so this forwards only what a reveal actually needs. */
export type RevealProps = {
  variant?: Variant
  delay?: number
  amount?: number
  className?: string
  style?: ComponentPropsWithoutRef<'div'>['style']
  id?: string
  children?: React.ReactNode
}

/**
 * One reveal, three shapes.
 *
 * `rise` and `settle` run through Motion. `wipe` is a CSS transition on
 * clip-path, which runs off the main thread while the photograph it uncovers is
 * still decoding.
 *
 * The clip goes on an inner element, never on the observed one. A clipped
 * element reports an intersection ratio of zero, so clipping the thing you are
 * watching means it can never come into view and the reveal waits on itself
 * forever.
 *
 * Transforms are written as full strings rather than the x/y shorthand so they
 * stay on the compositor. Under reduced motion the element is simply present.
 */
export function Reveal({
  variant = 'rise',
  delay = 0,
  amount = 0.3,
  children,
  className,
  style,
  id,
}: RevealProps) {
  const calm = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount })

  if (variant === 'wipe') {
    return (
      <div
        ref={ref}
        id={id}
        className={['reveal-wipe', className].filter(Boolean).join(' ')}
        data-shown={calm || inView || undefined}
        style={style}
      >
        <div
          className="reveal-wipe__inner"
          style={delay ? { transitionDelay: `${delay}s` } : undefined}
        >
          {children}
        </div>
      </div>
    )
  }

  const spec = VARIANTS[variant]

  return (
    <motion.div
      id={id}
      className={className}
      style={style}
      initial={calm ? false : spec.from}
      whileInView={spec.to}
      viewport={{ once: true, amount }}
      transition={{ duration: spec.duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}
