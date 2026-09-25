import photos from '../../lib/photos.json'

export type PhotoKey = keyof typeof photos
/** Kept for the content types that predate the photo library. */
export type MediaKey = PhotoKey

export type FrameProps = {
  media: PhotoKey
  alt: string
  /** Matches the CSS `sizes` attribute so the browser downloads one file, once. */
  sizes: string
  className?: string
  priority?: boolean
  /** Overrides the intrinsic ratio when the frame is deliberately cropped. */
  ratio?: number
  position?: string
  /** Hides the small "Illustrative" tag on generated scenes, for tiny thumbnails. */
  hideTag?: boolean
}

export function isPhotoKey(value: string): value is PhotoKey {
  return value in photos
}

/** Generated scene-setting images must never be described as Dainamo's work. */
export function describePhoto(media: PhotoKey, subject: string) {
  return photos[media]?.kind === 'scene'
    ? `Illustrative scene: ${subject.toLowerCase()}`
    : `${subject} carried out by Dainamo Holdings`
}

/**
 * Pre-generated AVIF and WebP variants with an inline blurred placeholder.
 *
 * The wrapper carries the aspect ratio, so the slot is reserved before the
 * bytes arrive and nothing on the page moves as images load. Generated scene
 * images are tagged as illustrative wherever they appear, so nobody mistakes
 * one for a photograph of Dainamo's own work.
 */
export function Frame({
  media,
  alt,
  sizes,
  className,
  priority = false,
  ratio,
  position = '50% 50%',
  hideTag = false,
}: FrameProps) {
  const entry = photos[media]
  if (!entry) return null

  const widths = entry.widths as number[]
  const largest = widths[widths.length - 1]
  const srcSet = (ext: string) =>
    widths.map((width) => `/media/photos/${media}-${width}.${ext} ${width}w`).join(', ')

  return (
    <div
      className={['frame', className].filter(Boolean).join(' ')}
      style={{
        aspectRatio: ratio === 0 ? undefined : String(ratio ?? entry.aspect),
        backgroundImage: `url("${entry.blur}")`,
      }}
    >
      <picture>
        <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
        <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
        <img
          src={`/media/photos/${media}-${widths.filter((width) => width <= 1600).pop() ?? widths[0]}.webp`}
          alt={alt}
          sizes={sizes}
          width={largest}
          height={Math.round(largest / entry.aspect)}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          style={{ objectPosition: position }}
        />
      </picture>
      {entry.kind === 'scene' && !hideTag && (
        <span className="frame__tag" aria-hidden="true">
          Illustrative
        </span>
      )}
    </div>
  )
}
