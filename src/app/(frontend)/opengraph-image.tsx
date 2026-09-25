import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

export const runtime = 'nodejs'
export const alt = 'Dainamo Holdings, specialist finishes for buildings that cannot close'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpenGraphImage() {
  const logo = `data:image/png;base64,${(await readFile(
    path.join(process.cwd(), 'public/brand/primary-light.png'),
  )).toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '68px 72px',
          background: 'linear-gradient(150deg, #ffffff 0%, #f4f7fc 58%, #e8f0fd 100%)',
          color: '#0b1526',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} width={325} height={121} alt="Dainamo Holdings" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <span
            style={{
              fontSize: 66,
              fontWeight: 800,
              lineHeight: 1.06,
              letterSpacing: -2,
              maxWidth: 900,
            }}
          >
            Specialist finishes for buildings that cannot close.
          </span>
          <span style={{ fontSize: 26, lineHeight: 1.5, color: '#4a5a72', maxWidth: 860 }}>
            Epoxy flooring, waterproofing and damp proofing across Johannesburg and Gauteng.
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            paddingTop: 26,
            borderTop: '1px solid #d7e2f3',
            fontSize: 21,
            color: '#5d708c',
          }}
        >
          <span>City Deep, Johannesburg</span>
          <span style={{ color: '#1b5cd0', fontWeight: 700 }}>063 432 9337</span>
        </div>
      </div>
    ),
    size,
  )
}
