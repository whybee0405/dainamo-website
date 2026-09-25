'use client'

import { useState } from 'react'
import { ArrowsHorizontal } from '@phosphor-icons/react/dist/ssr'

import { Comparison } from '../media/Comparison'
import { beforeAfterPairs } from '../../content/photos'

/**
 * Real before and after pairs from Dainamo sites, one slider, switchable by
 * job. New pairs are added in content/photos.ts and appear here automatically.
 */
export function BeforeAfter({ tone = 'paper' }: { tone?: 'paper' | 'mist' }) {
  const [activeId, setActiveId] = useState(beforeAfterPairs[0]?.id)
  const active = beforeAfterPairs.find((pair) => pair.id === activeId) ?? beforeAfterPairs[0]
  if (!active) return null

  return (
    <section
      className={`before-after section${tone === 'mist' ? ' section--mist' : ''}`}
      aria-labelledby="before-after-heading"
    >
      <div className="shell before-after__grid">
        <div className="before-after__copy">
          <h2 id="before-after-heading" className="display-2">
            The same spot, before and after.
          </h2>
          <p className="lede">
            Photographs from our own jobs, taken before the work started and after it was finished.
            Drag the handle or use the arrow keys to compare.
          </p>

          <div className="before-after__jobs" role="group" aria-label="Choose a job">
            {beforeAfterPairs.map((pair) => (
              <button
                key={pair.id}
                type="button"
                className="before-after__job"
                aria-pressed={pair.id === active.id}
                onClick={() => setActiveId(pair.id)}
              >
                <span className="before-after__discipline">{pair.discipline}</span>
                <span className="before-after__title">{pair.title}</span>
              </button>
            ))}
          </div>

          <p className="before-after__detail" aria-live="polite">
            {active.detail}
          </p>
        </div>

        <div className="before-after__stage">
          <Comparison
            key={active.id}
            before={active.before.key}
            after={active.after.key}
            beforeAlt={active.before.alt}
            afterAlt={active.after.alt}
            beforePosition={active.before.position}
            afterPosition={active.after.position}
            beforeZoom={active.before.zoom}
            afterZoom={active.after.zoom}
            label={`Compare ${active.title.toLowerCase()} before and after`}
            sizes="(min-width: 1080px) 56vw, 100vw"
          />
          <p className="before-after__hint">
            <ArrowsHorizontal size={16} weight="bold" aria-hidden="true" />
            Drag to compare
          </p>
        </div>
      </div>
    </section>
  )
}
