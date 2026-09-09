import { getPayload } from 'payload'

import config from '../payload.config'
import { capabilities as fallbackCapabilities, type Capability } from '../content/capabilities'
import { questions as fallbackQuestions, type Question } from '../content/questions'
import { sectors as fallbackSectors, type Sector } from '../content/sectors'
import { company as fallbackCompany, serviceAreas as fallbackServiceAreas } from './site'

let payloadPromise: ReturnType<typeof getPayload> | undefined

function payloadClient() {
  payloadPromise ??= getPayload({ config })
  return payloadPromise
}

function mediaKey(slug: string | null | undefined, fallback: Capability['media']): Capability['media'] {
  const keys: Record<string, Capability['media']> = {
    'epoxy-and-resin-flooring': 'coatings-warehouse-floor',
    waterproofing: 'waterproofing-torch-on',
    'damp-proofing': 'damp-proofing-injection',
    'maintenance-contracts': 'maintenance-rooftop-plant',
    'protective-and-industrial-coatings': 'hero-facade',
  }
  return (slug && keys[slug]) || fallback
}

export async function getCmsCapabilities(): Promise<Capability[]> {
  try {
    const result = await (await payloadClient()).find({
      collection: 'services',
      limit: 100,
      sort: 'order',
      depth: 1,
    })
    if (!result.docs.length) return fallbackCapabilities

    return result.docs.map((service) => {
      const fallback = fallbackCapabilities.find((item) => item.slug === service.slug)
      return {
        slug: service.slug || fallback?.slug || String(service.id),
        name: service.title,
        shortName: service.shortName || fallback?.shortName || service.title,
        flagship: Boolean(service.flagship),
        media: mediaKey(service.slug, fallback?.media || 'hero-facade'),
        answer: service.seo?.answer || fallback?.answer || service.summary,
        lede: service.summary,
        systems: (service.systems || []).map((system) => ({ name: system.name, detail: system.detail || '' })),
        scope: (service.scopeIncludes || []).map((item) => item.item),
        sectors: (service.sectors || []).map((sector) => typeof sector === 'number' ? '' : sector.title).filter(Boolean),
        buyerQuestion: fallback?.buyerQuestion || 'How should this work be scoped?',
      }
    })
  } catch {
    return fallbackCapabilities
  }
}

export async function getCmsSectors(): Promise<Sector[]> {
  try {
    const result = await (await payloadClient()).find({
      collection: 'sectors',
      limit: 100,
      sort: 'order',
      depth: 1,
    })
    if (!result.docs.length) return fallbackSectors

    return result.docs.map((sector) => {
      const fallback = fallbackSectors.find((item) => item.slug === sector.slug)
      return {
        slug: sector.slug || fallback?.slug || String(sector.id),
        name: sector.title,
        media: fallback?.media || 'sector-commercial',
        span: sector.featureSpan || fallback?.span || 'standard',
        answer: sector.seo?.answer || fallback?.answer || sector.summary,
        lede: sector.summary,
        pressures: (sector.pressures || []).map((pressure) => ({
          title: pressure.title,
          detail: pressure.detail || '',
        })),
        capabilities: (sector.services || [])
          .map((service) => typeof service === 'number' ? '' : service.slug || '')
          .filter(Boolean),
      }
    })
  } catch {
    return fallbackSectors
  }
}

export async function getCmsQuestions(): Promise<Question[]> {
  try {
    const result = await (await payloadClient()).find({ collection: 'faqs', limit: 100, sort: 'order' })
    if (!result.docs.length) return fallbackQuestions
    return result.docs.map((faq) => ({
      question: faq.question,
      answer: faq.answer,
      topic: faq.topic || 'general',
      onHome: Boolean(faq.showOnHome),
    }))
  } catch {
    return fallbackQuestions
  }
}

export async function getCmsCompany() {
  try {
    const settings = await (await payloadClient()).findGlobal({ slug: 'site-settings', depth: 0 })
    const phones = (settings.phones || []).map((phone) => ({
      label: phone.label || 'Phone',
      number: phone.number,
      tel: phone.number.replace(/\D/g, '').replace(/^0/, '+27'),
    }))
    return {
      ...fallbackCompany,
      legalName: settings.legalName || fallbackCompany.legalName,
      tagline: settings.tagline || fallbackCompany.tagline,
      email: settings.email || fallbackCompany.email,
      whatsapp: settings.whatsapp || fallbackCompany.whatsapp,
      phones: phones.length ? phones : fallbackCompany.phones,
      address: { ...fallbackCompany.address, ...(settings.address || {}) },
      openingHours: settings.openingHours || fallbackCompany.openingHours,
      serviceAreas: (settings.serviceAreas || []).map((area) => area.name),
    }
  } catch {
    return { ...fallbackCompany, serviceAreas: [...fallbackServiceAreas] }
  }
}