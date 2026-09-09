import type { CollectionConfig } from 'payload'
import { seoField } from '../fields/seo'
import { slugField } from '../fields/slug'

export const Sectors: CollectionConfig = {
  slug: 'sectors',
  labels: { singular: 'Sector', plural: 'Sectors' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order', 'updatedAt'],
    group: 'Website',
    description: 'The kinds of buildings Dainamo works in. Each one gets its own page.',
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
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            { name: 'title', type: 'text', required: true },
            slugField('title'),
            {
              name: 'summary',
              type: 'textarea',
              required: true,
              maxLength: 220,
            },
            { name: 'image', type: 'upload', relationTo: 'media' },
            {
              name: 'pressures',
              type: 'array',
              label: 'What makes this sector difficult',
              labels: { singular: 'Pressure', plural: 'Pressures' },
              admin: {
                description:
                  'The real constraints on site. Trading hours, infection control, forklift traffic, and so on.',
              },
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'detail', type: 'textarea', maxLength: 200 },
              ],
            },
            {
              name: 'body',
              type: 'richText',
            },
            {
              name: 'services',
              type: 'relationship',
              relationTo: 'services',
              hasMany: true,
              admin: { description: 'The services most often specified for this sector.' },
            },
          ],
        },
        {
          label: 'Presentation',
          fields: [
            { name: 'order', type: 'number', defaultValue: 100 },
            {
              name: 'featureSpan',
              type: 'select',
              defaultValue: 'standard',
              options: [
                { label: 'Standard tile', value: 'standard' },
                { label: 'Wide tile', value: 'wide' },
                { label: 'Tall tile', value: 'tall' },
              ],
              admin: { description: 'Controls how large this sector appears in the home page grid.' },
            },
          ],
        },
        { label: 'Search and AI answers', fields: [seoField] },
      ],
    },
  ],
}
