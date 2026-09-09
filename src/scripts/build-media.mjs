/**
 * Site photography pipeline.
 *
 * Downloads each source frame, trims the flat matte border the generator leaves
 * around some images, then writes AVIF and WebP at the widths the layout asks
 * for plus a tiny blurred placeholder so no image slot collapses on load.
 *
 *   node src/scripts/build-media.mjs [key ...]
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_3F5cKLIW1l6HzDa6OOLSOG7ciXY'
const OUT = path.resolve('public/media')
const MANIFEST = path.resolve('src/lib/media-manifest.json')

const SOURCES = [
  { key: 'hero-facade', file: 'hf_20260905_082816_7f712dcc-13e1-4709-aacb-707e7727e22b.png', widths: [960, 1600, 2400] },
  { key: 'epoxy-hospital-corridor', file: 'hf_20260905_082852_f5cad58c-ba8f-46b0-adfe-57ced813c0b9.png', widths: [720, 1200, 1800] },
  { key: 'waterproofing-torch-on', file: 'hf_20260905_082851_ab7a927d-aa6c-48a9-9977-3ba41bc73a1c.png', widths: [720, 1200, 1800] },
  { key: 'coatings-warehouse-floor', file: 'hf_20260905_082852_3cb95563-f13a-4125-942e-1c6edb008bc2.png', widths: [720, 1200, 1800] },
  { key: 'damp-proofing-injection', file: 'hf_20260905_083150_b611d046-23e8-4047-9018-d787c7279ab9.png', widths: [720, 1200] },
  { key: 'maintenance-rooftop-plant', file: 'hf_20260905_082852_b2f6347d-d0c4-4257-b776-1c166e04892e.png', widths: [720, 1200] },
  { key: 'sector-shopping-centre', file: 'hf_20260905_082852_985edfe0-b304-4489-8268-ccde1bbbfe8a.png', widths: [640, 1100] },
  { key: 'sector-healthcare', file: 'hf_20260905_083708_7fe1bebe-213f-47ce-9d9c-353b2344bae4.png', widths: [640, 1100] },
  { key: 'sector-industrial', file: 'hf_20260905_082851_289f511e-10c0-49f0-9504-1694a22c4a8e.png', widths: [640, 1100] },
  { key: 'sector-residential', file: 'hf_20260905_083150_02021b58-eb08-439b-b022-9dc142e1abcb.png', widths: [640, 1100] },
  { key: 'sector-commercial', file: 'hf_20260905_082851_048a4a13-6646-4702-b4e3-3f14794377b3.png', widths: [640, 1100] },
  { key: 'case-before', file: 'hf_20260905_082852_bd382760-a8ee-4c3f-87e6-7c4228bec043.png', widths: [900, 1600] },
  { key: 'case-after', file: 'hf_20260905_083151_31caf799-2fdf-402d-ada0-45db35c61132.png', widths: [900, 1600] },
]

/**
 * The generator sometimes returns the photograph inside a flat white matte.
 * sharp's trim keys off the corner pixel, so it removes the matte and leaves
 * genuinely full-bleed frames untouched.
 */
async function trimMatte(buffer) {
  try {
    const trimmed = await sharp(buffer).trim({ threshold: 14 }).toBuffer({ resolveWithObject: true })
    const original = await sharp(buffer).metadata()
    const shrank =
      trimmed.info.width < (original.width ?? 0) || trimmed.info.height < (original.height ?? 0)
    // Guard against a trim that eats the picture because the photo itself is
    // low contrast at the edges.
    const sane =
      trimmed.info.width > (original.width ?? 0) * 0.55 &&
      trimmed.info.height > (original.height ?? 0) * 0.55
    if (shrank && sane) {
      console.log(
        `  trimmed ${original.width}x${original.height} -> ${trimmed.info.width}x${trimmed.info.height}`,
      )
      return trimmed.data
    }
  } catch {
    /* trim throws when there is nothing to remove */
  }
  return buffer
}

async function run() {
  const only = process.argv.slice(2)
  const targets = only.length ? SOURCES.filter((s) => only.includes(s.key)) : SOURCES

  await fs.mkdir(OUT, { recursive: true })
  let manifest = {}
  try {
    manifest = JSON.parse(await fs.readFile(MANIFEST, 'utf8'))
  } catch {
    /* first run */
  }

  for (const source of targets) {
    console.log(source.key)
    const response = await fetch(`${CDN}/${source.file}`)
    if (!response.ok) throw new Error(`${response.status} for ${source.key}`)
    const raw = await trimMatte(Buffer.from(await response.arrayBuffer()))
    const meta = await sharp(raw).metadata()

    const widths = []
    for (const width of source.widths) {
      if (meta.width && width > meta.width) continue
      const resized = sharp(raw).resize({ width, withoutEnlargement: true })
      await resized.clone().avif({ quality: 58, effort: 6 }).toFile(path.join(OUT, `${source.key}-${width}.avif`))
      await resized.clone().webp({ quality: 78 }).toFile(path.join(OUT, `${source.key}-${width}.webp`))
      widths.push(width)
    }

    const lqip = await sharp(raw).resize({ width: 20 }).blur(1.2).webp({ quality: 40 }).toBuffer()

    manifest[source.key] = {
      widths,
      aspect: meta.width && meta.height ? Number((meta.width / meta.height).toFixed(4)) : 1.5,
      blur: `data:image/webp;base64,${lqip.toString('base64')}`,
    }
    console.log(`  ${meta.width}x${meta.height} -> ${widths.join(', ')}`)
  }

  const ordered = {}
  for (const source of SOURCES) if (manifest[source.key]) ordered[source.key] = manifest[source.key]
  await fs.writeFile(MANIFEST, `${JSON.stringify(ordered, null, 2)}\n`)
  console.log('\nmanifest written')
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
