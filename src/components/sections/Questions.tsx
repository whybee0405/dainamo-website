'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Plus } from '@phosphor-icons/react/dist/ssr'

import type { Question } from '../../content/questions'

export function Questions({
  items,
  heading = 'Questions we get asked before the site visit.',
  showEyebrow = true,
  showAll = true,
  /** Used where several groups stack on one page and each needs less weight. */
  compact = false,
}: {
  items: Question[]
  heading?: string
  showEyebrow?: boolean
  showAll?: boolean
  compact?: boolean
}) {
  const [open, setOpen] = useState<string | null>(compact ? null : (items[0]?.question ?? null))
  const headingId = `questions-${heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')}`

  return (
    <section
      className={`questions section${compact ? ' questions--compact' : ''}`}
      aria-labelledby={headingId}
    >
      <div className="shell questions__inner">
        <div className="questions__head">
          {showEyebrow && <p className="eyebrow">Straight answers</p>}
          <h2 id={headingId} className={compact ? 'display-3' : 'display-2'}>
            {heading}
          </h2>
          {showAll && (
            <Link href="/questions" className="questions__all" data-cursor="link">
              Read every question
            </Link>
          )}
        </div>

        <div className="questions__list">
          {items.map((item) => {
            const expanded = open === item.question
            const panelId = `${headingId}-${item.question.slice(0, 24).replace(/\W+/g, '')}`
            return (
              <div key={item.question} className="question" data-open={expanded || undefined}>
                <h3>
                  <button
                    type="button"
                    className="question__trigger"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setOpen(expanded ? null : item.question)}
                  >
                    <span className="question__text">{item.question}</span>
                    <span className="question__icon" aria-hidden="true">
                      <Plus size={17} weight="bold" />
                    </span>
                  </button>
                </h3>

                {/* The answer stays in the DOM so search engines and assistants
                    read it whether or not it is open. The open and closed states
                    are a CSS transition on grid-template-rows rather than an
                    animated height, which keeps it off the layout path and lets
                    a fast second click interrupt it cleanly. */}
                <div className="question__panel" id={panelId}>
                  <div className="question__panel-inner">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
