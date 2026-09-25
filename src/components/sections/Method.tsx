import { Frame } from '../media/Frame'
import { Reveal } from '../motion/Reveal'

const steps = [
  {
    title: 'Survey the building',
    body: 'We walk the site and take readings before we quote. We photograph failed details, measure the areas and write down the cause of the problem.',
    output: 'Photographed findings and measured areas',
  },
  {
    title: 'Specify the system',
    body: 'We choose the system for the surface, the load and the exposure, then price it line by line, with materials, labour, equipment hire and exclusions itemised.',
    output: 'An itemised quotation with exclusions stated',
  },
  {
    title: 'Programme around the building',
    body: 'We agree phasing, shifts, access, noise and cure times with the facilities manager first, so the building can keep operating.',
    output: 'An agreed phasing plan and access schedule',
  },
  {
    title: 'Hand over the record',
    body: 'We inspect, touch up and clean the site. Photographs of the covered work go into the building file for whoever maintains it next.',
    output: 'A handover pack for the maintenance file',
  },
]

export function Method() {
  return (
    <section className="method section section--mist" aria-labelledby="method-heading">
      <div className="shell method__grid">
        <div className="method__aside">
          <h2 id="method-heading" className="display-2">
            From your call to the handover.
          </h2>
          <p className="lede">
            Each step ends with something in writing, so you know what was found, what was agreed
            and what was done.
          </p>
          <Frame
            media="scene-inspection"
            alt="Illustrative scene: a moisture meter, tape measure and clipboard on a concrete floor during a site survey"
            sizes="(min-width: 1080px) 38vw, 100vw"
            ratio={1.5}
            className="method__media"
          />
        </div>

        <ol className="method__list">
          {steps.map((step, index) => (
            <li key={step.title}>
              <Reveal amount={0.35} className="method__step">
                <span className="method__count tabular" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="method__title">{step.title}</h3>
                  <p className="method__body">{step.body}</p>
                  <p className="method__output">
                    <span className="method__output-label">You get</span>
                    {step.output}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
