/**
 * Static company facts and navigation.
 *
 * Everything here is either taken directly from Dainamo's own company profile
 * and invoice template, or is copy that the CMS can override. Nothing has been
 * invented: no registration number, no VAT number, no certifications and no
 * performance guarantees appear anywhere on the site, because none of those
 * were supplied.
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://dainamoholdings.co.za').replace(
  /\/$/,
  '',
)

export const company = {
  name: 'Dainamo Holdings',
  legalName: 'Dainamo Holdings (Pty) Ltd',
  tagline: 'Building. Renovating. Protecting.',
  positioning: 'Specialist coatings, waterproofing and maintenance contractor',
  email: 'dainamoholdings@gmail.com',
  phones: [
    { label: 'Office', number: '063 432 9337', tel: '+27634329337' },
    { label: 'Site', number: '072 349 6482', tel: '+27723496482' },
  ],
  whatsapp: '27634329337',
  address: {
    street: '301 Greenfields, Heidelberg Road',
    suburb: 'City Deep',
    city: 'Johannesburg',
    province: 'Gauteng',
    postalCode: '2049',
    country: 'ZA',
  },
  // City Deep, Johannesburg. Used only for structured data.
  geo: { latitude: -26.2384, longitude: 28.0752 },
  openingHours: [{ days: 'Monday to Friday', opens: '07:00', closes: '17:00' }],
  founded: '2019',
} as const

export const serviceAreas = [
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
] as const

export const nav = [
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'Sectors', href: '/sectors' },
  { label: 'Work', href: '/work' },
  { label: 'Company', href: '/company' },
] as const

/** One label per intent, used identically in the header, page body and footer. */
export const PRIMARY_CTA = {
  label: 'Request a site assessment',
  href: '/site-assessment',
} as const

export const SECONDARY_CTA = {
  label: 'View capabilities',
  href: '/capabilities',
} as const
