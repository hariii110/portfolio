'use client'

import { useEffect, useRef, useState } from 'react'

export default function AnimatedTitle({ children, className = '' }) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const text = typeof children === 'string' ? children : ''
  const words = text.split(' ')

  if (!text) {
    return (
      <span
        ref={ref}
        className={className}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s ease',
          display: 'inline',
        }}
      >
        {children}
      </span>
    )
  }

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: `all 0.5s ease ${i * 0.08}s`,
            marginRight: '0.3em',
          }}
        >
          {word}
        </span>
      ))}
    </span>
  )
}