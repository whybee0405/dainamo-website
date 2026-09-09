'use client'

import { useState } from 'react'
import clientMedia from '../../lib/client-media.json'
import { ClientPhoto } from '../media/ClientPhoto'

const allCategories = Object.keys(clientMedia)

export function ClientGallery() {
  const [activeCategory, setActiveCategory] = useState('all')
  const groups = activeCategory === 'all' ? Object.values(clientMedia) : [clientMedia[activeCategory as keyof typeof clientMedia]]
  const photos = groups.flatMap((group) => group.images)

  return (
    <section className="client-gallery section" aria-labelledby="client-gallery-heading">
      <div className="shell">
        <div className="client-gallery__heading">
          <div>
            <p className="eyebrow">Work in the field</p>
            <h2 id="client-gallery-heading" className="display-2">
              The work, close up.
            </h2>
          </div>
          <p className="client-gallery__intro">
            A record of the surfaces, systems and site work Dainamo carries out across managed and
            commercial properties.
          </p>
        </div>

        <div className="client-gallery__filters" aria-label="Filter project photographs">
          <button
            type="button"
            className="client-gallery__filter"
            data-active={activeCategory === 'all' || undefined}
            onClick={() => setActiveCategory('all')}
          >
            All work
          </button>
          {allCategories.map((category) => (
            <button
              key={category}
              type="button"
              className="client-gallery__filter"
              data-active={activeCategory === category || undefined}
              onClick={() => setActiveCategory(category)}
            >
              {clientMedia[category as keyof typeof clientMedia].label}
            </button>
          ))}
        </div>

        <div className="client-gallery__grid">
          {photos.map((photo, index) => (
            <figure key={`${photo.category}-${photo.slug}`} className="client-gallery__item">
              <ClientPhoto
                category={photo.category}
                slug={photo.slug}
                sizes="(min-width: 1100px) 31vw, (min-width: 700px) 47vw, 100vw"
                ratio={index % 5 === 0 ? 1.18 : 1.42}
                className="client-gallery__photo"
              />
              <figcaption>
                <span>{photo.label}</span>
                <span aria-hidden="true">/</span>
                <span>{photo.source.replace(/\.jpe?g$/i, '')}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}