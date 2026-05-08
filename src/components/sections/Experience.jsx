'use client'

import experience from '@/data/experience'

export default function Experience() {
  return (
    <section className="section-wrapper" style={{ background: 'transparent' }}>
      <div className="section-container">

        {/* =====================
            HEADER
        ===================== */}
        <div className="section-header">
          <h2 className="section-title">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="section-subtitle">
            My professional journey and internship experience
          </p>
          <div className="section-line" />
        </div>

        {/* =====================
            TIMELINE
        ===================== */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '48px',
        }}>
          {experience.map((exp, index) => (
            <div key={exp.id} style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '32px',
            }} id={`exp-${index}`}>

              {/* =====================
                  MAIN CARD
              ===================== */}
              <div className="card" style={{ padding: '44px' }}>

                {/* Top Row: Role + Duration */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '16px',
                  marginBottom: '24px',
                }}>
                  <div>
                    <h3 style={{
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      marginBottom: '8px',
                      color: '#f0ece3',
                    }}>
                      {exp.role}
                    </h3>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      flexWrap: 'wrap',
                    }}>
                      <span style={{
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        color: '#e01f37',
                      }}>
                        {exp.company}
                      </span>
                      <span style={{
                        width: '4px', height: '4px',
                        borderRadius: '50%',
                        background: '#7a9abb',
                      }} />
                      <span style={{
                        fontSize: '0.85rem',
                        color: '#7a9abb',
                      }}>
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '8px',
                  }}>
                    <span className="badge-red">
                      {exp.type}
                    </span>
                    <span className="badge">
                      {exp.duration}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p style={{
                  color: '#7a9abb',
                  lineHeight: 2,
                  fontSize: '0.95rem',
                  marginBottom: '32px',
                  paddingBottom: '32px',
                  borderBottom: '1px solid rgba(10, 61, 110, 0.5)',
                }}>
                  {exp.description}
                </p>

                {/* Two Columns: Responsibilities + Achievements */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '32px',
                }} id={`exp-cols-${index}`}>

                  {/* Responsibilities */}
                  <div>
                    <h4 style={{
                      fontSize: '1rem',
                      fontWeight: 700,
                      marginBottom: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#f0ece3',
                    }}>
                      <span className="dot-cream" /> Responsibilities
                    </h4>

                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                    }}>
                      {exp.responsibilities.map((item, i) => (
                        <div key={i} style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '12px',
                        }}>
                          <span style={{
                            color: '#e01f37',
                            fontSize: '0.8rem',
                            marginTop: '6px',
                            flexShrink: 0,
                          }}>▸</span>
                          <span style={{
                            color: '#7a9abb',
                            fontSize: '0.85rem',
                            lineHeight: 1.8,
                          }}>
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 style={{
                      fontSize: '1rem',
                      fontWeight: 700,
                      marginBottom: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#f0ece3',
                    }}>
                      <span className="dot-red" /> Achievements
                    </h4>

                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '14px',
                    }}>
                      {exp.achievements.map((item, i) => (
                        <div key={i} className="card-cream" style={{
                          padding: '16px 20px',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '12px',
                        }}>
                          <span style={{ fontSize: '1rem' }}>🏆</span>
                          <span style={{
                            fontSize: '0.85rem',
                            lineHeight: 1.7,
                            color: '#012c56',
                            fontWeight: 400,
                          }}>
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tech Stack */}
                <div style={{ marginTop: '32px' }}>
                  <h4 style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    marginBottom: '16px',
                    color: '#7a9abb',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}>
                    Tech Stack Used
                  </h4>

                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                  }}>
                    {exp.tech.map((tech, i) => (
                      <span
                        key={tech}
                        style={{
                          padding: '8px 18px',
                          borderRadius: '100px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          background: i % 3 === 0
                            ? '#e01f37'
                            : i % 3 === 1
                              ? '#f0ece3'
                              : 'rgba(240, 236, 227, 0.1)',
                          color: i % 3 === 0
                            ? '#ffffff'
                            : i % 3 === 1
                              ? '#012c56'
                              : '#f0ece3',
                          border: i % 3 === 2
                            ? '1px solid rgba(240, 236, 227, 0.2)'
                            : 'none',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Responsive columns */}
      <style jsx>{`
        @media (min-width: 768px) {
          [id^="exp-cols-"] {
            grid-template-columns: 1.2fr 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}