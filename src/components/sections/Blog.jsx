'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import blogs, { blogCategories } from '@/data/blogs'
import { Calendar, Clock, ArrowRight, ChevronDown, ChevronUp, X } from 'lucide-react'

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function BlogCard({ blog, index }) {
  const [imgError, setImgError] = useState(false)
  const [expanded, setExpanded] = useState(false)

  return (
    <article
      style={{
        background: 'rgba(1, 44, 86, 0.5)',
        border: '1px solid rgba(10, 61, 110, 0.8)',
        borderRadius: '20px',
        overflow: 'hidden',
        transition: 'all 0.35s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)'
        e.currentTarget.style.borderColor = 'var(--red)'
        e.currentTarget.style.boxShadow = '0 20px 50px -12px rgba(224, 31, 55, 0.2)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.borderColor = 'rgba(10, 61, 110, 0.8)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Image */}
      <div style={{
        width: '100%',
        height: '220px',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, var(--navy-light), var(--navy))',
      }}>
        {!imgError ? (
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            style={{
              objectFit: 'cover',
              objectPosition: 'top center',
              transition: 'transform 0.5s ease',
            }}
            onError={() => setImgError(true)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
            }}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Calendar size={36} color="rgba(240,236,227,0.3)" />
          </div>
        )}

        {/* Category Badge */}
        <span style={{
          position: 'absolute',
          top: '16px', left: '16px',
          background: 'var(--red)',
          color: '#fff',
          padding: '6px 14px',
          borderRadius: '100px',
          fontSize: '0.7rem',
          fontWeight: '700',
          zIndex: 2,
        }}>
          {blog.category}
        </span>

        {/* Dark Overlay */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '60%',
          background: 'linear-gradient(to top, rgba(1, 29, 58, 0.8), transparent)',
          zIndex: 1,
          pointerEvents: 'none',
        }} />
      </div>

      {/* Content */}
      <div style={{ padding: '28px' }}>
        {/* Date & Read Time */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '14px',
        }}>
          <span style={{
            fontSize: '0.75rem',
            color: 'var(--muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <Calendar size={12} />
            {formatDate(blog.date)}
          </span>
          <span style={{
            fontSize: '0.75rem',
            color: 'var(--muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <Clock size={12} />
            {blog.readTime}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: '1.15rem',
          fontWeight: '700',
          color: 'var(--cream)',
          marginBottom: '12px',
          lineHeight: '1.4',
        }}>
          {blog.title}
        </h3>

        {/* Excerpt / Full Content */}
        <p style={{
          fontSize: '0.85rem',
          color: 'var(--muted)',
          lineHeight: '1.7',
          marginBottom: '20px',
          display: expanded ? 'block' : '-webkit-box',
          WebkitLineClamp: expanded ? 'unset' : 3,
          WebkitBoxOrient: 'vertical',
          overflow: expanded ? 'visible' : 'hidden',
        }}>
          {expanded ? blog.longDescription || blog.excerpt : blog.excerpt}
        </p>

        {/* Tags */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '20px',
        }}>
          {blog.tags.map((tag) => (
            <span key={tag} style={{
              padding: '4px 12px',
              borderRadius: '100px',
              fontSize: '0.7rem',
              fontWeight: '700',
              background: 'rgba(240, 236, 227, 0.08)',
              color: 'var(--cream)',
              border: '1px solid rgba(240, 236, 227, 0.15)',
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Read More Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--red)',
            fontSize: '0.85rem',
            fontWeight: '700',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0',
            transition: 'gap 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.gap = '12px'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.gap = '8px'
          }}
        >
          {expanded ? 'Show Less' : 'Read More'}
          {expanded ? <ChevronUp size={16} /> : <ArrowRight size={16} />}
        </button>
      </div>
    </article>
  )
}

function FeaturedBlog({ blog }) {
  const [imgError, setImgError] = useState(false)
  const [expanded, setExpanded] = useState(false)

  return (
    <article
      style={{
        background: 'rgba(1, 44, 86, 0.5)',
        border: '1px solid rgba(10, 61, 110, 0.8)',
        borderRadius: '24px',
        overflow: 'hidden',
        transition: 'all 0.35s ease',
        marginBottom: '60px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)'
        e.currentTarget.style.borderColor = 'var(--red)'
        e.currentTarget.style.boxShadow = '0 24px 60px -12px rgba(224, 31, 55, 0.2)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.borderColor = 'rgba(10, 61, 110, 0.8)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Image */}
      <div style={{
        width: '100%',
        height: '320px',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, var(--navy-light), var(--red-dark))',
      }}>
        {!imgError ? (
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            priority
            style={{
              objectFit: 'cover',
              objectPosition: 'top center',
              transition: 'transform 0.6s ease',
            }}
            onError={() => setImgError(true)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.03)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
            }}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Calendar size={48} color="rgba(240,236,227,0.3)" />
          </div>
        )}

        {/* Featured Badge */}
        <span style={{
          position: 'absolute',
          top: '20px', left: '20px',
          background: 'var(--red)',
          color: '#fff',
          padding: '8px 18px',
          borderRadius: '100px',
          fontSize: '0.75rem',
          fontWeight: '700',
          zIndex: 2,
        }}>
          Featured
        </span>

        {/* Dark Overlay */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '50%',
          background: 'linear-gradient(to top, rgba(1, 29, 58, 0.9), transparent)',
          zIndex: 1,
          pointerEvents: 'none',
        }} />
      </div>

      {/* Content */}
      <div style={{ padding: '36px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '16px',
          flexWrap: 'wrap',
        }}>
          <span style={{
            background: 'rgba(240, 236, 227, 0.1)',
            color: 'var(--cream)',
            padding: '6px 14px',
            borderRadius: '100px',
            fontSize: '0.7rem',
            fontWeight: '700',
            border: '1px solid rgba(240, 236, 227, 0.2)',
          }}>
            {blog.category}
          </span>
          <span style={{
            fontSize: '0.8rem',
            color: 'var(--muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <Calendar size={12} />
            {formatDate(blog.date)}
          </span>
          <span style={{
            fontSize: '0.8rem',
            color: 'var(--muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <Clock size={12} />
            {blog.readTime}
          </span>
        </div>

        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: 'var(--cream)',
          marginBottom: '16px',
          lineHeight: '1.3',
        }}>
          {blog.title}
        </h3>

        <p style={{
          fontSize: '0.9rem',
          color: 'var(--muted)',
          lineHeight: '1.8',
          marginBottom: '24px',
          maxWidth: '600px',
        }}>
          {expanded ? blog.longDescription || blog.excerpt : blog.excerpt}
        </p>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '24px',
        }}>
          {blog.tags.map((tag) => (
            <span key={tag} style={{
              padding: '6px 14px',
              borderRadius: '100px',
              fontSize: '0.7rem',
              fontWeight: '700',
              background: 'rgba(240, 236, 227, 0.08)',
              color: 'var(--cream)',
              border: '1px solid rgba(240, 236, 227, 0.15)',
            }}>
              {tag}
            </span>
          ))}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 28px',
            borderRadius: '14px',
            background: 'var(--red)',
            color: '#fff',
            fontSize: '0.85rem',
            fontWeight: '700',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(224,31,55,0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          {expanded ? 'Show Less' : 'Read Article'}
          {expanded ? <ChevronUp size={16} /> : <ArrowRight size={16} />}
        </button>
      </div>
    </article>
  )
}

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('all')

  const featuredBlog = useMemo(
    () => blogs.find((b) => b.featured),
    []
  )

  const filteredBlogs = useMemo(() => {
    const filtered =
      activeCategory === 'all'
        ? blogs
        : blogs.filter((b) => b.category === activeCategory)

    if (activeCategory === 'all' && featuredBlog) {
      return filtered.filter((b) => b.id !== featuredBlog.id)
    }
    return filtered
  }, [activeCategory, featuredBlog])

  return (
    <div className="section-wrapper">
      <div className="section-container">
        {/* Header */}
        <div className="section-header">
          <h2 className="section-title">
            Latest <span className="gradient-text">Blog Posts</span>
          </h2>
          <p className="section-subtitle">
            I write about web development, programming tips
            and things I learn along the way.
          </p>
          <div className="section-line" />
        </div>

        {/* Category Filter */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '50px',
        }}>
          {blogCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: '10px 24px',
                borderRadius: '100px',
                fontSize: '0.8rem',
                fontWeight: '700',
                border: activeCategory === cat.id
                  ? 'none'
                  : '1px solid rgba(240, 236, 227, 0.15)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background: activeCategory === cat.id
                  ? 'var(--red)'
                  : 'rgba(240, 236, 227, 0.08)',
                color: activeCategory === cat.id
                  ? '#ffffff'
                  : 'var(--cream)',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Featured Blog */}
        {activeCategory === 'all' && featuredBlog && (
          <FeaturedBlog blog={featuredBlog} />
        )}

        {/* Blog Grid */}
        {filteredBlogs.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '30px',
          }}>
            {filteredBlogs.map((blog, i) => (
              <BlogCard key={blog.id} blog={blog} index={i} />
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: 'var(--muted)',
          }}>
            <p style={{ fontSize: '1rem' }}>
              No posts in this category yet.
            </p>
          </div>
        )}

        {/* Blog Stats */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
          marginTop: '60px',
          flexWrap: 'wrap',
        }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: 'var(--red)',
            }}>
              {blogs.length}
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
              Total Posts
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: 'var(--cream)',
            }}>
              {blogCategories.length - 1}
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
              Categories
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: 'var(--cream)',
            }}>
              {blogs.filter((b) => b.featured).length}
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
              Featured
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}