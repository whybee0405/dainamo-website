import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

import { Users } from './payload/collections/Users'
import { Media } from './payload/collections/Media'
import { Services } from './payload/collections/Services'
import { Sectors } from './payload/collections/Sectors'
import { Projects } from './payload/collections/Projects'
import { Testimonials } from './payload/collections/Testimonials'
import { Faqs } from './payload/collections/Faqs'
import { Enquiries } from './payload/collections/Enquiries'
import { SiteSettings } from './payload/globals/SiteSettings'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: ' · Dainamo Holdings',
      icons: [{ rel: 'icon', type: 'image/svg+xml', url: '/brand/dainamo-mark.svg' }],
      openGraph: {
        title: 'Dainamo Holdings Content Studio',
        description: 'Manage services, sectors, projects and enquiries for Dainamo Holdings.',
      },
    },
    components: {
      graphics: {
        Logo: '/payload/admin/Logo#Logo',
        Icon: '/payload/admin/Icon#Icon',
      },
      beforeLogin: ['/payload/admin/BeforeLogin#BeforeLogin'],
    },
  },
  collections: [
    Services,
    Sectors,
    Projects,
    Testimonials,
    Faqs,
    Enquiries,
    Media,
    Users,
  ],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'dainamo-dev-secret-change-me',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || `file:${path.resolve(dirname, '../dainamo.db')}`,
    },
  }),
  sharp,
  upload: {
    limits: { fileSize: 8_000_000 },
  },
  graphQL: {
    disablePlaygroundInProduction: true,
  },
})
