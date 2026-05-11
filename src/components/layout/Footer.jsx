'use client'

import personal from '@/data/personal'
import { GitBranch, Briefcase, Camera, Link2, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const getSocialIcon = (platform) => {
    switch (platform) {
      case 'github':
        return <GitBranch size={18} />
      case 'linkedin':
        return <Briefcase size={18} />
      case 'instagram':
        return <Camera size={18} />
      default:
        return <Link2 size={18} />
    }
  }

  return (
    <footer
      style={{
        padding: '60px 24px 40px',
        background: 'rgba(1, 29, 58, 0.8)',
        borderTop: '1px solid rgba(10, 61, 110, 0.5)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
          }}
        >
          <span style={{ color: '#f0ece3' }}>
            {personal.name.split(' ')[0]}
          </span>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#e01f37',
            }}
          />
        </div>

        <p
          style={{
            fontSize: '0.88rem',
            color: '#7a9abb',
            marginBottom: '32px',
            maxWidth: '400px',
            margin: '0 auto 32px',
            lineHeight: 1.7,
          }}
        >
          Building clean, fast and user-friendly web applications
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '40px',
          }}
        >
          {Object.entries(personal.social).map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'rgba(240, 236, 227, 0.08)',
                border: '1px solid rgba(240, 236, 227, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                color: '#7a9abb',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#e01f37'
                e.currentTarget.style.borderColor = '#e01f37'
                e.currentTarget.style.color = '#ffffff'
                e.currentTarget.style.transform = 'translateY(-3px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(240, 236, 227, 0.08)'
                e.currentTarget.style.borderColor = 'rgba(240, 236, 227, 0.1)'
                e.currentTarget.style.color = '#7a9abb'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {getSocialIcon(platform)}
            </a>
          ))}
        </div>

        <div
          style={{
            width: '100%',
            height: '1px',
            background: 'rgba(10, 61, 110, 0.5)',
            marginBottom: '24px',
          }}
        />

        <p
          style={{
            fontSize: '0.78rem',
            color: '#3a5f85',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
          }}
        >
          © {currentYear} {personal.name}. Made with
          <Heart size={14} color="#e01f37" fill="#e01f37" />
        </p>
      </div>
    </footer>
  )
}