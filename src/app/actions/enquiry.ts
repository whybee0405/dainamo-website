'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

export type EnquiryState =
  | { status: 'idle' }
  | { status: 'success'; reference: string }
  | { status: 'error'; message: string; fieldErrors?: Record<string, string> }

const REQUIRED: Record<string, string> = {
  contactName: 'Tell us who to ask for.',
  email: 'We need an email address to send the quotation to.',
  phone: 'A telephone number lets us confirm the site visit quickly.',
  message: 'Describe what is failing, even in one line.',
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
// South African numbers, with or without the country code, spaces or dashes.
const PHONE = /^(\+?27|0)[\s-]?\d{2}[\s-]?\d{3}[\s-]?\d{4}$/

export async function submitEnquiry(
  _previous: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  // Bots fill hidden fields. People do not.
  if (String(formData.get('company_website') ?? '').length > 0) {
    return { status: 'success', reference: 'DH-0000' }
  }

  const value = (key: string) => String(formData.get(key) ?? '').trim()

  const fieldErrors: Record<string, string> = {}
  for (const [field, message] of Object.entries(REQUIRED)) {
    if (!value(field)) fieldErrors[field] = message
  }
  if (value('email') && !EMAIL.test(value('email'))) {
    fieldErrors.email = 'That email address does not look complete.'
  }
  if (value('phone') && !PHONE.test(value('phone'))) {
    fieldErrors.phone = 'Use a South African number, for example 082 123 4567.'
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: 'error',
      message: 'A few details are still missing.',
      fieldErrors,
    }
  }

  try {
    const payload = await getPayload({ config })
    const created = await payload.create({
      collection: 'enquiries',
      data: {
        contactName: value('contactName'),
        organisation: value('organisation') || undefined,
        email: value('email'),
        phone: value('phone'),
        siteLocation: value('siteLocation') || undefined,
        sectorType: value('sectorType') || undefined,
        service: value('service') || undefined,
        message: value('message'),
        status: 'new',
        source: value('source') || 'site-assessment',
      },
    })

    return {
      status: 'success',
      reference: `DH-${String(created.id).padStart(4, '0').slice(-4)}`,
    }
  } catch (error) {
    console.error('enquiry submission failed', error)
    return {
      status: 'error',
      message:
        'The form could not be sent just now. Please call 063 432 9337 or email dainamoholdings@gmail.com and we will pick it up straight away.',
    }
  }
}
