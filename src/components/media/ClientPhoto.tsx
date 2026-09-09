import clientMedia from '../../lib/client-media.json'

type ClientMedia = typeof clientMedia
type Category = keyof ClientMedia

export type ClientPhotoProps = {
  category: Category | string
  slug: string
  alt?: string
  sizes?: string
  className?: string
  ratio?: number
  position?: string
  priority?: boolean
}

export function findClientPhoto(category: string, slug: string) {
  const group = (clientMedia as ClientMedia)[category as Category]
  return group?.images.find((image) => image.slug === slug)
}

export function ClientPhoto({
  category,
  slug,
  alt,
  sizes = '100vw',
  className,
  ratio,
  position = '50% 50%',
  priority = false,
}: ClientPhotoProps) {
  const image = findClientPhoto(category, slug)
  if (!image) return null

  const largest = image.widths[image.widths.length - 1]
  const srcSet = (extension: 'avif' | 'webp') =>
    image.widths
      .map((width) => `/media/client/${image.category}/${image.slug}-${width}.${extension} ${width}w`)
      .join(', ')

  return (
    <div
      className={['client-photo', className].filter(Boolean).join(' ')}
      style={{ aspectRatio: String(ratio ?? image.aspect) }}
    >
      <picture>
        <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
        <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
        <img
          src={`/media/client/${image.category}/${image.slug}-${largest}.webp`}
          alt={alt ?? image.alt}
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