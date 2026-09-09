import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Library',
    description: 'Photography and documents used across the website.',
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  upload: {
    staticDir: path.resolve(dirname, '../../../public/uploads'),
    mimeTypes: ['image/*', 'application/pdf'],
    imageSizes: [
      { name: 'thumb', width: 480, height: 360, position: 'centre' },
      { name: 'card', width: 900 },
      { name: 'wide', width: 1600 },
      { name: 'hero', width: 2400 },
    ],
    focalPoint: true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description:
          'Describe what is in the picture for screen readers and search engines. Example: "Epoxy floor coating applied in a hospital corridor".',
      },
    },
    {
      name: 'credit',
      type: 'text',
      admin: { description: 'Optional photographer or source credit.' },
    },
  ],
}
