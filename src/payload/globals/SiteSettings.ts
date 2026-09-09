import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Company details',
  admin: {
    group: 'Administration',
    description: 'Contact details, service areas and the words used across the website.',
  },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Contact',
          fields: [
            { name: 'legalName', type: 'text', defaultValue: 'Dainamo Holdings (Pty) Ltd' },
            { name: 'tagline', type: 'text', defaultValue: 'Building. Renovating. Protecting.' },
            {
              name: 'phones',
              type: 'array',
              labels: { singular: 'Number', plural: 'Numbers' },
              fields: [
                { name: 'label', type: 'text', admin: { placeholder: 'Office' } },
                { name: 'number', type: 'text', required: true },
              ],
            },
            { name: 'email', type: 'email', defaultValue: 'dainamoholdings@gmail.com' },
            {
              name: 'whatsapp',
              type: 'text',
              label: 'WhatsApp number in international format',
              admin: { placeholder: '27634329337' },
            },
            {
              name: 'address',
              type: 'group',
              fields: [
                { name: 'street', type: 'text', defaultValue: '301 Greenfields, Heidelberg Road' },
                { name: 'suburb', type: 'text', defaultValue: 'City Deep' },
                { name: 'city', type: 'text', defaultValue: 'Johannesburg' },
                { name: 'province', type: 'text', defaultValue: 'Gauteng' },
                { name: 'postalCode', type: 'text', defaultValue: '2049' },
              ],
            },
            {
              name: 'openingHours',
              type: 'array',
              labels: { singular: 'Entry', plural: 'Entries' },
              fields: [
                { name: 'days', type: 'text', admin: { placeholder: 'Monday to Friday' } },
                { name: 'opens', type: 'text', admin: { placeholder: '07:00' } },
                { name: 'closes', type: 'text', admin: { placeholder: '17:00' } },
              ],
            },
          ],
        },
        {
          label: 'Where we work',
          fields: [
            {
              name: 'serviceAreas',
              type: 'array',
              labels: { singular: 'Area', plural: 'Areas' },
              admin: {
                description:
                  'Towns and suburbs Dainamo covers. These are used by Google and AI assistants to decide whether to recommend the company for a local search.',
              },
              fields: [{ name: 'name', type: 'text', required: true }],
            },
            {
              name: 'coverageNote',
              type: 'textarea',
              maxLength: 300,
              admin: { description: 'One paragraph on travel, call out and coverage outside Gauteng.' },
            },
          ],
        },
        {
          label: 'Trust',
          fields: [
            {
              name: 'clients',
              type: 'array',
              label: 'Clients and references',
              labels: { singular: 'Client', plural: 'Clients' },
              admin: {
                description:
                  'Only list a client here once you have their permission to show their name publicly.',
              },
              fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'logo', type: 'upload', relationTo: 'media' },
                {
                  name: 'permissionConfirmed',
                  type: 'checkbox',
                  defaultValue: false,
                  label: 'Permission confirmed',
                },
              ],
            },
            {
              name: 'commitments',
              type: 'array',
              label: 'What we commit to',
              labels: { singular: 'Commitment', plural: 'Commitments' },
              maxRows: 4,
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'detail', type: 'textarea', maxLength: 180 },
              ],
            },
          ],
        },
        {
          label: 'Registration',
          fields: [
            {
              name: 'registrationNumber',
              type: 'text',
              admin: { description: 'Company registration number. Leave blank until confirmed.' },
            },
            {
              name: 'vatRegistered',
              type: 'checkbox',
              defaultValue: false,
              admin: { description: 'Tick only once VAT registration is confirmed.' },
            },
            {
              name: 'vatNumber',
              type: 'text',
              admin: { condition: (data) => Boolean(data?.vatRegistered) },
            },
          ],
        },
      ],
    },
  ],
}
