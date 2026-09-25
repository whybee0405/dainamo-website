import Link from 'next/link'
import { CaretRight } from '@phosphor-icons/react/dist/ssr'

import { Frame, type PhotoKey } from '../media/Frame'

export type Crumb = { name: string; href: string }

/**
 * Shared masthead for inner pages. The `answer` paragraph is written to be a
 * self contained response to the page's question, because that is the block an
 * assistant is most likely to quote.
 *
 * With `media`, the page opens as a split: copy on the left, a tall photograph
 * on the right. Without it, the masthead is typographic.
 */
export function PageHead({
  eyebrow,
  title,
  answer,
  crumbs,
  media,
  mediaAlt,
  mediaPosition,
  children,
}: {
  eyebrow?: string
  title: string
  answer: string
  crumbs: Crumb[]
  media?: PhotoKey
  mediaAlt?: string
  mediaPosition?: string
  children?: React.ReactNode
}) {
  return (
    <header className="page-head" data-media={media ? true : undefined}>
      <div className="shell page-head__grid">
        <div className="page-head__copy">
          <nav aria-label="Breadcrumb" className="crumbs">
            <ol>
              {crumbs.map((crumb, index) => (
                <li key={crumb.href}>
                  {index < crumbs.length - 1 ? (
                    <>
                      <Link href={crumb.href}>{crumb.name}</Link>
                      <CaretRight size={11} weight="bold" aria-hidden="true" />
                    </>
                  ) : (
                    <span aria-current="page">{crumb.name}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {eyebrow && <p className="eyebrow page-head__eyebrow">{eyebrow}</p>}
          <h1 className="display-1 page-head__title">{title}</h1>
          <p className="lede page-head__answer">{answer}</p>
          {children}
        </div>

        {media && (
          <div className="page-head__media">
            <Frame
              media={media}
              alt={mediaAlt ?? `Illustrative scene for ${title}`}
              sizes="(min-width: 1080px) 46vw, 100vw"
              ratio={0}
              position={mediaPosition}
              priority
            />
          </div>
        )}
      </div>
    </header>
  )
}
