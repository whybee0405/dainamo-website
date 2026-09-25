import Link from 'next/link'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'

import { Frame } from '../media/Frame'
import { Reveal } from '../motion/Reveal'
import { sectors as fallbackSectors, type Sector } from '../../content/sectors'

export function SectorGrid({
  sectors = fallbackSectors,
  heading = 'Planned around how each building runs.',
  intro = 'A hospital, a warehouse and a townhouse complex each limit access, working hours, dust, odour and cure times differently. We write the programme around those limits.',
  showHead = true,
}: {
  sectors?: Sector[]
  heading?: string
  intro?: string
  showHead?: boolean
}) {
  return (
    <section className="sectors section" aria-labelledby="sectors-heading">
      <div className="shell">
        {showHead ? (
          <div className="section-head section-head--split">
            <div>
              <h2 id="sectors-heading" className="display-2">
                {heading}
              </h2>
            </div>
            <p className="lede">{intro}</p>
          </div>
        ) : (
          <h2 id="sectors-heading" className="sr-only">
            Sectors
          </h2>
        )}

        <div className="sectors__grid">
          {sectors.map((sector, index) => (
            <Reveal key={sector.slug} className="sector-card" amount={0.2} delay={Math.min(index % 3, 2) * 0.06}>
              <Link href={`/sectors/${sector.slug}`} className="sector-card__link">
                <Frame
                  media={sector.media}
                  alt={`Illustrative scene: ${sector.name.toLowerCase()}`}
                  sizes="(min-width: 1080px) 34vw, (min-width: 700px) 50vw, 100vw"
                  ratio={1.45}
                  className="sector-card__media"
                />
                <div className="sector-card__body">
                  <h3 className="sector-card__name">{sector.name}</h3>
                  <p className="sector-card__lede">{sector.lede}</p>
                  <span className="sector-card__cue">
                    Constraints and method
                    <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
