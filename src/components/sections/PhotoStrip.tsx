import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'

import { Frame, type PhotoKey } from '../media/Frame'
import { sitePhoto } from '../../content/photos'

/** A short run of site photographs with captions, used on capability pages. */
export function PhotoStrip({ photos, heading = 'From our sites' }: { photos: PhotoKey[]; heading?: string }) {
  const items = photos.map((key) => sitePhoto(key)).filter((photo) => photo !== undefined)
  if (items.length === 0) return null

  return (
    <section className="strip section section--mist" aria-labelledby="strip-heading">
      <div className="shell">
        <div className="strip__head">
          <h2 id="strip-heading" className="display-3">
            {heading}
          </h2>
          <Link href="/work" className="text-link">
            All work
            <ArrowRight size={16} weight="bold" aria-hidden="true" />
          </Link>
        </div>
        <ul className="strip__grid" data-count={items.length}>
          {items.map((photo) => (
            <li key={photo.key}>
              <figure>
                <Frame media={photo.key} alt={photo.alt} sizes="(min-width: 1080px) 31vw, (min-width: 640px) 47vw, 100vw" ratio={1.3} />
                <figcaption>{photo.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
