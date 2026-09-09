import type { MediaKey } from '../components/media/Frame'

export type Sector = {
  slug: string
  name: string
  media: MediaKey
  span: 'wide' | 'tall' | 'standard'
  answer: string
  lede: string
  pressures: { title: string; detail: string }[]
  capabilities: string[]
}

export const sectors: Sector[] = [
  {
    slug: 'shopping-centres',
    name: 'Shopping centres',
    media: 'sector-shopping-centre',
    span: 'wide',
    answer:
      'Dainamo Holdings works in Johannesburg shopping centres on resin flooring, waterproofing, parking demarcation and planned maintenance, programmed around trading hours so that public areas stay open and safe.',
    lede: 'A centre cannot be handed over to a contractor. The work has to fit between the last shopper leaving and the first one arriving.',
    pressures: [
      {
        title: 'Trading hours are not negotiable',
        detail: 'Night and early morning shifts, with the area barriered, cleaned and reopened before doors.',
      },
      {
        title: 'Public liability sits on the centre',
        detail: 'Wet areas signed, barriered and supervised, and no loose material left in a trafficked route.',
      },
      {
        title: 'Tenants notice everything',
        detail: 'Noise, odour and access routes agreed with centre management before a programme is issued.',
      },
    ],
    capabilities: ['epoxy-and-resin-flooring', 'waterproofing', 'thermoplastic-line-marking', 'maintenance-contracts'],
  },
  {
    slug: 'hospitals-and-healthcare',
    name: 'Hospitals and healthcare',
    media: 'sector-healthcare',
    span: 'standard',
    answer:
      'Dainamo Holdings installs hygienic epoxy and polyurethane flooring, coving and protective coatings in South African hospitals, clinics, laboratories and dental practices, working in phased sections so clinical areas stay in use.',
    lede: 'In a clinical area the floor is an infection control surface. Every joint, every upstand and every drain edge is part of that.',
    pressures: [
      {
        title: 'Infection control governs the method',
        detail: 'Dust containment, sealed hoardings and jointless finishes coved into the wall line.',
      },
      {
        title: 'Wards cannot all close at once',
        detail: 'Phased handover, section by section, with each area returned to service before the next opens.',
      },
      {
        title: 'Odour and cure times matter',
        detail: 'Low-odour systems and honest cure times, given in writing before the programme is agreed.',
      },
    ],
    capabilities: ['epoxy-and-resin-flooring', 'damp-proofing', 'maintenance-contracts'],
  },
  {
    slug: 'warehousing-and-industrial',
    name: 'Warehousing and industrial',
    media: 'sector-industrial',
    span: 'standard',
    answer:
      'Dainamo Holdings coats and demarcates warehouse, factory and distribution centre floors in Gauteng, and maintains industrial building fabric, with programmes built around racking, forklift traffic and shift patterns.',
    lede: 'A warehouse floor is a machine surface. It is loaded, turned on and cleaned harder than any other floor in the portfolio.',
    pressures: [
      {
        title: 'The racking does not move',
        detail: 'Work sequenced bay by bay around live racking and pick faces.',
      },
      {
        title: 'Forklifts are the real load case',
        detail: 'Systems chosen for point load and turning shear, not for how they look on a sample board.',
      },
      {
        title: 'Downtime is the biggest cost',
        detail: 'Cure times and phasing set so the area returns to operation on the agreed shift.',
      },
    ],
    capabilities: ['epoxy-and-resin-flooring', 'thermoplastic-line-marking', 'protective-and-industrial-coatings'],
  },
  {
    slug: 'residential-complexes',
    name: 'Residential complexes',
    media: 'sector-residential',
    span: 'standard',
    answer:
      'Dainamo Holdings carries out exterior refurbishment, waterproofing, damp proofing, boundary wall painting and planned maintenance for Johannesburg townhouse complexes, sectional title schemes and body corporates.',
    lede: "Trustees are spending other owners' money. The scope has to be complete enough to survive an annual general meeting.",
    pressures: [
      {
        title: 'The scope must be defensible',
        detail: 'Measured areas, itemised materials, labour scope and exclusions written out before work starts.',
      },
      {
        title: 'Residents live on the site',
        detail: 'Access, parking, noise hours and pets agreed with the managing agent in advance.',
      },
      {
        title: 'Budgets run to a cycle',
        detail: 'Work packaged so it can be phased across levies rather than forced into one financial year.',
      },
    ],
    capabilities: ['protective-and-industrial-coatings', 'waterproofing', 'damp-proofing', 'maintenance-contracts'],
  },
  {
    slug: 'commercial-offices',
    name: 'Commercial offices',
    media: 'sector-commercial',
    span: 'standard',
    answer:
      'Dainamo Holdings maintains and refurbishes commercial office buildings and business parks in Johannesburg, covering facade coatings, roof waterproofing, interior finishes, parking demarcation and multi-trade maintenance.',
    lede: 'The building has to keep working while it is being fixed. Reception cannot look like a site.',
    pressures: [
      {
        title: 'Tenants have lease obligations',
        detail: 'Programmes written around lease hours, lift access and after-hours security.',
      },
      {
        title: 'The building is on show',
        detail: 'Clean edges at every interface, and the site left presentable at the end of each shift.',
      },
      {
        title: 'Landlords need a paper trail',
        detail: 'Photographed records of covered work for the building file and future due diligence.',
      },
    ],
    capabilities: ['protective-and-industrial-coatings', 'waterproofing', 'maintenance-contracts'],
  },
]
