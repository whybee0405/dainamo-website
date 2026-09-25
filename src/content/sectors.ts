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
    lede: 'Centres stay open while we work, so most of it happens after the last shoppers leave and before the doors open again.',
    pressures: [
      {
        title: 'Trading hours come first',
        detail: 'Night and early morning shifts. Each area is barriered, cleaned and reopened before trading starts.',
      },
      {
        title: 'Public liability sits on the centre',
        detail: 'Wet areas signed, barriered and supervised, and no loose material left in a trafficked route.',
      },
      {
        title: 'Tenants are affected',
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
    lede: 'In clinical areas the floor is part of infection control, including the joints, upstands and drain edges.',
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
        detail: 'Low-odour systems, with cure times given in writing before the programme is agreed.',
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
    lede: 'Warehouse floors carry forklifts, heavy racking and frequent cleaning, so the system is chosen for that wear.',
    pressures: [
      {
        title: 'The racking does not move',
        detail: 'Work sequenced bay by bay around live racking and pick faces.',
      },
      {
        title: 'Forklifts set the load',
        detail: 'Systems chosen for point loads and the shear of turning wheels.',
      },
      {
        title: 'Downtime costs money',
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
    lede: "Trustees spend other owners' money, so they need a scope they can explain at the annual general meeting.",
    pressures: [
      {
        title: 'The scope has to stand up to questions',
        detail: 'Measured areas, itemised materials, labour scope and exclusions written out before work starts.',
      },
      {
        title: 'Residents live on the site',
        detail: 'Access, parking, noise hours and pets agreed with the managing agent in advance.',
      },
      {
        title: 'Budgets run to a cycle',
        detail: 'Work can be split into phases and paid from levies across more than one financial year.',
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
    lede: 'Offices keep working while we are on site, so work areas are screened and public areas are kept clean.',
    pressures: [
      {
        title: 'Tenants have lease obligations',
        detail: 'Programmes written around lease hours, lift access and after-hours security.',
      },
      {
        title: 'Visitors see the building',
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
