'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, X, ArrowsOut } from '@phosphor-icons/react/dist/ssr'

import { Frame } from '../media/Frame'
import { workGroups, type SitePhoto } from '../../content/photos'

/**
 * The site photographs, grouped by discipline, with a lightbox.
 *
 * The lightbox is a native <dialog>, which brings focus trapping, Escape to
 * close and the inert background for free. Arrow keys step through whichever
 * set is currently filtered.
 */
export function WorkGallery() {
  const [active, setActive] = useState<string>('all')
  const [index, setIndex] = useState<number | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)

  const photos: SitePhoto[] =
    active === 'all'
      ? workGroups.flatMap((group) => group.photos)
      : (workGroups.find((group) => group.id === active)?.photos ?? [])

  const open = (next: number) => {
    setIndex(next)
    dialog.current?.showModal()
  }

  const close = useCallback(() => {
    dialog.current?.close()
  }, [])

  const step = useCallback(
    (direction: 1 | -1) => {
      setIndex((current) => (current === null ? current : (current + direction + photos.length) % photos.length))
    },
    [photos.length],
  )

  useEffect(() => {
    const node = dialog.current
    if (!node) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') step(1)
      if (event.key === 'ArrowLeft') step(-1)
    }
    const onClose = () => setIndex(null)
    node.addEventListener('keydown', onKey)
    node.addEventListener('close', onClose)
    return () => {
      node.removeEventListener('keydown', onKey)
      node.removeEventListener('close', onClose)
    }
  }, [step])

  const current = index === null ? null : photos[index]
  const count = (id: string) =>
    id === 'all'
      ? workGroups.reduce((total, group) => total + group.photos.length, 0)
      : (workGroups.find((group) => group.id === id)?.photos.length ?? 0)

  return (
    <section className="gallery section" aria-labelledby="gallery-heading">
      <div className="shell">
        <div className="section-head section-head--split">
          <div>
            <h2 id="gallery-heading" className="display-2">
              The work, close up.
            </h2>
          </div>
          <p className="lede">
            Every photograph here was taken on a Dainamo site. Filter by type of work, or open an
            image to see it full size.
          </p>
        </div>

        <div className="gallery__tabs" role="group" aria-label="Filter by discipline">
          {[{ id: 'all', label: 'All work' }, ...workGroups].map((group) => (
            <button
              key={group.id}
              type="button"
              className="gallery__tab"
              aria-pressed={active === group.id}
              onClick={() => setActive(group.id)}
            >
              {group.label}
              <span className="gallery__count tabular">{count(group.id)}</span>
            </button>
          ))}
        </div>

        <ul className="gallery__grid" aria-live="polite">
          {photos.map((photo, position) => (
            <li key={`${active}-${photo.key}`} className="gallery__item">
              <button
                type="button"
                className="gallery__open"
                onClick={() => open(position)}
                aria-label={`View larger: ${photo.caption}`}
              >
                <Frame
                  media={photo.key}
                  alt={photo.alt}
                  sizes="(min-width: 1080px) 31vw, (min-width: 640px) 47vw, 100vw"
                  ratio={1.33}
                />
                <span className="gallery__zoom" aria-hidden="true">
                  <ArrowsOut size={16} weight="bold" />
                </span>
              </button>
              <p className="gallery__caption">{photo.caption}</p>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialog}
        className="lightbox"
        aria-label="Photograph viewer"
        onClick={(event) => {
          if (event.target === event.currentTarget) close()
        }}
      >
        {current && (
          <div className="lightbox__inner">
            <div className="lightbox__bar">
              <p className="lightbox__count tabular">
                {(index ?? 0) + 1} / {photos.length}
              </p>
              <button type="button" className="icon-btn icon-btn--dark" onClick={close} aria-label="Close viewer">
                <X size={18} weight="bold" />
              </button>
            </div>
            <figure className="lightbox__figure">
              <Frame key={current.key} media={current.key} alt={current.alt} sizes="90vw" ratio={0} className="lightbox__frame" />
              <figcaption>{current.caption}</figcaption>
            </figure>
            <div className="lightbox__nav">
              <button type="button" className="icon-btn icon-btn--dark" onClick={() => step(-1)} aria-label="Previous photograph">
                <ArrowLeft size={18} weight="bold" />
              </button>
              <button type="button" className="icon-btn icon-btn--dark" onClick={() => step(1)} aria-label="Next photograph">
                <ArrowRight size={18} weight="bold" />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  )
}
