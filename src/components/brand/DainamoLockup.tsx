import React from 'react'
import { DainamoEmblem } from './DainamoEmblem'

export type DainamoLockupProps = {
  width?: number
  tone?: 'light' | 'dark'
  orientation?: 'horizontal' | 'stacked'
  /** Shows the BUILDING / RENOVATING / PROTECTING strapline under the wordmark. */
  strapline?: boolean
  className?: string
}

/**
 * Full company lockup: emblem plus wordmark.
 *
 * The wordmark is real text rather than outlines, so it stays selectable and
 * searchable and renders crisply at any size. Every internal measurement is
 * derived from one width variable, which keeps the proportions locked whether
 * the lockup is 160px in a header or 320px in a footer.
 */
export const DainamoLockup: React.FC<DainamoLockupProps> = ({
  width = 220,
  tone = 'dark',
  orientation = 'horizontal',
  strapline = false,
  className,
}) => {
  const stacked = orientation === 'stacked'

  return (
    <span
      className={['lockup', stacked ? 'lockup--stacked' : 'lockup--row', className]
        .filter(Boolean)
        .join(' ')}
      data-tone={tone}
      style={{ ['--lockup-w' as string]: `${width}px`, width }}
    >
      <DainamoEmblem width={stacked ? width * 0.58 : width * 0.38} tone={tone} />
      <span className="lockup__type">
        <span className="lockup__word" aria-hidden="true">
          Dainamo
        </span>
        <span className="lockup__rule" aria-hidden="true">
          <span className="lockup__holdings">Holdings</span>
        </span>
        {strapline && (
          <span className="lockup__strapline" aria-hidden="true">
            Building · Renovating · Protecting
          </span>
        )}
      </span>
      <span className="sr-only">Dainamo Holdings (Pty) Ltd</span>
    </span>
  )
}
