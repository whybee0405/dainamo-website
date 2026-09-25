import type { PhotoKey } from '../components/media/Frame'

/**
 * Captions for the site photographs.
 *
 * Every caption describes what is visible in the frame and nothing more: no
 * client names, no addresses and no claims the photograph cannot support.
 */
export type SitePhoto = {
  key: PhotoKey
  caption: string
  alt: string
}

export type WorkGroup = {
  id: string
  label: string
  capability?: string
  photos: SitePhoto[]
}

export const workGroups: WorkGroup[] = [
  {
    id: 'resin-flooring',
    label: 'Resin flooring',
    capability: 'epoxy-and-resin-flooring',
    photos: [
      {
        key: 'epoxy-pour',
        caption: 'Self-levelling epoxy being spread across a commercial floor plate',
        alt: 'A Dainamo applicator spreading grey self-levelling epoxy across a primed concrete floor, the wet edge reflecting the windows',
      },
      {
        key: 'epoxy-corridor',
        caption: 'Finished gloss epoxy in a ground-floor commercial unit',
        alt: 'A long commercial unit with a finished light grey gloss epoxy floor, face brick walls and downlights reflecting in the surface',
      },
      {
        key: 'epoxy-pour-wide',
        caption: 'Body coat going down in an open-plan office shell',
        alt: 'Applicator working epoxy body coat across an open-plan office floor with exposed services overhead',
      },
      {
        key: 'epoxy-entrance',
        caption: 'Entrance threshold after the topcoat has cured',
        alt: 'Steel-framed double doors opening onto a newly finished gloss epoxy floor',
      },
      {
        key: 'epoxy-prime',
        caption: 'Priming a large floor plate, product staged by bay',
        alt: 'Open-plan floor being primed, with tins of product set out in a grid across the slab',
      },
      {
        key: 'epoxy-flake',
        caption: 'Decorative flake system laid up to a sliding door track',
        alt: 'Grey and black decorative flake epoxy floor finished neatly up to an aluminium sliding door track',
      },
      {
        key: 'epoxy-flake-detail',
        caption: 'Flake broadcast, close up before the clear seal',
        alt: 'Close-up of a grey, white and black flake broadcast resin floor',
      },
      {
        key: 'epoxy-gloss',
        caption: 'Gloss finish, ready for handover',
        alt: 'Mirror-like gloss epoxy floor reflecting ceiling lights in an empty unit',
      },
      {
        key: 'epoxy-level',
        caption: 'Levelling the body coat to the specified build',
        alt: 'Applicator in blue overalls working a light grey epoxy coat over a darker primed floor',
      },
      {
        key: 'epoxy-first-coat',
        caption: 'First coat going down against the glazing line',
        alt: 'Applicator in a high visibility vest kneeling to apply epoxy along a glazed wall',
      },
      {
        key: 'epoxy-studio',
        caption: 'Residential studio floor, walls masked and protected',
        alt: 'Applicator finishing an epoxy floor in a residential room with walls and fittings covered in plastic',
      },
      {
        key: 'epoxy-court',
        caption: 'Sports court resurfaced and lined',
        alt: 'Outdoor sports court with a green playing surface, red surround and white court lines',
      },
      {
        key: 'epoxy-home',
        caption: 'Gloss floor in a residential living space',
        alt: 'Two applicators finishing a white gloss floor in an open-plan residential living area',
      },
    ],
  },
  {
    id: 'waterproofing',
    label: 'Waterproofing and roofs',
    capability: 'waterproofing',
    photos: [
      {
        key: 'roof-membrane',
        caption: 'Liquid rubber membrane on a flat residential roof',
        alt: 'Flat concrete roof finished in a continuous grey liquid rubber waterproofing membrane, with a tiled roof beyond',
      },
      {
        key: 'roof-membrane-wide',
        caption: 'Membrane taken up the parapets and around the chimneys',
        alt: 'Grey waterproofing membrane covering a flat roof and turned up the parapet walls and chimney bases',
      },
      {
        key: 'roof-membrane-edge',
        caption: 'Parapet upstand detailed into the roof field',
        alt: 'Grey waterproofed flat roof with the membrane dressed up the edge upstand',
      },
      {
        key: 'roof-product',
        caption: 'Liquid rubber waterproofing product on the roof',
        alt: 'Twenty litre drum of liquid rubber waterproofing product standing on a coated roof',
      },
      {
        key: 'roof-ridge-blue',
        caption: 'Ridge and hip cappings sealed on a pitched tile roof',
        alt: 'Blue sealant coating applied over the ridge and hip cappings of a concrete tile roof',
      },
      {
        key: 'roof-ridge-line',
        caption: 'Ridge line sealed alongside a solar array',
        alt: 'Freshly sealed blue ridge line on a pitched roof next to solar panels',
      },
      {
        key: 'roof-ridge-crew',
        caption: 'Sealing ridge cappings from the roof',
        alt: 'Roofer sealing ridge tiles on a pitched roof above a modern house',
      },
      {
        key: 'roof-ridge-repair',
        caption: 'Ridge cappings re-bedded and pointed',
        alt: 'Close-up of re-bedded and pointed ridge cappings on a light concrete tile roof',
      },
      {
        key: 'roof-solar',
        caption: 'Roof inspected and resealed around a solar installation',
        alt: 'Pitched roof with solar panels and a long resealed ridge line',
      },
    ],
  },
  {
    id: 'floors-and-joints',
    label: 'Floor preparation and repairs',
    capability: 'epoxy-and-resin-flooring',
    photos: [
      {
        key: 'grinding-warehouse',
        caption: 'Diamond grinding in a live warehouse aisle',
        alt: 'Operator in a high visibility vest diamond grinding a warehouse floor between yellow aisle lines',
      },
      {
        key: 'grinding-aisle',
        caption: 'Grinding back to a sound, keyed substrate',
        alt: 'Floor grinder working along a warehouse aisle with racking and a taped exclusion zone',
      },
      {
        key: 'joint-damage',
        caption: 'Spalled construction joint before repair',
        alt: 'Broken and spalled concrete at a construction joint in a warehouse floor',
      },
      {
        key: 'joint-repair',
        caption: 'Joint arrises cut back, masked and filled',
        alt: 'Masked-out joint repair filled with dark repair mortar where two floor slabs meet',
      },
      {
        key: 'joint-patched',
        caption: 'Joint repair finished flush to the slab',
        alt: 'Repaired floor joint finished smooth and flush with the surrounding concrete',
      },
      {
        key: 'joint-aisle',
        caption: 'Aisle barriered off while repairs cure',
        alt: 'Warehouse aisle closed with barrier tape while a floor repair cures',
      },
      {
        key: 'joint-sealant',
        caption: 'Joint sealant masked and applied',
        alt: 'Floor joints masked with yellow tape ready for sealant',
      },
      {
        key: 'floor-grinder',
        caption: 'Slab preparation before decorative plaster and coatings',
        alt: 'Floor grinder and tins of product on a prepared concrete slab',
      },
    ],
  },
  {
    id: 'damp-and-walls',
    label: 'Damp proofing and walls',
    capability: 'damp-proofing',
    photos: [
      {
        key: 'wall-injection',
        caption: 'Injection holes drilled along the base of a boundary wall',
        alt: 'Freshly plastered boundary wall with a line of damp-proof injection holes drilled along its base',
      },
      {
        key: 'wall-crew',
        caption: 'Remedial plastering from a scaffold',
        alt: 'Three workers replastering a long boundary wall from a scaffold on a sunny day',
      },
      {
        key: 'partition-frame',
        caption: 'Drywall partition framing in an open office shell',
        alt: 'Steel stud partition framing being set out in a large open office space',
      },
      {
        key: 'partition-mezzanine',
        caption: 'Framing to a mezzanine edge',
        alt: 'Steel partition framing installed along a mezzanine balustrade beside a face brick wall',
      },
    ],
  },
  {
    id: 'line-marking',
    label: 'Line marking and play surfaces',
    capability: 'thermoplastic-line-marking',
    photos: [
      {
        key: 'thermo-footprints',
        caption: 'Thermoplastic activity markings on a polished floor',
        alt: 'Green, pink and blue thermoplastic footprint and letter markings laid on a dark polished floor',
      },
      {
        key: 'thermo-crossing',
        caption: 'Painted crossing laid with the road closed',
        alt: 'Crew in orange high visibility clothing laying a decorative painted pedestrian crossing',
      },
      {
        key: 'thermo-numbers',
        caption: 'Number grid laid on an indoor floor',
        alt: 'Brightly coloured number grid marked out on a light grey indoor floor',
      },
      {
        key: 'thermo-crest',
        caption: 'School crest laid in thermoplastic on paving',
        alt: 'Large school crest in red, yellow and navy thermoplastic on brick paving',
      },
      {
        key: 'thermo-snake',
        caption: 'Snakes and ladders on a school forecourt',
        alt: 'Snakes and ladders game marked in thermoplastic on an asphalt school forecourt',
      },
      {
        key: 'thermo-rainbow',
        caption: 'Measured sprint track on a warehouse floor',
        alt: 'Rainbow striped sprint track with distance markings on a dark polished floor',
      },
      {
        key: 'thermo-piano',
        caption: 'Floor markings laid between warehouse racking',
        alt: 'Red, white and black striped floor marking laid in a warehouse aisle',
      },
      {
        key: 'thermo-shapes',
        caption: 'Shape markings for a learning area',
        alt: 'Yellow star, pink oval, green square and red line markings on a dark floor',
      },
      {
        key: 'thermo-crossing-sign',
        caption: 'Children crossing symbol on a driveway',
        alt: 'Red and white children crossing warning triangle marked on a grey surface',
      },
    ],
  },
]

export const allSitePhotos = workGroups.flatMap((group) => group.photos)

export function sitePhoto(key: PhotoKey) {
  return allSitePhotos.find((photo) => photo.key === key)
}

/** Photographs shown on each capability page, in order. */
export const capabilityPhotos: Record<string, PhotoKey[]> = {
  'epoxy-and-resin-flooring': ['epoxy-corridor', 'epoxy-pour-wide', 'epoxy-flake', 'grinding-warehouse', 'epoxy-entrance', 'joint-repair'],
  waterproofing: ['roof-membrane-wide', 'roof-ridge-blue', 'roof-membrane-edge', 'roof-product', 'roof-ridge-crew', 'roof-ridge-line'],
  'damp-proofing': ['wall-injection', 'wall-crew', 'floor-grinder'],
  'maintenance-contracts': ['roof-ridge-repair', 'joint-damage', 'joint-patched', 'roof-solar', 'partition-frame', 'grinding-aisle'],
  'protective-and-industrial-coatings': ['roof-membrane', 'wall-crew', 'epoxy-court'],
  'thermoplastic-line-marking': ['thermo-crossing', 'thermo-footprints', 'thermo-crest', 'thermo-snake', 'thermo-rainbow', 'thermo-numbers'],
}

/** The lead image for each capability, used on cards and page heads. */
export const capabilityCover: Record<string, PhotoKey> = {
  'epoxy-and-resin-flooring': 'epoxy-pour-wide',
  waterproofing: 'roof-membrane',
  'damp-proofing': 'wall-injection',
  'maintenance-contracts': 'roof-ridge-blue',
  'protective-and-industrial-coatings': 'scene-spray',
  'thermoplastic-line-marking': 'thermo-footprints',
}

/**
 * Before and after pairs. Each pair is two photographs of the same spot on the
 * same job, taken before and after the work. Framing differs slightly between
 * shots, so each layer carries its own crop to line the subject up.
 */
export type BeforeAfterPair = {
  id: string
  title: string
  discipline: string
  detail: string
  before: { key: PhotoKey; alt: string; position?: string; zoom?: number }
  after: { key: PhotoKey; alt: string; position?: string; zoom?: number }
}

export const beforeAfterPairs: BeforeAfterPair[] = [
  {
    id: 'warehouse-joint',
    title: 'Warehouse floor joint',
    discipline: 'Floor repairs',
    detail:
      'A spalled construction joint in a working warehouse. Broken arrises were cut back to sound concrete, filled with repair mortar and finished flush with the slab, so forklifts run over it without a bump.',
    before: {
      key: 'joint-spalled',
      alt: 'Before: a warehouse floor joint with broken, spalled concrete along both arms of the cross joint',
      position: '50% 50%',
    },
    after: {
      key: 'joint-patched',
      alt: 'After: the same floor joint repaired and finished flush with the surrounding slab',
      position: '48% 45%',
      zoom: 1.8,
    },
  },
  {
    id: 'residential-resin',
    title: 'Residential resin floor',
    discipline: 'Resin flooring',
    detail:
      'The first coat going on over the primed slab, and the same corner once the floor was finished. Walls and joinery stayed sheeted in plastic until the resin had cured.',
    before: {
      key: 'epoxy-studio',
      alt: 'Before: a dark primed concrete floor with the first pale resin coat being rolled on, beside a wall with a switch plate',
      position: '15% 60%',
      zoom: 1.2,
    },
    after: {
      key: 'epoxy-studio-finished',
      alt: 'After: the same corner with the switch plate, now with a finished pale gloss resin floor',
      position: '30% 55%',
      zoom: 1.1,
    },
  },
]
