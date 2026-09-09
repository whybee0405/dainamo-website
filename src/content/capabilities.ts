import type { MediaKey } from '../components/media/Frame'

export type Capability = {
  slug: string
  name: string
  shortName: string
  flagship: boolean
  media: MediaKey
  /** One plain sentence. Doubles as the meta description and the AI answer. */
  answer: string
  lede: string
  systems: { name: string; detail: string }[]
  scope: string[]
  sectors: string[]
  /** Question the buyer is actually asking when they land here. */
  buyerQuestion: string
}

export const capabilities: Capability[] = [
  {
    slug: 'epoxy-and-resin-flooring',
    name: 'Epoxy and resin flooring',
    shortName: 'Resin flooring',
    flagship: true,
    media: 'coatings-warehouse-floor',
    answer:
      'Dainamo Holdings installs epoxy and polyurethane resin floor systems in hospitals, food production facilities, warehouses and workshops across Johannesburg and Gauteng, including surface preparation, moisture testing, coving, screeds, topcoats and line marking.',
    lede: 'A resin floor is a build-up, not a coat of paint. What goes underneath decides whether it lasts five years or fails in one.',
    systems: [
      {
        name: 'Epoxy self-levelling',
        detail: 'Seamless, easy to clean and hard wearing. The default for warehouses, workshops and back-of-house areas.',
      },
      {
        name: 'Polyurethane screed',
        detail: 'Handles thermal shock, steam cleaning and heavy point loads. Specified for kitchens and food production.',
      },
      {
        name: 'Anti-static and hygienic systems',
        detail: 'Coved, jointless and sealed to the wall for theatres, wards, laboratories and clean areas.',
      },
      {
        name: 'Anti-slip and demarcation',
        detail: 'Aggregate-broadcast finishes for ramps and wet areas, with aisle and safety marking laid into the system.',
      },
    ],
    scope: [
      'Diamond grinding or shot blasting to a sound, keyed substrate',
      'Moisture and adhesion testing before any product is opened',
      'Crack and joint repair, and re-profiling of falls where needed',
      'Priming, body coat and topcoat to the specified build thickness',
      'Coving to walls and plinths where hygiene requires it',
      'Line marking, hatching and safety demarcation',
      'Written cure times and a handover pack for the maintenance file',
    ],
    sectors: ['Healthcare', 'Industrial and warehousing', 'Retail and shopping centres'],
    buyerQuestion: 'Will this floor survive the traffic we actually have?',
  },
  {
    slug: 'waterproofing',
    name: 'Waterproofing',
    shortName: 'Waterproofing',
    flagship: true,
    media: 'waterproofing-torch-on',
    answer:
      'Dainamo Holdings carries out torch-on membrane waterproofing, liquid-applied systems, roof sealing and remedial repairs to flat roofs, parapets, gutters, balconies and podiums on commercial and residential buildings in Johannesburg.',
    lede: 'Water finds the cheapest detail on the building. Roofs rarely fail in the middle: they fail at the upstand, the outlet and the joint.',
    systems: [
      {
        name: 'Torch-on membrane',
        detail: 'Bituminous sheet bonded with a gas torch. The workhorse system for flat concrete roofs and podiums.',
      },
      {
        name: 'Liquid applied membrane',
        detail: 'Seamless and detail-friendly. Suits complex plant areas, gutters and roofs crowded with penetrations.',
      },
      {
        name: 'Parapet and upstand detailing',
        detail: 'Terminations, chases and flashings taken back into the structure rather than sealed at the surface.',
      },
      {
        name: 'Balcony and walkway systems',
        detail: 'Trafficable finishes over the membrane so residents can use the surface the day cure is complete.',
      },
    ],
    scope: [
      'Roof survey with photographs of every failed detail',
      'Strip out of failed membrane and disposal',
      'Substrate repair, screed correction and re-establishment of falls',
      'Primer, membrane and cap sheet to the specified system',
      'Full detailing at upstands, outlets, penetrations and movement joints',
      'Flood or spray testing before sign off',
      'Photographic record of the covered work for the building file',
    ],
    sectors: ['Residential complexes', 'Commercial offices', 'Retail and shopping centres'],
    buyerQuestion: 'Why did the last waterproofing job fail?',
  },
  {
    slug: 'damp-proofing',
    name: 'Damp proofing',
    shortName: 'Damp proofing',
    flagship: true,
    media: 'damp-proofing-injection',
    answer:
      'Dainamo Holdings diagnoses and treats rising damp, penetrating damp and condensation in Johannesburg buildings using injected damp-proof courses, tanking systems, remedial plaster and damp-resistant coatings, after identifying the actual source of the moisture.',
    lede: 'Damp is a symptom. Painting over it moves the problem six months down the line and takes the plaster with it.',
    systems: [
      {
        name: 'Injected damp-proof course',
        detail: 'Chemical DPC drilled and injected at the mortar course to stop moisture climbing the wall.',
      },
      {
        name: 'Tanking and negative-side systems',
        detail: 'Cementitious tanking for basements, lift pits, planters and retaining walls under water pressure.',
      },
      {
        name: 'Remedial replastering',
        detail: 'Salt-resistant render so residual salts cannot bloom back through the new finish.',
      },
      {
        name: 'Damp Prime and sealer coats',
        detail: 'Preparation coats on affected substrates so the decorative system has something stable to sit on.',
      },
    ],
    scope: [
      'Moisture readings and a written diagnosis of the source',
      'Hack off of contaminated plaster back to sound brickwork',
      'Injection or tanking to the agreed treatment line',
      'Salt-resistant render and skim',
      'Damp Prime and sealer to affected substrates',
      'Redecoration to match the surrounding finish',
    ],
    sectors: ['Residential complexes', 'Commercial offices', 'Healthcare'],
    buyerQuestion: 'Is this rising damp or a leak?',
  },
  {
    slug: 'maintenance-contracts',
    name: 'Maintenance contracts',
    shortName: 'Maintenance',
    flagship: true,
    media: 'maintenance-rooftop-plant',
    answer:
      'Dainamo Holdings holds planned and reactive building maintenance contracts for commercial, industrial and managed residential property in Gauteng, covering building fabric, plumbing, electrical, HVAC and specialist coatings under one accountable contractor.',
    lede: 'Most maintenance budgets are spent twice: once reacting to a failure, and again repairing what the failure damaged.',
    systems: [
      {
        name: 'Planned preventative schedule',
        detail: 'An agreed calendar of roof, gutter, coating and plant inspections, priced for the year.',
      },
      {
        name: 'Reactive call outs',
        detail: 'One number for the fabric trades, with response times set in the contract rather than in the moment.',
      },
      {
        name: 'Condition reporting',
        detail: 'Photographed findings, ranked by urgency, so the trustees or the board can approve spend with evidence.',
      },
      {
        name: 'Multi-trade cover',
        detail: 'Plumbing, electrical, HVAC, solar, ceilings, partitions and paint under a single contract.',
      },
    ],
    scope: [
      'Baseline condition survey of the site',
      'A schedule of planned visits with fixed scope per visit',
      'Agreed response times for reactive work',
      'Photographic reports after every attendance',
      'A rolling register of defects with priorities and estimates',
      'Annual review of the schedule against what actually failed',
    ],
    sectors: ['Retail and shopping centres', 'Residential complexes', 'Industrial and warehousing'],
    buyerQuestion: 'Can one contractor carry the whole building?',
  },
  {
    slug: 'protective-and-industrial-coatings',
    name: 'Protective and industrial coatings',
    shortName: 'Protective coatings',
    flagship: false,
    media: 'hero-facade',
    answer:
      'Dainamo Holdings applies protective and decorative coating systems to exterior facades, structural steel, plant rooms and industrial surfaces in Johannesburg, using airless spray application for a uniform finish over large areas.',
    lede: 'On a large elevation the finish is decided by the preparation and the application method, long before anyone opens a tin.',
    systems: [
      {
        name: 'Exterior facade systems',
        detail: 'Primer, membrane and topcoat build-ups selected for the substrate and the exposure.',
      },
      {
        name: 'Airless spray application',
        detail: 'Even film build across large elevations, with a smoother finish than roller work can reach.',
      },
      {
        name: 'Structural steel protection',
        detail: 'Preparation, primer and finish coats for exposed steelwork, balustrades and plant.',
      },
      {
        name: 'Specialised coating systems',
        detail: 'Newer protective products where the substrate or the environment rules out conventional paint.',
      },
    ],
    scope: [
      'Access design, scaffolding or rope access',
      'Pressure washing and removal of loose and flaking material',
      'Crack repair, patching and substrate stabilisation',
      'Priming and specified coat build',
      'Cutting in to frames, gutters, balustrades and doors',
      'Daily site cleaning and rubble removal',
      'Final inspection and touch up',
    ],
    sectors: ['Commercial offices', 'Residential complexes', 'Industrial and warehousing'],
    buyerQuestion: 'How do we get an even finish across a whole elevation?',
  },
  {
    slug: 'thermoplastic-line-marking',
    name: 'Thermoplastic and outdoor works',
    shortName: 'Line marking',
    flagship: false,
    media: 'coatings-warehouse-floor',
    answer:
      'Dainamo Holdings lays thermoplastic road marking, parking bay demarcation, directional arrows and playground surfacing for shopping centres, business parks, schools and industrial sites in Gauteng.',
    lede: 'Demarcation is the cheapest safety control on a site, and the first thing an insurer looks for after an incident.',
    systems: [
      {
        name: 'Thermoplastic road marking',
        detail: 'Hot-applied and long lasting for entrances, aisles and traffic circles.',
      },
      {
        name: 'Parking and bay demarcation',
        detail: 'Bays, numbering, accessible bays and directional arrows set out to the site layout.',
      },
      {
        name: 'Warehouse floor demarcation',
        detail: 'Aisle, racking, walkway and hazard marking laid into or onto the floor system.',
      },
      {
        name: 'Playground surfacing',
        detail: 'Impact surfacing and installation for school and complex play areas.',
      },
    ],
    scope: [
      'Set out and client sign off before any material is laid',
      'Surface cleaning and priming',
      'Application of thermoplastic or cold-applied marking',
      'Bay numbering and signage where included',
      'Traffic management during the works',
    ],
    sectors: ['Retail and shopping centres', 'Industrial and warehousing', 'Commercial offices'],
    buyerQuestion: 'Can this be done without closing the parking?',
  },
]

export const flagshipCapabilities = capabilities.filter((item) => item.flagship)

export const supportingTrades = [
  {
    name: 'Plumbing',
    detail: 'Full installations, repairs and maintenance, pipework, valves and fittings.',
  },
  {
    name: 'Electrical',
    detail: 'Installations, fault finding, repairs, maintenance and upgrades.',
  },
  {
    name: 'Solar and backup power',
    detail: 'Solar installations, backup and energy solutions, servicing.',
  },
  {
    name: 'HVAC',
    detail: 'Air conditioning installation, servicing and maintenance.',
  },
  {
    name: 'Interior finishes',
    detail: 'Skimming, plastering, ceilings, drywall partitioning, painting and spray painting.',
  },
  {
    name: 'Architecture and construction',
    detail: 'Design and planning, new build, renovations and structural improvements.',
  },
]
