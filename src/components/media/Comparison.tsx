'use client'

import { useCallback, useEffect, useRef } from 'react'

import { Frame, type PhotoKey } from './Frame'

export type ComparisonProps = {
  before: PhotoKey
  after: PhotoKey
  beforeAlt: string
  afterAlt: string
  label: string
  sizes: string
  /** Where the seam rests, as a percentage from the left. */
  start?: number
  /** Crops for each layer, so two photographs taken from slightly different
      positions line up on the same subject. */
  beforePosition?: string
  afterPosition?: string
  /** Scale a layer about its crop point when one shot was taken from further back. */
  beforeZoom?: number
  afterZoom?: number
  className?: string
}

function layerStyle(position: string, zoom: number) {
  return { ['--zoom' as string]: zoom, ['--origin' as string]: position }
}

/**
 * Before and after, on one slider.
 *
 * The gesture never touches React state. The clip on the top layer and the
 * transform on the seam are written straight onto their elements, so dragging
 * stays off the render path. A native range input underneath carries keyboard
 * and screen reader control for free.
 */
export function Comparison({
  before,
  after,
  beforeAlt,
  afterAlt,
  label,
  sizes,
  start = 50,
  beforePosition = '50% 50%',
  afterPosition = '50% 50%',
  beforeZoom = 1,
  afterZoom = 1,
  className,
}: ComparisonProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const afterRef = useRef<HTMLDivElement>(null)
  const seamRef = useRef<HTMLSpanElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const apply = useCallback((value: number) => {
    const width = rootRef.current?.clientWidth ?? 0
    if (afterRef.current) afterRef.current.style.clipPath = `inset(0 0 0 ${value}%)`
    if (seamRef.current) seamRef.current.style.transform = `translate3d(${(value / 100) * width}px, 0, 0)`
  }, [])

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = String(start)
    apply(start)
    const onResize = () => apply(Number(inputRef.current?.value ?? start))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [apply, start, before, after])

  return (
    <div ref={rootRef} className={['compare', className].filter(Boolean).join(' ')}>
      <div className="compare__layer" style={layerStyle(beforePosition, beforeZoom)}>
        <Frame media={before} alt={beforeAlt} sizes={sizes} ratio={0} position={beforePosition} />
      </div>

      <div className="compare__layer compare__layer--after" ref={afterRef} style={layerStyle(afterPosition, afterZoom)}>
        <Frame media={after} alt={afterAlt} sizes={sizes} ratio={0} position={afterPosition} />
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
