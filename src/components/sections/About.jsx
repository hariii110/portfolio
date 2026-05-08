'use client'

import { useState } from 'react'
import personal from '@/data/personal'

export default function About() {
  const [activeTab, setActiveTab] = useState('intro')

  const tabs = [
    { id: 'intro',     label: 'About Me',  icon: '👤' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'goals',     label: 'Goals',     icon: '🎯' },
  ]

  // 2 columns: left and right side by side
  const highlights = [
    [
      { icon: '💻', title: 'Clean Code',     desc: 'I write readable, maintainable and well-structured code' },
      { icon: '🤝', title: 'Team Player',    desc: 'I work well in teams and communicate effectively' },
    ],
    [
      { icon: '🚀', title: 'Fast Learner',   desc: 'I pick up new technologies and concepts quickly' },
      { icon: '🎯', title: 'Problem Solver', desc: 'I enjoy breaking down complex problems into simple solutions' },
    ],
  ]

  // 2 columns: Learning beside Impact
  const goalsList = [
    [
      { icon: '🎯', title: 'Short Term', desc: 'Land a full-time developer role and contribute to real products' },
      { icon: '📚', title: 'Learning',   desc: 'Master TypeScript, system design and cloud technologies' },
    ],
    [
      { icon: '🚀', title: 'Long Term',  desc: 'Become a senior full-stack developer and lead my own projects' },
      { icon: '🌍', title: 'Impact',     desc: 'Build products that solve real problems and help real people' },
    ],
  ]

  const infoItems = [
    { icon: '👤', label: 'Name',     value: personal.name     },
    { icon: '💼', label: 'Role',     value: personal.role     },
    { icon: '📍', label: 'Location', value: personal.location },
    { icon: '📧', label: 'Email',    value: personal.email    },
  ]

  return (
    <section className="section-wrapper" style={{ background: 'transparent' }}>
      <div className="section-container">

        <div className="section-header">
          <h2 className="section-title">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="section-subtitle">
            Get to know me better — who I am, my education and my goals
          </p>
          <div className="section-line" />
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr', gap: '60px',
        }} id="about-grid">

          {/* Left */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{
                width: '200px', height: '200px', borderRadius: '24px',
                padding: '4px',
                background: 'linear-gradient(135deg, #f0ece3, #e01f37)',
              }}>
                <div style={{
                  width: '100%', height: '100%', borderRadius: '22px',
                  background: '#012c56',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '5rem',
                }}>👨‍💻</div>
              </div>
            </div>

            {/* Info Card - Cream */}
            <div className="card-cream" style={{ padding: '36px' }}>
              <h3 style={{
                fontSize: '1.05rem', fontWeight: 700, marginBottom: '24px',
                display: 'flex', alignItems: 'center', gap: '8px',
                color: '#012c56',
              }}>
                <span className="dot-red" /> Quick Info
              </h3>

              {infoItems.map(item => (
                <div key={item.label} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '16px',
                  padding: '14px 0',
                  borderBottom: '1px solid rgba(1, 44, 86, 0.1)',
                }}>
                  <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                  <div>
                    <div style={{
                      fontSize: '0.65rem', fontWeight: 700,
                      color: '#3a5f85', textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}>{item.label}</div>
                    <div style={{
                      fontSize: '0.9rem', fontWeight: 700, marginTop: '4px',
                      color: '#012c56',
                    }}>{item.value}</div>
                  </div>
                </div>
              ))}

              <a href={personal.resumeUrl} download className="btn-primary"
                style={{
                  width: '100%', marginTop: '24px',
                  textDecoration: 'none', textAlign: 'center',
                  fontSize: '0.85rem',
                }}>
                📄 Download Resume
              </a>
            </div>
          </div>

          {/* Right */}
          <div>

            {/* Tabs */}
            <div style={{
              display: 'flex', gap: '6px', marginBottom: '40px',
              padding: '6px',
              background: 'rgba(1, 44, 86, 0.5)',
              borderRadius: '16px',
              border: '1px solid rgba(10, 61, 110, 0.5)',
              width: 'fit-content',
            }}>
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '10px 20px', borderRadius: '12px',
                    fontSize: '0.8rem', fontWeight: 700,
                    border: 'none', cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    background: activeTab === tab.id ? '#e01f37' : 'transparent',
                    color: activeTab === tab.id ? '#ffffff' : '#7a9abb',
                  }}>
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            {/* About Tab */}
            {activeTab === 'intro' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div className="card" style={{ padding: '44px' }}>
                  <h3 style={{
                    fontSize: '1.4rem', fontWeight: 700, marginBottom: '20px',
                    display: 'flex', alignItems: 'center', gap: '10px',
                  }}>
                    <span className="dot-cream" /> Who am I?
                  </h3>
                  <p style={{
                    color: '#7a9abb', lineHeight: 2.1, fontSize: '0.95rem',
                  }}>{personal.about.intro}</p>
                </div>

                {/* 2x2 Grid - Team Player beside Problem Solver */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px',
                }}>
                  {/* Column 1 */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {highlights[0].map((item, i) => (
                      <div key={item.title}
                        className={i === 0 ? 'card-cream' : 'card-red'}>
                        <div style={{ fontSize: '2.2rem', marginBottom: '16px' }}>{item.icon}</div>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px' }}>{item.title}</h4>
                        <p style={{ fontSize: '0.85rem', lineHeight: 1.8 }}>{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Column 2 */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {highlights[1].map((item, i) => (
                      <div key={item.title}
                        className={i === 1 ? 'card-cream' : 'card-red'}>
                        <div style={{ fontSize: '2.2rem', marginBottom: '16px' }}>{item.icon}</div>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px' }}>{item.title}</h4>
                        <p style={{ fontSize: '0.85rem', lineHeight: 1.8 }}>{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Education Tab */}
            {activeTab === 'education' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {personal.about.education.map((edu, i) => (
                  <div key={i} className="card" style={{
                    display: 'flex', alignItems: 'flex-start', gap: '24px', padding: '36px',
                  }}>
                    <div style={{
                      width: '52px', height: '52px', borderRadius: '14px',
                      background: 'rgba(224, 31, 55, 0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.6rem', flexShrink: 0,
                    }}>🎓</div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        display: 'flex', justifyContent: 'space-between',
                        alignItems: 'flex-start', flexWrap: 'wrap',
                        gap: '8px', marginBottom: '10px',
                      }}>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{edu.degree}</h3>
                        <span className="badge">{edu.year}</span>
                      </div>
                      <p style={{ color: '#7a9abb', fontSize: '0.85rem', marginBottom: '12px' }}>
                        {edu.school}
                      </p>
                      <span className="badge-red">⭐ {edu.score}</span>
                    </div>
                  </div>
                ))}

                <div className="card-cream" style={{
                  display: 'flex', gap: '20px', alignItems: 'flex-start',
                }}>
                  <span style={{ fontSize: '1.8rem' }}>💡</span>
                  <div>
                    <h4 style={{
                      fontSize: '1rem', fontWeight: 700,
                      marginBottom: '8px', color: '#012c56',
                    }}>Self Learner</h4>
                    <p style={{
                      fontSize: '0.85rem', lineHeight: 1.9,
                      color: '#3a5f85',
                    }}>
                      Apart from formal education, I continuously learn through
                      online courses, documentation, YouTube and building real projects.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Goals Tab - Learning beside Impact */}
            {activeTab === 'goals' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

                <div className="card-red" style={{ padding: '44px' }}>
                  <h3 style={{
                    fontSize: '1.4rem', fontWeight: 700, marginBottom: '20px',
                    display: 'flex', alignItems: 'center', gap: '10px',
                    color: '#ffffff',
                  }}>
                    <span style={{
                      width: '10px', height: '10px', borderRadius: '50%',
                      background: '#f0ece3', display: 'inline-block',
                    }} /> My Goals
                  </h3>
                  <p style={{
                    color: '#f8d0d5', lineHeight: 2.1, fontSize: '0.95rem',
                  }}>{personal.about.goals}</p>
                </div>

                {/* 2x2 Grid - Learning beside Impact */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px',
                }}>
                  {/* Column 1 */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {goalsList[0].map((item, i) => (
                      <div key={item.title}
                        className={i === 0 ? 'card-cream' : 'card'}>
                        <div style={{ fontSize: '2.2rem', marginBottom: '16px' }}>{item.icon}</div>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px' }}>{item.title}</h4>
                        <p style={{ fontSize: '0.85rem', lineHeight: 1.8 }}>{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Column 2 */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {goalsList[1].map((item, i) => (
                      <div key={item.title}
                        className={i === 0 ? 'card' : 'card-cream'}>
                        <div style={{ fontSize: '2.2rem', marginBottom: '16px' }}>{item.icon}</div>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px' }}>{item.title}</h4>
                        <p style={{ fontSize: '0.85rem', lineHeight: 1.8 }}>{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 1024px) {
          #about-grid { grid-template-columns: 380px 1fr !important; }
        }
        @media (max-width: 640px) {
          #about-grid div[style*="gridTemplateColumns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}