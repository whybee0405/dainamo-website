import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const alt = 'Dainamo Holdings, specialist finishes for buildings that cannot close'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpenGraphImage() {
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="112" height="62" viewBox="0 0 240 132">
            <g fillRule="evenodd">
              <path fill="#5B93F0" d="M53 19 105 71 53 123 1 71Z M53 34 90 71 53 108 16 71Z" />
              <path fill="#5B93F0" d="M187 19 239 71 187 123 135 71Z M187 34 224 71 187 108 150 71Z" />
              <path fill="#12439F" d="M62 24 114 76 62 128 10 76Z M62 39 99 76 62 113 25 76Z" />
              <path fill="#12439F" d="M178 24 230 76 178 128 126 76Z M178 39 215 76 178 113 141 76Z" />
              <path fill="#12439F" d="M120 2 182 66 120 130 58 66Z M120 20 164 66 120 112 76 66Z" />
            </g>
            <g>
              <path fill="#5B93F0" d="M97 79h13v45H97Z" />
              <path fill="#5B93F0" d="M112 57h9v67h-9Z" />
              <path fill="#12439F" d="M121 57h8v67h-8Z" />
              <path fill="#5B93F0" d="M130 83h13v41h-13Z" />
            </g>
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span
              style={{
                fontSize: 40,
                fontWeight: 800,
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}
            >
              Dainamo
            </span>
            <span
              style={{
                fontSize: 17,
                fontWeight: 600,
                letterSpacing: 9,
                textTransform: 'uppercase',
                color: '#1b5cd0',
              }}
            >
              Holdings
            </span>
          </div>
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
          <span style={{ color: '#a63e07', fontWeight: 700 }}>063 432 9337</span>
        </div>
      </div>
    ),
    size,
  )
}
