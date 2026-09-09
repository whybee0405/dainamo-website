import type { CollectionConfig } from 'payload'
import { seoField } from '../fields/seo'
import { slugField } from '../fields/slug'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Service', plural: 'Services' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'flagship', 'order', 'updatedAt'],
    group: 'Website',
    description: 'What Dainamo does. Flagship services lead the home page.',
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
              name: 'shortName',
              type: 'text',
              admin: { description: 'Short label used in menus and cards. Example: "Epoxy flooring".' },
            },
            {
              name: 'summary',
              type: 'textarea',
              required: true,
              maxLength: 220,
              admin: { description: 'One or two sentences. Appears on cards and in search results.' },
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'body',
              type: 'richText',
              admin: { description: 'The full explanation of the service.' },
            },
            {
              name: 'systems',
              type: 'array',
              label: 'Systems and applications',
              labels: { singular: 'System', plural: 'Systems' },
              admin: { description: 'The specific products or methods used, and where each one suits.' },
              fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'detail', type: 'textarea', maxLength: 180 },
              ],
            },
            {
              name: 'scopeIncludes',
              type: 'array',
              label: 'What a typical scope includes',
              labels: { singular: 'Item', plural: 'Items' },
              fields: [{ name: 'item', type: 'text', required: true }],
            },
            {
              name: 'sectors',
              type: 'relationship',
              relationTo: 'sectors',
              hasMany: true,
              admin: { description: 'Which building types this service is most often specified for.' },
            },
          ],
        },
        {
          label: 'Presentation',
          fields: [
            {
              name: 'flagship',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description:
                  'Flagship services appear in the main capability sequence on the home page. Keep this to four.',
              },
            },
            {
              name: 'order',
              type: 'number',
              defaultValue: 100,
              admin: { description: 'Lower numbers appear first.' },
            },
            {
              name: 'metric',
              type: 'group',
              label: 'Headline figure',
              admin: { description: 'Optional. A single number that makes the service concrete.' },
              fields: [
                { name: 'value', type: 'text', admin: { placeholder: '26 747' } },
                { name: 'unit', type: 'text', admin: { placeholder: 'm² coated' } },
                { name: 'caption', type: 'text', admin: { placeholder: 'Largest single exterior contract' } },
              ],
            },
          ],
        },
        { label: 'Search and AI answers', fields: [seoField] },
      ],
    },
  ],
}
