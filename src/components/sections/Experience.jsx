'use client'

import experience from '@/data/experience'
import ScrollReveal from '@/components/ui/ScrollReveal'

export default function Experience() {
  return (
    <section className="section-wrapper" style={{ background: 'transparent' }}>
      <div className="section-container">
        <ScrollReveal>
          <div className="section-header">
            <h2 className="section-title">
              My <span className="gradient-text">Experience</span>
            </h2>
            <p className="section-subtitle">
              Real work experience and internships that shaped my skills
            </p>
            <div className="section-line" />
          </div>
        </ScrollReveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {experience.map((exp, index) => (
            <ScrollReveal key={exp.id} delay={0.12 + index * 0.08}>
              <div
                className={index === 0 ? 'card-cream' : 'card'}
                style={{
                  padding: '0',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    padding: '32px 36px',
                    background:
                      index === 0
                        ? 'linear-gradient(135deg, #012c56, #0a3d6e)'
                        : 'linear-gradient(135deg, #e01f37, #b81828)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: '1.3rem',
                        fontWeight: 700,
                        color: '#f0ece3',
                        marginBottom: '6px',
                      }}
                    >
                      {exp.role}
                    </h3>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        flexWrap: 'wrap',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.85rem',
                          color: index === 0 ? '#a0b8d0' : '#f8d0d5',
                          fontWeight: 400,
                        }}
                      >
                        {exp.company}
                      </span>
                      <span
                        style={{
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          background: index === 0 ? '#a0b8d0' : '#f8d0d5',
                        }}
                      />
                      <span
                        style={{
                          fontSize: '0.82rem',
                          color: index === 0 ? '#a0b8d0' : '#f8d0d5',
                          fontWeight: 400,
                        }}
                      >
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span
                      className="badge-cream"
                      style={{
                        background: 'rgba(240, 236, 227, 0.15)',
                        color: '#f0ece3',
                        border: '1px solid rgba(240, 236, 227, 0.2)',
                      }}
                    >
                      {exp.duration}
                    </span>
                    <span
                      style={{
                        padding: '6px 14px',
                        borderRadius: '100px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        background: '#f0ece3',
                        color: '#012c56',
                      }}
                    >
                      {exp.type}
                    </span>
                  </div>
                </div>

                <div style={{ padding: '36px' }}>
                  <p
                    style={{
                      fontSize: '0.95rem',
                      lineHeight: 2,
                      marginBottom: '32px',
                      color: index === 0 ? '#3a5f85' : '#7a9abb',
                    }}
                  >
                    {exp.description}
                  </p>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '32px',
                    }}
                    id={`exp-grid-${exp.id}`}
                  >
                    <div>
                      <h4
                        style={{
                          fontSize: '0.9rem',
                          fontWeight: 700,
                          marginBottom: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          color: index === 0 ? '#012c56' : '#f0ece3',
                        }}
                      >
                        <span className="dot-red" /> Responsibilities
                      </h4>
                      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {exp.responsibilities.map((item, i) => (
                          <li
                            key={i}
                            style={{
                              fontSize: '0.82rem',
                              lineHeight: 1.7,
                              color: index === 0 ? '#3a5f85' : '#7a9abb',
                              display: 'flex',
                              gap: '10px',
                            }}
                          >
                            <span style={{ color: '#e01f37', fontSize: '0.6rem', marginTop: '6px', flexShrink: 0 }}>●</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4
                        style={{
                          fontSize: '0.9rem',
                          fontWeight: 700,
                          marginBottom: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          color: index === 0 ? '#012c56' : '#f0ece3',
                        }}
                      >
                        <span className="dot-cream" /> Achievements
                      </h4>
                      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {exp.achievements.map((item, i) => (
                          <li
                            key={i}
                            style={{
                              fontSize: '0.82rem',
                              lineHeight: 1.7,
                              color: index === 0 ? '#3a5f85' : '#7a9abb',
                              display: 'flex',
                              gap: '10px',
                            }}
                          >
                            <span style={{ flexShrink: 0 }}>⭐</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div style={{ marginTop: '32px' }}>
                    <h4
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        marginBottom: '14px',
                        color: index === 0 ? '#012c56' : '#f0ece3',
                      }}
                    >
                      Tech Stack
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          style={{
                            padding: '6px 14px',
                            borderRadius: '100px',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            background:
                              index === 0 ? 'rgba(1, 44, 86, 0.08)' : 'rgba(224, 31, 55, 0.15)',
                            color: index === 0 ? '#012c56' : '#e01f37',
                            border:
                              index === 0
                                ? '1px solid rgba(1, 44, 86, 0.12)'
                                : '1px solid rgba(224, 31, 55, 0.2)',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[id^='exp-grid'] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}