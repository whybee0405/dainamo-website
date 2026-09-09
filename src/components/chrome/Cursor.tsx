'use client'

import { useEffect, useRef, useState } from 'react'
import { useMotionValue, useMotionTemplate, useSpring, motion } from 'motion/react'

type CursorState = 'default' | 'link' | 'cta' | 'media' | 'drag' | 'text' | 'disabled'

const LABELS: Partial<Record<CursorState, string>> = {
  media: 'View',
  drag: 'Drag',
}

const TYPED_INPUTS = new Set([
  'text',
  'email',
  'tel',
  'url',
  'search',
  'password',
  'number',
  'date',
  'datetime-local',
])

/**
 * Pointer companion.
 *
 * Two layers: a dot pinned tightly to the real pointer so aim never feels lost,
 * and a ring that trails on a spring so movement reads as physical. State comes
 * from `data-cursor` on whatever is under the pointer.
 *
 * It only takes over on devices with a precise pointer that have not asked for
 * reduced motion. Everywhere else the native cursor is left completely alone,
 * because a hidden system cursor with no dependable replacement is a trap.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [state, setState] = useState<CursorState>('default')
  const [pressed, setPressed] = useState(false)
  const [visible, setVisible] = useState(false)

  // Continuous pointer values never touch React state: they drive motion values
  // directly, so moving the mouse does not re-render the tree.
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const ringX = useSpring(x, { stiffness: 520, damping: 40, mass: 0.55 })
  const ringY = useSpring(y, { stiffness: 520, damping: 40, mass: 0.55 })
  const dotTransform = useMotionTemplate`translate3d(${x}px, ${y}px, 0)`
  const ringTransform = useMotionTemplate`translate3d(${ringX}px, ${ringY}px, 0)`

  const stateRef = useRef<CursorState>('default')

  useEffect(() => {
    const precise = window.matchMedia('(hover: hover) and (pointer: fine)')
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)')

    const sync = () => setEnabled(precise.matches && !calm.matches)
    sync()
    precise.addEventListener('change', sync)
    calm.addEventListener('change', sync)
    return () => {
      precise.removeEventListener('change', sync)
      calm.removeEventListener('change', sync)
    }
  }, [])

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove('has-cursor')
      return
    }
    document.documentElement.classList.add('has-cursor')

    const resolve = (target: EventTarget | null): CursorState => {
      if (!(target instanceof Element)) return 'default'
      const hit = target.closest<HTMLElement>(
        '[data-cursor], a, button, input, textarea, select, [role="button"], [contenteditable="true"]',
      )
      if (!hit) return 'default'

      const declared = hit.dataset.cursor as CursorState | undefined
      if (declared) return declared

      if (hit instanceof HTMLInputElement) {
        // Sliders are grabbed, not typed into.
        if (hit.type === 'range') return 'drag'
        if (TYPED_INPUTS.has(hit.type)) return 'text'
        if (hit.disabled) return 'disabled'
        return 'link'
      }
      if (hit.matches('textarea, [contenteditable="true"]')) return 'text'
      if (hit instanceof HTMLButtonElement && hit.disabled) return 'disabled'
      return 'link'
    }

    const visibleRef = { current: false }

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
      if (!visibleRef.current) {
        visibleRef.current = true
        setVisible(true)
      }
      const next = resolve(event.target)
      if (next !== stateRef.current) {
        stateRef.current = next
        setState(next)
      }
    }

    const onLeave = () => {
      visibleRef.current = false
      setVisible(false)
    }
    const onEnter = () => {
      visibleRef.current = true
      setVisible(true)
    }
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    document.addEventListener('pointerenter', onEnter)
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    window.addEventListener('blur', onLeave)

    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('pointerenter', onEnter)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('blur', onLeave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  const label = LABELS[state]

  return (
    <div className="cursor-layer" aria-hidden="true">
      <motion.div
        className="cursor-ring"
        data-state={state}
        data-pressed={pressed || undefined}
        data-visible={visible || undefined}
        style={{ transform: ringTransform }}
      >
        <span className="cursor-ring__shape" />
        {label && <span className="cursor-ring__label">{label}</span>}
        {state === 'drag' && (
          <>
            <span className="cursor-ring__chevron cursor-ring__chevron--left" />
            <span className="cursor-ring__chevron cursor-ring__chevron--right" />
          </>
        )}
      </motion.div>

      <motion.div
        className="cursor-dot"
        data-state={state}
        data-visible={visible || undefined}
        style={{ transform: dotTransform }}
      />
    </div>
  )
}
