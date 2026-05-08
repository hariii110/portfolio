'use client'

import { useState } from 'react'
import projects, { categories } from '@/data/projects'

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  return (
    <section className="section-wrapper" style={{ background: 'transparent' }}>
      <div className="section-container">

        {/* =====================
            HEADER
        ===================== */}
        <div className="section-header">
          <h2 className="section-title">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            Real projects I have built using modern technologies
          </p>
          <div className="section-line" />
        </div>

        {/* =====================
            FILTER TABS
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
                onClick={() => setActiveFilter(cat.id)}
                style={{
                  padding: '10px 22px',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  background: activeFilter === cat.id ? '#e01f37' : 'transparent',
                  color: activeFilter === cat.id ? '#ffffff' : '#7a9abb',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* =====================
            PROJECTS GRID
        ===================== */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '32px',
        }}>
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={
                index === 0 ? 'card-cream' :
                index === 1 ? 'card-red' :
                'card'
              }
              style={{
                padding: '0',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >

              {/* =====================
                  PROJECT IMAGE / HEADER
              ===================== */}
              <div style={{
                height: '200px',
                background: index === 0
                  ? 'linear-gradient(135deg, #012c56, #0a3d6e)'
                  : index === 1
                    ? 'linear-gradient(135deg, #b81828, #e01f37)'
                    : 'linear-gradient(135deg, #0a3d6e, #1a4a7a)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}>

                {/* Decorative circles */}
                <div style={{
                  position: 'absolute',
                  top: '-20px', right: '-20px',
                  width: '120px', height: '120px',
                  borderRadius: '50%',
                  background: 'rgba(240, 236, 227, 0.05)',
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: '-30px', left: '-30px',
                  width: '150px', height: '150px',
                  borderRadius: '50%',
                  background: 'rgba(224, 31, 55, 0.08)',
                }} />

                {/* Project icon */}
                <div style={{
                  fontSize: '3.5rem',
                  zIndex: 1,
                }}>
                  {project.category === 'frontend' ? '🎨' :
                   project.category === 'backend' ? '⚙️' :
                   project.category === 'fullstack' ? '🚀' : '💻'}
                </div>

                {/* Featured badge */}
                {project.featured && (
                  <div style={{
                    position: 'absolute',
                    top: '16px', right: '16px',
                    padding: '6px 14px',
                    borderRadius: '100px',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    background: '#f0ece3',
                    color: '#012c56',
                    zIndex: 1,
                  }}>
                    ⭐ Featured
                  </div>
                )}
              </div>

              {/* =====================
                  PROJECT CONTENT
              ===================== */}
              <div style={{
                padding: '32px',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
              }}>

                {/* Category badge */}
                <div style={{ marginBottom: '16px' }}>
                  <span style={{
                    padding: '6px 14px',
                    borderRadius: '100px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    background: index === 0
                      ? 'rgba(1, 44, 86, 0.1)'
                      : index === 1
                        ? 'rgba(255, 255, 255, 0.15)'
                        : 'rgba(224, 31, 55, 0.15)',
                    color: index === 0
                      ? '#012c56'
                      : index === 1
                        ? '#ffffff'
                        : '#e01f37',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  marginBottom: '12px',
                  color: index === 0 ? '#012c56' :
                         index === 1 ? '#ffffff' : '#f0ece3',
                }}>
                  {project.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: '0.88rem',
                  lineHeight: 1.8,
                  marginBottom: '24px',
                  flex: 1,
                  color: index === 0 ? '#3a5f85' :
                         index === 1 ? '#f8d0d5' : '#7a9abb',
                }}>
                  {project.description}
                </p>

                {/* Tech tags */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginBottom: '24px',
                }}>
                  {project.tags.map(tag => (
                    <span key={tag} style={{
                      padding: '5px 12px',
                      borderRadius: '100px',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      background: index === 0
                        ? 'rgba(1, 44, 86, 0.08)'
                        : index === 1
                          ? 'rgba(255, 255, 255, 0.15)'
                          : 'rgba(240, 236, 227, 0.08)',
                      color: index === 0
                        ? '#012c56'
                        : index === 1
                          ? '#ffffff'
                          : '#a0b8d0',
                      border: index === 0
                        ? '1px solid rgba(1, 44, 86, 0.15)'
                        : index === 1
                          ? '1px solid rgba(255, 255, 255, 0.2)'
                          : '1px solid rgba(240, 236, 227, 0.1)',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  marginTop: 'auto',
                }}>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        flex: 1,
                        padding: '12px 20px',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        textDecoration: 'none',
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                        background: index === 0
                          ? '#012c56'
                          : index === 1
                            ? 'rgba(255, 255, 255, 0.15)'
                            : 'rgba(240, 236, 227, 0.1)',
                        color: index === 0
                          ? '#f0ece3'
                          : '#ffffff',
                        border: index === 1
                          ? '1px solid rgba(255, 255, 255, 0.3)'
                          : index === 0
                            ? 'none'
                            : '1px solid rgba(240, 236, 227, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                      }}
                    >
                      <span>💻</span> GitHub
                    </a>
                  )}

                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        flex: 1,
                        padding: '12px 20px',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        textDecoration: 'none',
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                        background: index === 0
                          ? '#e01f37'
                          : index === 1
                            ? '#f0ece3'
                            : '#e01f37',
                        color: index === 0
                          ? '#ffffff'
                          : index === 1
                            ? '#012c56'
                            : '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                      }}
                    >
                      <span>🚀</span> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* =====================
            NO PROJECTS MESSAGE
        ===================== */}
        {filteredProjects.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '80px 24px',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
            <h3 style={{
              fontSize: '1.2rem',
              fontWeight: 700,
              marginBottom: '8px',
              color: '#f0ece3',
            }}>
              No projects found
            </h3>
            <p style={{
              color: '#7a9abb',
              fontSize: '0.9rem',
            }}>
              Try selecting a different category
            </p>
          </div>
        )}

        {/* =====================
            BOTTOM CTA
        ===================== */}
        <div style={{
          textAlign: 'center',
          marginTop: '80px',
        }}>
          <div className="card-cream" style={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '48px 64px',
            gap: '20px',
          }}>
            <div style={{ fontSize: '2.5rem' }}>💡</div>
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: 700,
              color: '#012c56',
            }}>
              Want to see more?
            </h3>
            <p style={{
              fontSize: '0.9rem',
              color: '#3a5f85',
              maxWidth: '400px',
              lineHeight: 1.8,
            }}>
              Check out my GitHub for more projects and contributions
            </p>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ textDecoration: 'none', marginTop: '8px' }}
            >
              Visit GitHub 🐙
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}