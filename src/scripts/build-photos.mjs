/**
 * Site photography pipeline.
 *
 * One curated library. Real Dainamo site photographs (references/Client
 * Pictures) carry every claim about the work. Generated environment images
 * (references/generated) are used only to set the scene for a sector or a page
 * and are never captioned as a Dainamo project.
 *
 * Each source is auto-rotated, lightly corrected, cropped to its focal area when
 * asked, then written as AVIF and WebP at the widths the layout needs, with a
 * tiny inline placeholder so no slot collapses while the bytes arrive.
 *
 *   node src/scripts/build-photos.mjs [key ...]
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const CLIENT = 'references/Client Pictures'
const GENERATED = 'references/generated'
/** Upscaled versions of site photographs. Same content, cleaner detail. When a
    file here matches a source's basename it is used in place of the original. */
const ENHANCED = 'references/enhanced'
const OUT = path.resolve('public/media/photos')
const MANIFEST = path.resolve('src/lib/photos.json')

const WIDTHS = [640, 1024, 1600, 2400]

/** `kind: 'site'` is a real Dainamo photograph, `kind: 'scene'` is generated. */
const SOURCES = [
  // Resin flooring
  { key: 'epoxy-pour', kind: 'site', file: `${CLIENT}/epoxy/epoxy-21.jpeg` },
  { key: 'epoxy-pour-wide', kind: 'site', file: `${CLIENT}/epoxy/epoxy-20.jpeg` },
  { key: 'epoxy-prime', kind: 'site', file: `${CLIENT}/epoxy/epoxy-18.jpeg` },
  { key: 'epoxy-open-plan', kind: 'site', file: `${CLIENT}/epoxy/epoxy-19.jpeg` },
  { key: 'epoxy-corridor', kind: 'site', file: `${CLIENT}/epoxy/epoxy-04.jpeg` },
  { key: 'epoxy-gloss', kind: 'site', file: `${CLIENT}/epoxy/epoxy-05.jpeg` },
  { key: 'epoxy-entrance', kind: 'site', file: `${CLIENT}/epoxy/epoxy-06.jpeg` },
  { key: 'epoxy-flake', kind: 'site', file: `${CLIENT}/epoxy/epoxy-22.jpeg` },
  { key: 'epoxy-flake-detail', kind: 'site', file: `${CLIENT}/epoxy/epoxy-23.jpeg` },
  { key: 'epoxy-home', kind: 'site', file: `${CLIENT}/epoxy/epoxy-24.jpeg` },
  { key: 'epoxy-court', kind: 'site', file: `${CLIENT}/epoxy/epoxy-09.jpeg` },
  { key: 'epoxy-first-coat', kind: 'site', file: `${CLIENT}/epoxy/epoxy-10.jpeg` },
  { key: 'epoxy-level', kind: 'site', file: `${CLIENT}/epoxy/epoxy-13.jpeg` },
  { key: 'epoxy-studio', kind: 'site', file: `${CLIENT}/epoxy/epoxy-11.jpeg` },
  { key: 'epoxy-studio-finished', kind: 'site', file: `${CLIENT}/epoxy/epoxy-02.jpeg` },
  { key: 'epoxy-screed', kind: 'site', file: `${CLIENT}/epoxy/epoxy-16.jpeg` },

  // Waterproofing and roofs
  { key: 'roof-membrane', kind: 'site', file: `${CLIENT}/waterproofing-flat-roof-floor-grinding-joint-sealant/waterproofing-flat-roof-floor-grinding-joint-sealant-06.jpeg` },
  { key: 'roof-membrane-wide', kind: 'site', file: `${CLIENT}/waterproofing-flat-roof-floor-grinding-joint-sealant/waterproofing-flat-roof-floor-grinding-joint-sealant-05.jpeg` },
  { key: 'roof-membrane-edge', kind: 'site', file: `${CLIENT}/waterproofing-flat-roof-floor-grinding-joint-sealant/waterproofing-flat-roof-floor-grinding-joint-sealant-09.jpeg` },
  { key: 'roof-product', kind: 'site', file: `${CLIENT}/waterproofing-flat-roof-floor-grinding-joint-sealant/waterproofing-flat-roof-floor-grinding-joint-sealant-07.jpeg` },
  { key: 'roof-ridge-blue', kind: 'site', file: `${CLIENT}/roof-maintenance/roof-maintenance-04.jpeg` },
  { key: 'roof-ridge-line', kind: 'site', file: `${CLIENT}/roof-maintenance/roof-maintenance-09.jpeg` },
  { key: 'roof-ridge-crew', kind: 'site', file: `${CLIENT}/roof-maintenance/roof-maintenance-03.jpeg` },
  { key: 'roof-ridge-repair', kind: 'site', file: `${CLIENT}/roof-maintenance/roof-maintenance-01.jpeg` },
  { key: 'roof-solar', kind: 'site', file: `${CLIENT}/roof-maintenance/roof-maintenance-06.jpeg` },

  // Floors, joints and repairs
  { key: 'grinding-warehouse', kind: 'site', file: `${CLIENT}/waterproofing-flat-roof-floor-grinding-joint-sealant/waterproofing-flat-roof-floor-grinding-joint-sealant-03.jpeg` },
  { key: 'grinding-aisle', kind: 'site', file: `${CLIENT}/waterproofing-flat-roof-floor-grinding-joint-sealant/waterproofing-flat-roof-floor-grinding-joint-sealant-14.jpeg` },
  { key: 'joint-sealant', kind: 'site', file: `${CLIENT}/waterproofing-flat-roof-floor-grinding-joint-sealant/waterproofing-flat-roof-floor-grinding-joint-sealant-11.jpeg` },
  { key: 'joint-spalled', kind: 'site', file: `${CLIENT}/pothole-repairs/pothole-repairs-06.jpeg` },
  { key: 'joint-repair', kind: 'site', file: `${CLIENT}/pothole-repairs/pothole-repairs-02.jpeg` },
  { key: 'joint-damage', kind: 'site', file: `${CLIENT}/pothole-repairs/pothole-repairs-04.jpeg` },
  { key: 'joint-aisle', kind: 'site', file: `${CLIENT}/pothole-repairs/pothole-repairs-05.jpeg` },
  { key: 'joint-patched', kind: 'site', file: `${CLIENT}/pothole-repairs/pothole-repairs-03.jpeg` },

  // Walls, damp and interiors
  { key: 'wall-injection', kind: 'site', file: `${CLIENT}/floor-grinding-decor-plaster/floor-grinding-decor-plaster-02.jpeg` },
  { key: 'wall-crew', kind: 'site', file: `${CLIENT}/floor-grinding-decor-plaster/floor-grinding-decor-plaster-01.jpeg` },
  { key: 'floor-grinder', kind: 'site', file: `${CLIENT}/floor-grinding-decor-plaster/floor-grinding-decor-plaster-03.jpeg` },
  { key: 'partition-frame', kind: 'site', file: `${CLIENT}/dry-walling/dry-walling-04.jpeg` },
  { key: 'partition-mezzanine', kind: 'site', file: `${CLIENT}/dry-walling/dry-walling-05.jpeg` },

  // Thermoplastic and outdoor
  { key: 'thermo-footprints', kind: 'site', file: `${CLIENT}/thermoplastic/thermoplastic-16.jpeg` },
  { key: 'thermo-footprints-close', kind: 'site', file: `${CLIENT}/thermoplastic/thermoplastic-07.jpeg` },
  { key: 'thermo-numbers', kind: 'site', file: `${CLIENT}/thermoplastic/thermoplastic-02.jpeg` },
  { key: 'thermo-crest', kind: 'site', file: `${CLIENT}/thermoplastic/thermoplastic-12.jpeg` },
  { key: 'thermo-crossing', kind: 'site', file: `${CLIENT}/thermoplastic/thermoplastic-20.jpeg` },
  { key: 'thermo-snake', kind: 'site', file: `${CLIENT}/thermoplastic/thermoplastic-06.jpeg` },
  { key: 'thermo-piano', kind: 'site', file: `${CLIENT}/thermoplastic/thermoplastic-13.jpeg` },
  { key: 'thermo-rainbow', kind: 'site', file: `${CLIENT}/thermoplastic/thermoplastic-21.jpeg` },
  { key: 'thermo-shapes', kind: 'site', file: `${CLIENT}/thermoplastic/thermoplastic-17.jpeg` },
  { key: 'thermo-crossing-sign', kind: 'site', file: `${CLIENT}/thermoplastic/thermoplastic-04.jpeg` },

  // Generated scene setting, never presented as Dainamo work
  { key: 'sector-shopping-centre', kind: 'scene', file: `${GENERATED}/sector-shopping-centre.png` },
  { key: 'sector-healthcare', kind: 'scene', file: `${GENERATED}/sector-healthcare.png` },
  { key: 'sector-industrial', kind: 'scene', file: `${GENERATED}/sector-industrial.png` },
  { key: 'sector-residential', kind: 'scene', file: `${GENERATED}/sector-residential.png` },
  { key: 'sector-commercial', kind: 'scene', file: `${GENERATED}/sector-commercial.png` },
  { key: 'scene-spray', kind: 'scene', file: `${GENERATED}/coatings-spray.png` },
  { key: 'scene-skyline', kind: 'scene', file: `${GENERATED}/joburg-skyline.png` },
  { key: 'scene-inspection', kind: 'scene', file: `${GENERATED}/site-inspection.png` },
]

function pipeline(file, kind, enhanced) {
  let image = sharp(file).rotate()
  // Phone photographs from site come in flat and slightly soft. Stretch the
  // tonal range a touch and sharpen once. Upscaled files are already crisp, and
  // generated frames are already graded.
  if (kind === 'site') {
    image = image.normalize({ lower: 1, upper: 99.5 }).modulate({ saturation: 1.03 })
    if (!enhanced) image = image.sharpen({ sigma: 0.6, m1: 0.6, m2: 1.8 })
  }
  return image
}

async function resolveSource(source) {
  const candidate = path.join(ENHANCED, `${path.parse(source.file).name}.jpg`)
  try {
    await fs.access(candidate)
    return { ...source, file: candidate, enhanced: true }
  } catch {
    return { ...source, enhanced: false }
  }
}

async function build(original) {
  const source = await resolveSource(original)
  const meta = await sharp(source.file).rotate().metadata()
  // metadata() reports pre-rotation dimensions, so swap for EXIF orientations 5 to 8.
  const rotated = (meta.orientation ?? 1) >= 5
  const width = rotated ? meta.height : meta.width
  const height = rotated ? meta.width : meta.height

  const widths = WIDTHS.filter((candidate) => candidate <= width)
  const largest = Math.min(width, WIDTHS[WIDTHS.length - 1])
  if (widths.length === 0 || widths[widths.length - 1] < largest * 0.9) widths.push(largest)

  for (const target of widths) {
    const resized = () => pipeline(source.file, source.kind, source.enhanced).resize({ width: target, withoutEnlargement: true })
    await resized().avif({ quality: 56, effort: 5 }).toFile(path.join(OUT, `${source.key}-${target}.avif`))
    await resized().webp({ quality: 80, effort: 5 }).toFile(path.join(OUT, `${source.key}-${target}.webp`))
  }

  const blur = await pipeline(source.file, source.kind, source.enhanced).resize({ width: 20 }).webp({ quality: 40 }).toBuffer()

  return {
    kind: source.kind,
    enhanced: source.enhanced,
    widths,
    aspect: Number((width / height).toFixed(4)),
    blur: `data:image/webp;base64,${blur.toString('base64')}`,
  }
}

async function run() {
  await fs.mkdir(OUT, { recursive: true })
  const only = process.argv.slice(2)
  let manifest = {}
  try {
    manifest = JSON.parse(await fs.readFile(MANIFEST, 'utf8'))
  } catch {
    /* first run */
  }

  for (const source of SOURCES) {
    if (only.length && !only.includes(source.key)) continue
    manifest[source.key] = await build(source)
    console.log(`${source.key.padEnd(26)} ${manifest[source.key].widths.join(', ')}${manifest[source.key].enhanced ? '  (enhanced)' : ''}`)
  }

  const ordered = Object.fromEntries(SOURCES.filter((s) => manifest[s.key]).map((s) => [s.key, manifest[s.key]]))
  await fs.writeFile(MANIFEST, `${JSON.stringify(ordered, null, 2)}\n`)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
