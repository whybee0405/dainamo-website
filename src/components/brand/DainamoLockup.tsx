import React from 'react'

export type DainamoLockupProps = {
  width?: number
  tone?: 'light' | 'dark'
  orientation?: 'horizontal' | 'stacked'
  /** Kept for call-site compatibility; the approved artwork contains its own lockup. */
  strapline?: boolean
  className?: string
}

/** Full company lockup using the supplied, approved logo artwork. */
export const DainamoLockup: React.FC<DainamoLockupProps> = ({
  width = 220,
  tone = 'dark',
  orientation = 'horizontal',
  className,
}) => {
  const stacked = orientation === 'stacked'
  const asset = `${stacked ? 'stacked' : tone === 'dark' ? 'secondary' : 'primary'}-${
    tone === 'dark' ? 'dark' : 'light'
  }`
  const height = stacked
    ? Math.round(width * (tone === 'dark' ? 1.008 : 1.028))
    : Math.round(width * (tone === 'dark' ? 0.358 : 0.373))

  return (
    <span
      className={['lockup', stacked ? 'lockup--stacked' : 'lockup--row', className]
        .filter(Boolean)
        .join(' ')}
      data-tone={tone}
      style={{ ['--lockup-w' as string]: `${width}px`, width }}
    >
      <picture className="brand-lockup__picture" aria-hidden="true">
        <source srcSet={`/brand/${asset}.avif`} type="image/avif" />
        <img
          className="brand-lockup__image"
          src={`/brand/${asset}.webp`}
          width={width}
          height={height}
          alt=""
          decoding="async"
        />
      </picture>
      <span className="sr-only">Dainamo Holdings (Pty) Ltd</span>
    </span>
  )
}
