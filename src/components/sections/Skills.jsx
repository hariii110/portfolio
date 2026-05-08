'use client'

import { useState } from 'react'
import skills from '@/data/skills'

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('frontend')

  const categories = [
    { id: 'frontend', label: 'Frontend',  icon: '🌐' },
    { id: 'backend',  label: 'Backend',   icon: '⚙️' },
    { id: 'database', label: 'Database',  icon: '🗄️' },
    { id: 'tools',    label: 'Tools',     icon: '🛠️' },
  ]

  const activeSkills = skills[activeCategory] || []

  return (
    <section className="section-wrapper" style={{ background: 'transparent' }}>
      <div className="section-container">

        {/* =====================
            HEADER
        ===================== */}
        <div className="section-header">
          <h2 className="section-title">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="section-subtitle">
            Technologies and tools I use to build amazing web applications
          </p>
          <div className="section-line" />
        </div>

        {/* =====================
            CATEGORY TABS
        ===================== */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '60px',
        }}>
          <div style={{
            display: 'flex',
            gap: '6px',
            padding: '6px',
            background: 'rgba(1, 44, 86, 0.5)',
            borderRadius: '16px',
            border: '1px solid rgba(10, 61, 110, 0.5)',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  background: activeCategory === cat.id ? '#e01f37' : 'transparent',
                  color: activeCategory === cat.id ? '#ffffff' : '#7a9abb',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* =====================
            SKILLS GRID
        ===================== */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {activeSkills.map((skill, index) => (
            <div
              key={skill.name}
              className={
                index === 0 ? 'card-cream' :
                index === activeSkills.length - 1 ? 'card-red' :
                'card'
              }
              style={{ padding: '32px' }}
            >
              {/* Skill Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: index === 0
                      ? 'rgba(1, 44, 86, 0.1)'
                      : index === activeSkills.length - 1
                        ? 'rgba(255, 255, 255, 0.15)'
                        : 'rgba(224, 31, 55, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                  }}>
                    {skill.icon}
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      marginBottom: '2px',
                    }}>
                      {skill.name}
                    </h3>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: index === 0
                        ? '#3a5f85'
                        : index === activeSkills.length - 1
                          ? '#f8d0d5'
                          : '#7a9abb',
                    }}>
                      {skill.level >= 80 ? 'Advanced' :
                       skill.level >= 60 ? 'Intermediate' :
                       'Learning'}
                    </span>
                  </div>
                </div>

                {/* Percentage */}
                <div style={{
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: index === 0
                    ? '#e01f37'
                    : index === activeSkills.length - 1
                      ? '#ffffff'
                      : '#e01f37',
                }}>
                  {skill.level}%
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{
                width: '100%',
                height: '8px',
                borderRadius: '100px',
                background: index === 0
                  ? 'rgba(1, 44, 86, 0.1)'
                  : index === activeSkills.length - 1
                    ? 'rgba(255, 255, 255, 0.2)'
                    : 'rgba(240, 236, 227, 0.1)',
                overflow: 'hidden',
              }}>
                <div style={{
                  width: `${skill.level}%`,
                  height: '100%',
                  borderRadius: '100px',
                  background: index === 0
                    ? '#e01f37'
                    : index === activeSkills.length - 1
                      ? '#f0ece3'
                      : 'linear-gradient(135deg, #e01f37, #f0ece3)',
                  transition: 'width 1s ease-out',
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* =====================
            BOTTOM STATS
        ===================== */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px',
          marginTop: '80px',
        }}>
          {[
            {
              number: categories.reduce((acc, cat) =>
                acc + (skills[cat.id]?.length || 0), 0
              ) + '+',
              label: 'Total Skills',
              bg: '#e01f37',
              color: '#ffffff',
              subColor: '#f8d0d5',
            },
            {
              number: skills.frontend?.length || 0,
              label: 'Frontend Skills',
              bg: '#f0ece3',
              color: '#012c56',
              subColor: '#3a5f85',
            },
            {
              number: skills.backend?.length || 0,
              label: 'Backend Skills',
              bg: 'rgba(1, 44, 86, 0.5)',
              color: '#f0ece3',
              subColor: '#7a9abb',
            },
            {
              number: skills.tools?.length || 0,
              label: 'Dev Tools',
              bg: '#f0ece3',
              color: '#012c56',
              subColor: '#3a5f85',
            },
          ].map(stat => (
            <div key={stat.label} style={{
              textAlign: 'center',
              padding: '32px 24px',
              borderRadius: '20px',
              background: stat.bg,
              border: stat.bg.includes('rgba') ? '1px solid rgba(10, 61, 110, 0.5)' : 'none',
            }}>
              <div style={{
                fontSize: '2.2rem',
                fontWeight: 700,
                color: stat.color,
                letterSpacing: '-0.02em',
              }}>
                {stat.number}
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: stat.subColor,
                marginTop: '4px',
                fontWeight: 700,
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}