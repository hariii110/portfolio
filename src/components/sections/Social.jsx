'use client'

import personal from '@/data/personal'

export default function Social() {
  const platforms = [
    { name: 'GitHub', icon: '🐙', url: personal.social.github, desc: 'Check out my code' },
    { name: 'LinkedIn', icon: '💼', url: personal.social.linkedin, desc: 'Connect professionally' },
    { name: 'Instagram', icon: '📸', url: personal.social.instagram, desc: 'Follow my journey' },
  ]

  return (
    <section className="section-wrapper" style={{ background: 'transparent' }}>
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">
            Find Me <span className="gradient-text">Online</span>
          </h2>
          <p className="section-subtitle">
            Let&apos;s connect on social media
          </p>
          <div className="section-line" />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px', maxWidth: '900px', margin: '0 auto',
        }}>
          {platforms.map((p, i) => (
            <a key={p.name} href={p.url}
              target="_blank" rel="noopener noreferrer"
              className={i === 0 ? 'card-cream' : i === 1 ? 'card-red' : 'card'}
              style={{
                textDecoration: 'none', textAlign: 'center',
                padding: '48px 32px',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '16px',
              }}>
              <div style={{ fontSize: '3rem' }}>{p.icon}</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{p.name}</h3>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.7 }}>{p.desc}</p>
              <span style={{
                padding: '8px 20px', borderRadius: '100px',
                fontSize: '0.78rem', fontWeight: 700,
                background: i === 0 ? 'rgba(1,44,86,0.08)' :
                           i === 1 ? 'rgba(255,255,255,0.15)' :
                           'rgba(224,31,55,0.15)',
                color: i === 0 ? '#012c56' :
                       i === 1 ? '#ffffff' : '#e01f37',
                marginTop: '8px',
              }}>Follow →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}