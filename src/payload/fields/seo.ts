import type { Field } from 'payload'

/**
 * Shared SEO / answer-engine block. Kept deliberately small so the owner is not
 * asked to fill in fields he will not understand. Everything here has a sensible
 * fallback in the front end when left empty.
 */
export const seoField: Field = {
  name: 'seo',
  type: 'group',
  label: 'Search and AI answers',
  admin: {
    description:
      'Leave blank and the page will use its own heading and intro. Fill these in only when you want tighter control.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Search result title',
      maxLength: 65,
      admin: { description: 'Around 55 to 60 characters reads best in Google.' },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Search result description',
      maxLength: 165,
      admin: { description: 'One or two plain sentences. Around 150 characters.' },
    },
    {
      name: 'answer',
      type: 'textarea',
      label: 'Direct answer',
      maxLength: 320,
      admin: {
        description:
          'A single self contained paragraph that answers "what is this and who is it for". AI assistants quote this, so avoid marketing language.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Share image',
      admin: { description: 'Used when the page is shared on WhatsApp, LinkedIn or Facebook.' },
    },
  ],
}
