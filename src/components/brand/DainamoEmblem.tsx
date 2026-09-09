import React from 'react'

type Tone = 'light' | 'dark' | 'auto' | 'mono'

/**
 * The mark is two-tone blue, following the company profile rather than the
 * invoice. `accent` here names the outer chevrons, not the site's accent
 * colour: the emblem stays entirely within the brand blues.
 */
const TONES: Record<Tone, { primary: string; accent: string; window: string }> = {
  // `light` = artwork sits on the white ground.
  light: { primary: '#12439F', accent: '#5B93F0', window: '#FFFFFF' },
  // `dark` = artwork sits on the deep blue block that closes each page.
  dark: { primary: '#FFFFFF', accent: '#5B93F0', window: '#08183C' },
  // `auto` inherits the surrounding text colour for the structure and keeps the
  // lighter chevrons fixed, for surfaces that can switch light or dark.
  auto: { primary: 'currentColor', accent: '#4E8BEE', window: 'transparent' },
  mono: { primary: 'currentColor', accent: 'currentColor', window: 'transparent' },
}

export type DainamoEmblemProps = {
  width?: number
  tone?: Tone
  className?: string
  /** Set when the emblem is decorative and a sibling already carries the name. */
  decorative?: boolean
  /** Adds the draw-in animation classes used by the site header on first paint. */
  animated?: boolean
}

/**
 * The Dainamo Holdings emblem: three interlocking chevron diamonds around a
 * skyline. Rebuilt as vector artwork from the company's invoice lockup so it
 * stays crisp at every size and can reverse cleanly onto the navy site.
 */
export const DainamoEmblem: React.FC<DainamoEmblemProps> = ({
  width = 48,
  tone = 'dark',
  className,
  decorative = true,
  animated = false,
}) => {
  const c = TONES[tone]
  const height = Math.round((width * 132) / 240)

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 240 132"
      className={[className, animated ? 'emblem--animated' : null].filter(Boolean).join(' ')}
      role={decorative ? 'presentation' : 'img'}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : 'Dainamo Holdings'}
      focusable="false"
    >
      {!decorative && <title>Dainamo Holdings</title>}
      <g fillRule="evenodd">
        <path
          className="emblem__wing emblem__wing--gold"
          fill={c.accent}
          d="M53 19 105 71 53 123 1 71Z M53 34 90 71 53 108 16 71Z"
        />
        <path
          className="emblem__wing emblem__wing--gold"
          fill={c.accent}
          d="M187 19 239 71 187 123 135 71Z M187 34 224 71 187 108 150 71Z"
        />
        <path
          className="emblem__wing"
          fill={c.primary}
          d="M62 24 114 76 62 128 10 76Z M62 39 99 76 62 113 25 76Z"
        />
        <path
          className="emblem__wing"
          fill={c.primary}
          d="M178 24 230 76 178 128 126 76Z M178 39 215 76 178 113 141 76Z"
        />
        <path
          className="emblem__core"
          fill={c.primary}
          d="M120 2 182 66 120 130 58 66Z M120 20 164 66 120 112 76 66Z"
        />
      </g>
      <g className="emblem__skyline">
        <path fill={c.accent} d="M97 79h13v45H97Z" />
        <path fill={c.primary} d="M97 79h3v45h-3Z" />
        <path fill={c.accent} d="M130 83h13v41h-13Z" />
        <path fill={c.primary} d="M140 83h3v41h-3Z" />
        <path fill={c.accent} d="M112 57h9v67h-9Z" />
        <path fill={c.primary} d="M121 57h8v67h-8Z" />
        {tone !== 'mono' && tone !== 'auto' && (
          <g fill={c.window}>
            <rect x="123.5" y="64" width="3" height="3" />
            <rect x="123.5" y="72" width="3" height="3" />
            <rect x="123.5" y="80" width="3" height="3" />
            <rect x="123.5" y="88" width="3" height="3" />
            <rect x="123.5" y="96" width="3" height="3" />
          </g>
        )}
      </g>
    </svg>
  )
}
