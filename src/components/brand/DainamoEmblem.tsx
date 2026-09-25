import React from 'react'

type Tone = 'light' | 'dark' | 'auto' | 'mono'

export type DainamoEmblemProps = {
  width?: number
  tone?: Tone
  className?: string
  decorative?: boolean
  animated?: boolean
}

/** The approved emblem artwork, optimised for small interface placements. */
export const DainamoEmblem: React.FC<DainamoEmblemProps> = ({
  width = 48,
  tone = 'dark',
  className,
  decorative = true,
  animated = false,
}) => {
  const assetTone = tone === 'dark' ? 'dark' : 'light'
  const height = Math.round(width * (assetTone === 'dark' ? 623 / 512 : 605 / 512))

  return (
    <picture
      className={[className, 'brand-emblem', animated ? 'emblem--animated' : null].filter(Boolean).join(' ')}
      style={{ width }}
    >
      <source srcSet={`/brand/symbol-${assetTone}.avif`} type="image/avif" />
      <img
        src={`/brand/symbol-${assetTone}.webp`}
        width={width}
        height={height}
        alt={decorative ? '' : 'Dainamo Holdings'}
        aria-hidden={decorative || undefined}
        decoding="async"
      />
    </picture>
  )
}
