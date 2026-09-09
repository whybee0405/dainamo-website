import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = path.resolve('references/Client Pictures')
const OUT = path.resolve('public/media/client')
const MANIFEST = path.resolve('src/lib/client-media.json')

const CATEGORY_LABELS = {
  'dry-walling': 'Dry walling',
  epoxy: 'Epoxy flooring',
  'floor-grinding-decor-plaster': 'Floor grinding and decorative plaster',
  'pothole-repairs': 'Pothole repairs',
  'roof-maintenance': 'Roof maintenance',
  thermoplastic: 'Thermoplastic and outdoor works',
  'waterproofing-flat-roof-floor-grinding-joint-sealant':
    'Waterproofing, floor grinding and joint sealant',
}

const WIDTHS = [480, 1200]

function titleCase(slug) {
  return slug
    .split('-')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ')
}

async function processImage(sourcePath, destinationPath, width, format) {
  const image = sharp(sourcePath)
    .rotate()
    .normalize({ lower: 1, upper: 99 })
    .modulate({ saturation: 1.04 })
    .sharpen({ sigma: 0.65, m1: 0.7, m2: 2 })
    .resize({ width, withoutEnlargement: true })

  if (format === 'avif') {
    await image.avif({ quality: 58, effort: 6 }).toFile(destinationPath)
    return
  }

  await image.webp({ quality: 82, effort: 5 }).toFile(destinationPath)
}

async function run() {
  await fs.mkdir(OUT, { recursive: true })
  const manifest = {}
  const categoryNames = Object.keys(CATEGORY_LABELS)

  for (const category of categoryNames) {
    const sourceDir = path.join(ROOT, category)
    const outputDir = path.join(OUT, category)
    await fs.mkdir(outputDir, { recursive: true })

    const files = (await fs.readdir(sourceDir))
      .filter((file) => /\.jpe?g$/i.test(file))
      .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }))

    const images = []
    for (const file of files) {
      const sourcePath = path.join(sourceDir, file)
      const slug = path.parse(file).name.toLowerCase()
      const metadata = await sharp(sourcePath).metadata()
      const width = metadata.width ?? 1
      const height = metadata.height ?? 1

      const widths = []
      for (const requestedWidth of WIDTHS) {
        if (requestedWidth > width) continue
        widths.push(requestedWidth)
        await processImage(
          sourcePath,
          path.join(outputDir, `${slug}-${requestedWidth}.avif`),
          requestedWidth,
          'avif',
        )
        await processImage(
          sourcePath,
          path.join(outputDir, `${slug}-${requestedWidth}.webp`),
          requestedWidth,
          'webp',
        )
      }

      images.push({
        slug,
        source: file,
        category,
        label: CATEGORY_LABELS[category],
        alt: `${CATEGORY_LABELS[category]} work by Dainamo Holdings`,
        aspect: Number((width / height).toFixed(4)),
        widths,
      })
    }

    manifest[category] = {
      label: CATEGORY_LABELS[category],
      images,
    }
  }

  await fs.writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`)
  console.log(`Processed ${Object.values(manifest).reduce((total, group) => total + group.images.length, 0)} client photographs.`)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})