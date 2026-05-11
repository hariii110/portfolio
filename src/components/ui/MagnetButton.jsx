'use client'

import { useRef } from 'react'

export default function MagnetButton({
  children,
  className = '',
  style = {},
  strength = 0.3,
  onClick,
  href,
  download,
}) {
  const ref = useRef(null)

  const handleMouseMove = (e) => {
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }

  const handleMouseLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0, 0)'
    el.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
  }

  const handleMouseEnter = () => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'none'
  }

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        download={download}
        className={className}
        style={{ display: 'inline-block', ...style }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={ref}
      className={className}
      style={{ display: 'inline-block', ...style }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </button>
  )
}