import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react/dist/ssr'

import { Frame, describePhoto } from '../media/Frame'
import { Reveal } from '../motion/Reveal'
import { capabilityCover } from '../../content/photos'
import { capabilities as fallbackCapabilities, type Capability } from '../../content/capabilities'

/**
 * The four core systems as a bento grid, each led by a real site photograph,
 * then the supporting specialisms as a quieter row underneath.
 */
export function Services({ capabilities = fallbackCapabilities }: { capabilities?: Capability[] }) {
  const core = capabilities.filter((capability) => capability.flagship).slice(0, 4)
  const more = capabilities.filter((capability) => !core.includes(capability))

  return (
    <section className="services section" aria-labelledby="services-heading">
      <div className="shell">
        <div className="section-head section-head--split">
          <div className="section-head__title">
            <h2 id="services-heading" className="display-2">
              Four specialist systems from one contractor.
            </h2>
          </div>
          <p className="lede">
            Each system is chosen for the surface, the traffic and the weather it faces, then priced
            line by line. Plumbing, electrical and other supporting trades can go on the same
            contract.
          </p>
        </div>

        <div className="services__grid">
          {core.map((capability, index) => (
            <Reveal key={capability.slug} className="service-card" amount={0.2} delay={(index % 2) * 0.06}>
              <Link href={`/capabilities/${capability.slug}`} className="service-card__link">
                <Frame
                  media={capabilityCover[capability.slug] ?? capability.media}
                  alt={describePhoto(capabilityCover[capability.slug] ?? capability.media, capability.name)}
                  sizes="(min-width: 1080px) 50vw, 100vw"
                  ratio={0}
                  className="service-card__media"
                />
                <div className="service-card__body">
                  <h3 className="service-card__title">{capability.name}</h3>
                  <p className="service-card__lede">{capability.lede}</p>
                  <p className="service-card__systems">
                    {capability.systems.map((system) => system.name).join(' · ')}
                  </p>
                  <span className="service-card__cue">
                    How we scope it
                    <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {more.length > 0 && (
          <div className="services__more">
            <p className="services__more-label">Also on the same contract</p>
            <ul>
              {more.map((capability) => (
                <li key={capability.slug}>
                  <Link href={`/capabilities/${capability.slug}`} className="services__more-link">
                    {capability.name}
                    <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/capabilities#trades" className="services__more-link">
                  Plumbing, electrical, HVAC, solar and interiors
                  <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
                </Link>
              </li>
            </ul>
            <Link href="/capabilities" className="text-link services__all">
              All capabilities
              <ArrowRight size={16} weight="bold" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
