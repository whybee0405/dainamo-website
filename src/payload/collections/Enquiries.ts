import type { CollectionConfig } from 'payload'

export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  labels: { singular: 'Enquiry', plural: 'Enquiries' },
  admin: {
    useAsTitle: 'contactName',
    defaultColumns: ['contactName', 'organisation', 'service', 'status', 'createdAt'],
    group: 'Enquiries',
    description: 'Site assessment requests submitted from the website.',
  },
  access: {
    // Anyone may submit. Only signed in staff may read, because these records
    // contain personal contact details (POPIA).
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  timestamps: true,
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'contactName', type: 'text', required: true, label: 'Contact person' },
        { name: 'organisation', type: 'text', label: 'Company or complex' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'email', type: 'email', required: true },
        { name: 'phone', type: 'text', required: true },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'siteLocation', type: 'text', label: 'Site location' },
        { name: 'sectorType', type: 'text', label: 'Building type' },
      ],
    },
    { name: 'service', type: 'text', label: 'Work required' },
    { name: 'message', type: 'textarea', label: 'What they told us' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Site visit booked', value: 'booked' },
        { label: 'Quoted', value: 'quoted' },
        { label: 'Won', value: 'won' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'source',
      type: 'text',
      admin: { position: 'sidebar', readOnly: true, description: 'Which page the enquiry came from.' },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Internal notes',
      admin: { description: 'Not visible to the client.' },
    },
  ],
}
