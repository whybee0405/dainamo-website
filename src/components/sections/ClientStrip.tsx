/**
 * Names published by Dainamo in its own company profile. They are set as
 * typographic wordmarks rather than reconstructed logos, because using an
 * approximation of another company's mark is a brand misuse risk. Official SVGs
 * can be uploaded per client in the studio and will replace this treatment.
 */
const clients = [
  'Specialized Coating Systems',
  'Anaprop',
  'Family Dental',
  'Sasol Garages',
  'Engine',
  'Sanlam',
  'DVI',
]

export function ClientStrip() {
  return (
    <section className="client-strip" aria-labelledby="clients-heading">
      <div className="shell client-strip__inner">
        <h2 id="clients-heading" className="client-strip__heading">
          Sites we have worked on
        </h2>
        <ul className="client-strip__list">
          {clients.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
