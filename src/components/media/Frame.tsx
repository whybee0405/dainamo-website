import manifest from '../../lib/media-manifest.json'

type MediaKey = keyof typeof manifest

export type FrameProps = {
  media: MediaKey
  alt: string
  /** Matches the CSS `sizes` attribute so the browser downloads one file, once. */
  sizes: string
  className?: string
  priority?: boolean
  /** Overrides the intrinsic ratio when the frame is deliberately cropped. */
  ratio?: number
  position?: string
}

/**
 * Pre-generated AVIF and WebP variants with an inline blurred placeholder.
 *
 * The wrapper carries the aspect ratio, so the slot is reserved before the
 * bytes arrive and nothing on the page moves as images load.
 */
export function Frame({
  media,
  alt,
  sizes,
  className,
  priority = false,
  ratio,
  position = '50% 50%',
}: FrameProps) {
  const entry = manifest[media]
  if (!entry) return null

  const widths = entry.widths as number[]
  const largest = widths[widths.length - 1]
  const srcSet = (ext: string) =>
    widths.map((width) => `/media/${media}-${width}.${ext} ${width}w`).join(', ')

  return (
    <div
      className={['frame', className].filter(Boolean).join(' ')}
      style={{
        aspectRatio: String(ratio ?? entry.aspect),
        backgroundImage: `url("${entry.blur}")`,
      }}
    >
      <picture>
        <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
        <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
        <img
          src={`/media/${media}-${largest}.webp`}
          alt={alt}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          style={{ objectPosition: position }}
        />
      </picture>
    </div>
  )
}

export type { MediaKey }
