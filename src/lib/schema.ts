import { company, serviceAreas, SITE_URL } from './site'

const ORG_ID = `${SITE_URL}/#organisation`
const SITE_ID = `${SITE_URL}/#website`
const PLACE_ID = `${SITE_URL}/#place`

/**
 * Structured data is the machine-readable half of this site. Search engines use
 * it for rich results; answer engines and assistants use it to decide whether
 * Dainamo is a credible answer to "who does epoxy flooring in Johannesburg".
 *
 * Only facts that appear in the company's own material are asserted here. No
 * registration number, VAT number, rating, award or certification is claimed.
 */
export function organisationGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['GeneralContractor', 'LocalBusiness', 'Organization'],
        '@id': ORG_ID,
        name: company.legalName,
        alternateName: company.name,
        url: SITE_URL,
        slogan: company.tagline,
        description:
          'Specialist construction, coatings and maintenance contractor in Johannesburg. Epoxy and resin flooring, torch-on waterproofing, damp proofing, protective coatings, thermoplastic line marking and planned building maintenance for commercial, industrial, healthcare and residential property.',
        email: company.email,
        telephone: company.phones.map((phone) => phone.tel),
        image: `${SITE_URL}/opengraph-image`,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/brand/dainamo-icon.svg`,
          caption: company.legalName,
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: company.address.street,
          addressLocality: company.address.suburb,
          addressRegion: company.address.province,
          postalCode: company.address.postalCode,
          addressCountry: 'ZA',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: company.geo.latitude,
          longitude: company.geo.longitude,
        },
        location: { '@id': PLACE_ID },
        openingHoursSpecification: company.openingHours.map((slot) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'https://schema.org/Monday',
            'https://schema.org/Tuesday',
            'https://schema.org/Wednesday',
            'https://schema.org/Thursday',
            'https://schema.org/Friday',
          ],
          opens: slot.opens,
          closes: slot.closes,
        })),
        areaServed: serviceAreas.map((area) => ({
          '@type': 'City',
          name: area,
          containedInPlace: { '@type': 'AdministrativeArea', name: 'Gauteng, South Africa' },
        })),
        knowsAbout: [
          'Epoxy resin flooring',
          'Polyurethane floor coatings',
          'Torch-on waterproofing membranes',
          'Rising damp remediation',
          'Protective industrial coatings',
          'Thermoplastic road marking',
          'Planned preventative building maintenance',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Specialist contracting services',
          itemListElement: [
            'Epoxy and resin flooring',
            'Waterproofing',
            'Damp proofing',
            'Protective and industrial coatings',
            'Building maintenance contracts',
            'Thermoplastic line marking',
            'Interior finishes and painting',
            'Plumbing, electrical, solar and HVAC',
          ].map((name, index) => ({
            '@type': 'Offer',
            position: index + 1,
            itemOffered: { '@type': 'Service', name, provider: { '@id': ORG_ID } },
          })),
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'sales',
            telephone: company.phones[0].tel,
            email: company.email,
            areaServed: 'ZA',
            availableLanguage: ['en'],
          },
        ],
      },
      {
        '@type': 'Place',
        '@id': PLACE_ID,
        name: `${company.name} yard and offices`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: company.address.street,
          addressLocality: company.address.suburb,
          addressRegion: company.address.province,
          postalCode: company.address.postalCode,
          addressCountry: 'ZA',
        },
      },
      {
        '@type': 'WebSite',
        '@id': SITE_ID,
        url: SITE_URL,
        name: company.name,
        inLanguage: 'en-ZA',
        publisher: { '@id': ORG_ID },
      },
    ],
  }
}

export function breadcrumbSchema(trail: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.href}`,
    })),
  }
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

export function serviceSchema(input: {
  name: string
  description: string
  slug: string
  sectors?: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/capabilities/${input.slug}#service`,
    name: input.name,
    description: input.description,
    serviceType: input.name,
    provider: { '@id': ORG_ID },
    areaServed: serviceAreas.map((area) => ({ '@type': 'City', name: area })),
    audience: input.sectors?.length
      ? input.sectors.map((sector) => ({ '@type': 'Audience', audienceType: sector }))
      : undefined,
    url: `${SITE_URL}/capabilities/${input.slug}`,
  }
}

export function projectSchema(input: {
  name: string
  description: string
  slug: string
  image?: string
  completedOn?: string
  location?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${SITE_URL}/work/${input.slug}#project`,
    name: input.name,
    description: input.description,
    creator: { '@id': ORG_ID },
    dateCreated: input.completedOn,
    contentLocation: input.location ? { '@type': 'Place', name: input.location } : undefined,
    image: input.image,
    url: `${SITE_URL}/work/${input.slug}`,
  }
}

export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data) }
}
