import type { CollectionConfig } from 'payload'
import { seoField } from '../fields/seo'
import { slugField } from '../fields/slug'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: { singular: 'Project', plural: 'Projects' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'location', 'completedOn', 'featured'],
    group: 'Website',
    description: 'Completed work. Only publish a project once the client is happy for it to be shown.',
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  defaultSort: '-completedOn',
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
              name: 'client',
              type: 'text',
              admin: { description: 'Leave blank if the client has not agreed to be named.' },
            },
            { name: 'location', type: 'text', admin: { placeholder: 'Sandton, Johannesburg' } },
            { name: 'completedOn', type: 'date' },
            {
              name: 'summary',
              type: 'textarea',
              required: true,
              maxLength: 240,
            },
            {
              name: 'brief',
              type: 'textarea',
              label: 'The problem',
              maxLength: 400,
            },
            {
              name: 'approach',
              type: 'textarea',
              label: 'What we did',
              maxLength: 400,
            },
            {
              name: 'outcome',
              type: 'textarea',
              label: 'The result',
              maxLength: 400,
            },
            { name: 'beforeImage', type: 'upload', relationTo: 'media' },
            { name: 'afterImage', type: 'upload', relationTo: 'media' },
            {
              name: 'gallery',
              type: 'array',
              labels: { singular: 'Photograph', plural: 'Photographs' },
              fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
            },
            {
              name: 'facts',
              type: 'array',
              label: 'Key figures',
              labels: { singular: 'Figure', plural: 'Figures' },
              maxRows: 4,
              fields: [
                { name: 'value', type: 'text', required: true },
                { name: 'label', type: 'text', required: true },
              ],
            },
            { name: 'services', type: 'relationship', relationTo: 'services', hasMany: true },
            { name: 'sector', type: 'relationship', relationTo: 'sectors' },
          ],
        },
        {
          label: 'Presentation',
          fields: [
            {
              name: 'featured',
              type: 'checkbox',
              defaultValue: false,
              admin: { description: 'Featured projects appear on the home page. Keep this to one or two.' },
            },
            {
              name: 'clientConsent',
              type: 'checkbox',
              defaultValue: false,
              label: 'Client has agreed to this being published',
              admin: { description: 'Projects without consent stay hidden from the website.' },
            },
          ],
        },
        { label: 'Search and AI answers', fields: [seoField] },
      ],
    },
  ],
}
