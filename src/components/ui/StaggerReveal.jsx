'use client'

import { useEffect, useRef, useState } from 'react'

export default function StaggerReveal({
  children,
  staggerDelay = 0.1,
  direction = 'up',
  distance = 30,
  duration = 0.5,
}) {
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
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const getTransform = (visible) => {
    if (visible) return 'translate3d(0, 0, 0)'
    switch (direction) {
      case 'up':    return `translate3d(0, ${distance}px, 0)`
      case 'down':  return `translate3d(0, -${distance}px, 0)`
      case 'left':  return `translate3d(${distance}px, 0, 0)`
      case 'right': return `translate3d(-${distance}px, 0, 0)`
      default:      return `translate3d(0, ${distance}px, 0)`
    }
  }

  return (
    <div ref={ref}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <div
              key={index}
              style={{
                transform: getTransform(isVisible),
                opacity: isVisible ? 1 : 0,
                transition: `all ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${index * staggerDelay}s`,
                willChange: 'transform, opacity',
              }}
            >
              {child}
            </div>
          ))
        : (
            <div style={{
              transform: getTransform(isVisible),
              opacity: isVisible ? 1 : 0,
              transition: `all ${duration}s cubic-bezier(0.16, 1, 0.3, 1)`,
            }}>
              {children}
            </div>
          )
      }
    </div>
  )
}