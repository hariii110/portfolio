'use client'

import testimonials from '@/data/testimonials'
import ScrollReveal from '@/components/ui/ScrollReveal'

export default function Testimonials() {
  if (!testimonials || testimonials.length === 0) return null

  return (
    <section className="section-wrapper" style={{ background: 'transparent' }}>
      <div className="section-container">
        <ScrollReveal>
          <div className="section-header">
            <h2 className="section-title">
              What People <span className="gradient-text">Say</span>
            </h2>
            <p className="section-subtitle">
              Feedback from people I have worked with
            </p>
            <div className="section-line" />
          </div>
        </ScrollReveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.id} delay={0.12 + i * 0.08}>
              <div className={i === 0 ? 'card-cream' : i === 1 ? 'card-red' : 'card'} style={{ padding: '36px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '16px', opacity: 0.3 }}>❝</div>

                <p
                  style={{
                    fontSize: '0.9rem',
                    lineHeight: 1.9,
                    marginBottom: '24px',
                    fontStyle: 'italic',
                    color: i === 0 ? '#3a5f85' : i === 1 ? '#f8d0d5' : '#7a9abb',
                  }}
                >
                  {t.feedback}
                </p>

                <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                  {[...Array(5)].map((_, starIndex) => (
                    <span key={starIndex} style={{ fontSize: '1rem', opacity: starIndex < t.rating ? 1 : 0.2 }}>
                      ⭐
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    paddingTop: '16px',
                    borderTop:
                      i === 0
                        ? '1px solid rgba(1, 44, 86, 0.1)'
                        : i === 1
                        ? '1px solid rgba(255, 255, 255, 0.15)'
                        : '1px solid rgba(240, 236, 227, 0.1)',
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: i === 0 ? '#012c56' : i === 1 ? 'rgba(255, 255, 255, 0.15)' : '#e01f37',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      color: '#ffffff',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {t.name.charAt(0)}
                  </div>

                  <div>
                    <h4
                      style={{
                        fontSize: '0.92rem',
                        fontWeight: 700,
                        marginBottom: '2px',
                        color: i === 0 ? '#012c56' : i === 1 ? '#ffffff' : '#f0ece3',
                      }}
                    >
                      {t.name}
                    </h4>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 400,
                        color: i === 0 ? '#3a5f85' : i === 1 ? '#f8d0d5' : '#7a9abb',
                      }}
                    >
                      {t.role} at {t.company}
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}