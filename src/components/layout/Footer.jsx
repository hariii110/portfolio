'use client'

import personal from '@/data/personal'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{
      padding: '60px 24px 40px',
      background: 'rgba(1, 29, 58, 0.8)',
      borderTop: '1px solid rgba(10, 61, 110, 0.5)',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
        }}>
          <span style={{ color: '#f0ece3' }}>
            {personal.name.split(' ')[0]}
          </span>
          <span style={{
            width: '8px', height: '8px',
            borderRadius: '50%', background: '#e01f37',
          }} />
        </div>

        <p style={{
          fontSize: '0.88rem',
          color: '#7a9abb',
          marginBottom: '32px',
          maxWidth: '400px',
          margin: '0 auto 32px',
          lineHeight: 1.7,
        }}>
          Building clean, fast and user-friendly web applications
        </p>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '40px',
        }}>
          {Object.entries(personal.social).map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '44px', height: '44px',
                borderRadius: '12px',
                background: 'rgba(240, 236, 227, 0.08)',
                border: '1px solid rgba(240, 236, 227, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                fontSize: '1.1rem',
              }}
            >
              {platform === 'github' ? '🐙' :
               platform === 'linkedin' ? '💼' :
               platform === 'instagram' ? '📸' : '🔗'}
            </a>
          ))}
        </div>

        <div style={{
          width: '100%', height: '1px',
          background: 'rgba(10, 61, 110, 0.5)',
          marginBottom: '24px',
        }} />

        <p style={{ fontSize: '0.78rem', color: '#3a5f85' }}>
          © {currentYear} {personal.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}