import type { CollectionConfig } from 'payload'

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  labels: { singular: 'Question', plural: 'Questions' },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'topic', 'order'],
    group: 'Website',
    description:
      'Real questions clients ask. These are read by Google and by AI assistants, so answer them plainly and completely.',
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
      name: 'question',
      type: 'text',
      required: true,
      admin: { description: 'Write it the way a client would ask it.' },
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
      maxLength: 600,
      admin: {
        description:
          'Answer in the first two sentences, then add detail. Do not promise prices or guarantees that have not been agreed.',
      },
    },
    {
      name: 'topic',
      type: 'select',
      defaultValue: 'general',
      options: [
        { label: 'General', value: 'general' },
        { label: 'Quoting and payment', value: 'commercial' },
        { label: 'On site', value: 'site' },
        { label: 'Coatings and waterproofing', value: 'technical' },
        { label: 'Maintenance contracts', value: 'contracts' },
      ],
    },
    {
      name: 'showOnHome',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Show this question on the home page. Six is a comfortable maximum.' },
    },
    { name: 'order', type: 'number', defaultValue: 100 },
  ],
}
