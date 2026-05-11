'use client'

import { useEffect, useRef, useState } from 'react'

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 40,
  once = true,
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
          if (once) observer.unobserve(el)
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [once])

  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0)'
    switch (direction) {
      case 'up':    return `translate3d(0, ${distance}px, 0)`
      case 'down':  return `translate3d(0, -${distance}px, 0)`
      case 'left':  return `translate3d(${distance}px, 0, 0)`
      case 'right': return `translate3d(-${distance}px, 0, 0)`
      case 'scale': return 'scale(0.9)'
      default:      return `translate3d(0, ${distance}px, 0)`
    }
  }

  return (
    <div
      ref={ref}
      style={{
        transform: getTransform(),
        opacity: isVisible ? 1 : 0,
        transition: `all ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  )
}