/**
 * Seeds the content studio so the owner opens it to a working site rather than
 * an empty shell. Safe to run more than once: existing records are left alone.
 *
 *   npm run seed
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

import { capabilities } from '../content/capabilities'
import { sectors } from '../content/sectors'
import { questions } from '../content/questions'

const OWNER_EMAIL = process.env.SEED_EMAIL || 'dainamoholdings@gmail.com'
const OWNER_PASSWORD = process.env.SEED_PASSWORD || 'ChangeMe-2026!'

async function seed() {
  const payload = await getPayload({ config })

  const existingUsers = await payload.count({ collection: 'users' })
  if (existingUsers.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: OWNER_EMAIL,
        password: OWNER_PASSWORD,
        name: 'Dainamo Holdings',
        role: 'owner',
      },
    })
    console.log(`created owner account: ${OWNER_EMAIL}`)
    console.log('change this password on first sign in')
  } else {
    console.log('users already exist, skipping account creation')
  }

  // Sectors first, because services relate to them.
  // SQLite hands back numeric ids.
  const sectorIds = new Map<string, number>()
  for (const [index, sector] of sectors.entries()) {
    const found = await payload.find({
      collection: 'sectors',
      where: { slug: { equals: sector.slug } },
      limit: 1,
    })
    if (found.docs.length > 0) {
      sectorIds.set(sector.slug, Number(found.docs[0].id))
      continue
    }
    const created = await payload.create({
      collection: 'sectors',
      data: {
        title: sector.name,
        slug: sector.slug,
        summary: sector.lede,
        order: (index + 1) * 10,
        featureSpan: sector.span === 'wide' ? 'wide' : 'standard',
        pressures: sector.pressures.map((pressure) => ({
          title: pressure.title,
          detail: pressure.detail,
        })),
        seo: { answer: sector.answer },
      },
    })
    sectorIds.set(sector.slug, Number(created.id))
  }
  console.log(`sectors: ${sectorIds.size}`)

  let serviceCount = 0
  for (const [index, capability] of capabilities.entries()) {
    const found = await payload.find({
      collection: 'services',
      where: { slug: { equals: capability.slug } },
      limit: 1,
    })
    if (found.docs.length > 0) continue

    await payload.create({
      collection: 'services',
      data: {
        title: capability.name,
        slug: capability.slug,
        shortName: capability.shortName,
        summary: capability.lede,
        flagship: capability.flagship,
        order: (index + 1) * 10,
        systems: capability.systems.map((system) => ({
          name: system.name,
          detail: system.detail,
        })),
        scopeIncludes: capability.scope.map((item) => ({ item })),
        sectors: capability.sectors
          .map((name) => sectors.find((s) => s.name === name)?.slug)
          .filter((slug): slug is string => Boolean(slug))
          .map((slug) => sectorIds.get(slug))
          .filter((id): id is number => id !== undefined),
        seo: { answer: capability.answer },
      },
    })
    serviceCount += 1
  }
  console.log(`services created: ${serviceCount}`)

  let faqCount = 0
  for (const [index, item] of questions.entries()) {
    const found = await payload.find({
      collection: 'faqs',
      where: { question: { equals: item.question } },
      limit: 1,
    })
    if (found.docs.length > 0) continue
    await payload.create({
      collection: 'faqs',
      data: {
        question: item.question,
        answer: item.answer,
        topic: item.topic,
        showOnHome: Boolean(item.onHome),
        order: (index + 1) * 10,
      },
    })
    faqCount += 1
  }
  console.log(`questions created: ${faqCount}`)

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      legalName: 'Dainamo Holdings (Pty) Ltd',
      tagline: 'Building. Renovating. Protecting.',
      email: 'dainamoholdings@gmail.com',
      whatsapp: '27634329337',
      phones: [
        { label: 'Office', number: '063 432 9337' },
        { label: 'Site', number: '072 349 6482' },
      ],
      address: {
        street: '301 Greenfields, Heidelberg Road',
        suburb: 'City Deep',
        city: 'Johannesburg',
        province: 'Gauteng',
        postalCode: '2049',
      },
      openingHours: [{ days: 'Monday to Friday', opens: '07:00', closes: '17:00' }],
      serviceAreas: [
        'Johannesburg',
        'Sandton',
        'Midrand',
        'Randburg',
        'Roodepoort',
        'Soweto',
        'Germiston',
        'Boksburg',
        'Benoni',
        'Kempton Park',
        'Edenvale',
        'Alberton',
        'Centurion',
        'Pretoria',
        'Vereeniging',
        'Krugersdorp',
      ].map((name) => ({ name })),
      coverageNote:
        'Gauteng is covered as standard. Larger contracts are taken elsewhere in South Africa by arrangement, with travel and accommodation shown as a separate line on the quotation.',
      clients: [
        'Specialized Coating Systems',
        'Anaprop',
        'Family Dental',
        'Sasol Garages',
        'Engine',
        'Sanlam',
        'DVI',
      ].map((name) => ({ name, permissionConfirmed: false })),
      commitments: [
        {
          title: 'Measured, not estimated',
          detail: 'Areas are measured on site and appear on the quotation with quantities and rates.',
        },
        {
          title: 'Exclusions in writing',
          detail: 'What is not included is stated on the document, before the work starts.',
        },
        {
          title: 'The building keeps working',
          detail: 'Phasing, shifts and cure times are agreed with the facilities manager first.',
        },
        {
          title: 'A record at handover',
          detail: 'Photographs of the covered work go into the building file.',
        },
      ],
      vatRegistered: false,
    },
  })
  console.log('company details saved')

  console.log('\nseed complete')
  process.exit(0)
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})
