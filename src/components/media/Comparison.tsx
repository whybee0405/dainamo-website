'use client'

import { useCallback, useEffect, useRef } from 'react'

import { Frame, type MediaKey } from './Frame'

export type ComparisonProps = {
  before: MediaKey
  after: MediaKey
  beforeAlt: string
  afterAlt: string
  label: string
  sizes: string
  /** Where the seam rests, as a percentage from the left. */
  start?: number
  ratio?: number
  /** Stretch both layers to the parent box instead of using the image ratio. */
  fill?: boolean
  /** Sweeps the seam open once on mount, which teaches the drag without a tooltip. */
  sweepOnLoad?: boolean
  priority?: boolean
  className?: string
}

const EXPO_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)'

/**
 * Before and after, on one slider.
 *
 * The gesture never touches React state. The clip on the top layer and the
 * transform on the seam are written straight onto their elements, so dragging
 * stays off the render path entirely.
 */
export function Comparison({
  before,
  after,
  beforeAlt,
  afterAlt,
  label,
  sizes,
  start = 52,
  ratio,
  fill = false,
  sweepOnLoad = false,
  priority = false,
  className,
}: ComparisonProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const afterRef = useRef<HTMLDivElement>(null)
  const seamRef = useRef<HTMLSpanElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const apply = useCallback((value: number) => {
    const width = rootRef.current?.clientWidth ?? 0
    if (afterRef.current) afterRef.current.style.clipPath = `inset(0 0 0 ${value}%)`
    // Transform rather than `left`, so the seam never asks for a layout pass.
    if (seamRef.current) {
      seamRef.current.style.transform = `translate3d(${(value / 100) * width}px, 0, 0)`
    }
  }, [])

  useEffect(() => {
    apply(start)

    const onResize = () => apply(Number(inputRef.current?.value ?? start))
    window.addEventListener('resize', onResize)

    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!sweepOnLoad || calm) return () => window.removeEventListener('resize', onResize)

    // One sweep, once, to show the slider moves. The Web Animations API keeps
    // this off the main thread and lets the gesture interrupt it cleanly.
    const width = rootRef.current?.clientWidth ?? 0
    const from = 92
    const opts = { duration: 1250, delay: 600, easing: EXPO_OUT, fill: 'both' as const }

    apply(from)
    if (inputRef.current) inputRef.current.value = String(from)

    const clip = afterRef.current?.animate(
      [{ clipPath: `inset(0 0 0 ${from}%)` }, { clipPath: `inset(0 0 0 ${start}%)` }],
      opts,
    )
    const slide = seamRef.current?.animate(
      [
        { transform: `translate3d(${(from / 100) * width}px, 0, 0)` },
        { transform: `translate3d(${(start / 100) * width}px, 0, 0)` },
      ],
      opts,
    )

    const settle = () => {
      clip?.cancel()
      slide?.cancel()
      apply(start)
      if (inputRef.current) inputRef.current.value = String(start)
    }
    if (clip) clip.onfinish = settle

    // Any real input cancels the demo immediately rather than fighting it.
    const stop = () => {
      clip?.cancel()
      slide?.cancel()
    }
    const node = rootRef.current
    node?.addEventListener('pointerdown', stop, { once: true })

    return () => {
      window.removeEventListener('resize', onResize)
      node?.removeEventListener('pointerdown', stop)
      clip?.cancel()
      slide?.cancel()
    }
  }, [apply, start, sweepOnLoad])

  return (
    <div
      ref={rootRef}
      className={['compare', fill ? 'compare--fill' : null, className].filter(Boolean).join(' ')}
      data-cursor="drag"
    >
      <div className="compare__layer">
        <Frame media={before} alt={beforeAlt} sizes={sizes} ratio={ratio} priority={priority} />
      </div>

      <div className="compare__layer compare__layer--after" ref={afterRef}>
        <Frame media={after} alt={afterAlt} sizes={sizes} ratio={ratio} priority={priority} />
      </div>

      <span className="compare__seam" ref={seamRef} aria-hidden="true">
        <span className="compare__handle" />
      </span>

      <input
        ref={inputRef}
        type="range"
        min={0}
        max={100}
        step={0.5}
        defaultValue={start}
        className="compare__control"
        aria-label={label}
        onInput={(event) => apply(Number((event.target as HTMLInputElement).value))}
      />

      <span className="compare__tag compare__tag--before">Before</span>
      <span className="compare__tag compare__tag--after">After</span>
    </div>
  )
}
