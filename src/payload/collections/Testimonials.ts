import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: { singular: 'Testimonial', plural: 'Testimonials' },
  admin: {
    useAsTitle: 'author',
    defaultColumns: ['author', 'organisation', 'order'],
    group: 'Website',
    description: 'Short quotes from clients. Three lines at most, or they will be cut off.',
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      maxLength: 240,
      admin: { description: 'Keep it under about 30 words so it reads at a glance.' },
    },
    { name: 'author', type: 'text', required: true },
    { name: 'role', type: 'text', admin: { placeholder: 'Facilities Manager' } },
    { name: 'organisation', type: 'text' },
    { name: 'order', type: 'number', defaultValue: 100 },
  ],
}
