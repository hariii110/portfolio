'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

export default function RadarChart({
  data = [],
  size = 350,
  color = '#e01f37',
  labelColor = '#7a9abb',
  onSkillSelect,
  selectedSkill,
}) {
  const canvasRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [animProgress, setAnimProgress] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState(-1)

  // Increased canvas size for labels/overflow
  const canvasSize = size + 120

  useEffect(() => {
    const el = canvasRef.current
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

  useEffect(() => {
    if (!isVisible) return
    let start = null
    const duration = 1500
    const animate = (timestamp) => {
      if (!start) start = timestamp
      const elapsed = timestamp - start
      const progress = Math.min(elapsed / duration, 1)
      setAnimProgress(1 - Math.pow(1 - progress, 3))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isVisible])

  const getPointPos = useCallback((index, value, r, center) => {
    const sides = data.length
    const angleStep = (Math.PI * 2) / sides
    const angle = index * angleStep - Math.PI / 2
    const v = (value / 100) * r
    return {
      x: center + Math.cos(angle) * v,
      y: center + Math.sin(angle) * v,
      angle,
    }
  }, [data])

  // Click handler
  const handleCanvasClick = useCallback((e) => {
    const canvas = canvasRef.current
    if (!canvas || data.length === 0) return

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvasSize / rect.width
    const scaleY = canvasSize / rect.height
    const mx = (e.clientX - rect.left) * scaleX
    const my = (e.clientY - rect.top) * scaleY

    const center = canvasSize / 2
    const radius = size * 0.3

    // Check data points
    for (let i = 0; i < data.length; i++) {
      const boost = (i === selectedSkill) ? 1.12 : 1
      const pt = getPointPos(i, data[i].value * animProgress * boost, radius, center)
      const dx = mx - pt.x
      const dy = my - pt.y
      if (Math.sqrt(dx * dx + dy * dy) < 22) {
        if (onSkillSelect) onSkillSelect(selectedSkill === i ? -1 : i)
        return
      }
    }

    // Check labels
    const sides = data.length
    const angleStep = (Math.PI * 2) / sides
    for (let i = 0; i < sides; i++) {
      const angle = i * angleStep - Math.PI / 2
      const labelR = radius + 45
      const lx = center + Math.cos(angle) * labelR
      const ly = center + Math.sin(angle) * labelR
      const dx = mx - lx
      const dy = my - ly
      if (Math.sqrt(dx * dx + dy * dy) < 28) {
        if (onSkillSelect) onSkillSelect(selectedSkill === i ? -1 : i)
        return
      }
    }

    if (onSkillSelect) onSkillSelect(-1)
  }, [data, canvasSize, size, animProgress, getPointPos, onSkillSelect, selectedSkill])

  // Hover handler
  const handleMouseMove = useCallback((e) => {
    const canvas = canvasRef.current
    if (!canvas || data.length === 0) return

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvasSize / rect.width
    const scaleY = canvasSize / rect.height
    const mx = (e.clientX - rect.left) * scaleX
    const my = (e.clientY - rect.top) * scaleY

    const center = canvasSize / 2
    const radius = size * 0.3
    let found = -1

    // Check points
    for (let i = 0; i < data.length; i++) {
      const boost = (i === selectedSkill) ? 1.12 : 1
      const pt = getPointPos(i, data[i].value * animProgress * boost, radius, center)
      if (Math.sqrt((mx - pt.x) ** 2 + (my - pt.y) ** 2) < 22) {
        found = i
        break
      }
    }

    // Check labels
    if (found === -1) {
      const sides = data.length
      const angleStep = (Math.PI * 2) / sides
      for (let i = 0; i < sides; i++) {
        const angle = i * angleStep - Math.PI / 2
        const labelR = radius + 45
        const lx = center + Math.cos(angle) * labelR
        const ly = center + Math.sin(angle) * labelR
        if (Math.sqrt((mx - lx) ** 2 + (my - ly) ** 2) < 28) {
          found = i
          break
        }
      }
    }

    setHoveredIndex(found)
    canvas.style.cursor = found >= 0 ? 'pointer' : 'default'
  }, [data, canvasSize, size, animProgress, getPointPos, selectedSkill])

  // Draw
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || data.length === 0) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = canvasSize * dpr
    canvas.height = canvasSize * dpr
    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, canvasSize, canvasSize)

    const center = canvasSize / 2
    const radius = size * 0.3
    const sides = data.length
    const angleStep = (Math.PI * 2) / sides

    // Grid rings
    for (let ring = 1; ring <= 4; ring++) {
      const r = (radius / 4) * ring
      ctx.beginPath()
      for (let i = 0; i <= sides; i++) {
        const angle = i * angleStep - Math.PI / 2
        const x = center + Math.cos(angle) * r
        const y = center + Math.sin(angle) * r
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.strokeStyle = ring === 4
        ? 'rgba(224, 31, 55, 0.12)'
        : 'rgba(240, 236, 227, 0.06)'
      ctx.lineWidth = ring === 4 ? 1.5 : 1
      ctx.stroke()
    }

    // Axis lines
    for (let i = 0; i < sides; i++) {
      const angle = i * angleStep - Math.PI / 2
      const isActive = i === selectedSkill || i === hoveredIndex
      ctx.beginPath()
      ctx.moveTo(center, center)
      ctx.lineTo(
        center + Math.cos(angle) * radius,
        center + Math.sin(angle) * radius
      )
      ctx.strokeStyle = isActive
        ? 'rgba(224, 31, 55, 0.3)'
        : 'rgba(240, 236, 227, 0.06)'
      ctx.lineWidth = isActive ? 2 : 1
      ctx.stroke()
    }

    // Selected sector highlight
    if (selectedSkill >= 0 && selectedSkill < sides) {
      const angle = selectedSkill * angleStep - Math.PI / 2
      const halfStep = angleStep / 2

      ctx.beginPath()
      ctx.moveTo(center, center)
      ctx.arc(center, center, radius * 1.05, angle - halfStep, angle + halfStep)
      ctx.closePath()

      const sGrad = ctx.createRadialGradient(center, center, 0, center, center, radius * 1.05)
      sGrad.addColorStop(0, 'rgba(224, 31, 55, 0.12)')
      sGrad.addColorStop(1, 'rgba(224, 31, 55, 0.02)')
      ctx.fillStyle = sGrad
      ctx.fill()
    }

    // Data polygon
    ctx.beginPath()
    for (let i = 0; i < sides; i++) {
      const angle = i * angleStep - Math.PI / 2
      const boost = (i === selectedSkill) ? 1.12 : (i === hoveredIndex ? 1.06 : 1)
      const value = (data[i].value / 100) * radius * animProgress * boost
      const x = center + Math.cos(angle) * value
      const y = center + Math.sin(angle) * value
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.closePath()

    const gradient = ctx.createRadialGradient(center, center, 0, center, center, radius)
    gradient.addColorStop(0, 'rgba(224, 31, 55, 0.2)')
    gradient.addColorStop(0.5, 'rgba(224, 31, 55, 0.1)')
    gradient.addColorStop(1, 'rgba(26, 74, 122, 0.05)')
    ctx.fillStyle = gradient
    ctx.fill()

    ctx.shadowBlur = 12
    ctx.shadowColor = 'rgba(224, 31, 55, 0.4)'
    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.shadowBlur = 0

    // Data points
    for (let i = 0; i < sides; i++) {
      const angle = i * angleStep - Math.PI / 2
      const isActive = i === selectedSkill || i === hoveredIndex
      const boost = (i === selectedSkill) ? 1.12 : (i === hoveredIndex ? 1.06 : 1)
      const value = (data[i].value / 100) * radius * animProgress * boost
      const x = center + Math.cos(angle) * value
      const y = center + Math.sin(angle) * value

      // Outer glow
      ctx.beginPath()
      ctx.arc(x, y, isActive ? 12 : 7, 0, Math.PI * 2)
      ctx.fillStyle = isActive ? 'rgba(224,31,55,0.2)' : 'rgba(224,31,55,0.1)'
      ctx.fill()

      // Mid
      ctx.beginPath()
      ctx.arc(x, y, isActive ? 7 : 4, 0, Math.PI * 2)
      ctx.fillStyle = isActive ? 'rgba(224,31,55,0.45)' : 'rgba(224,31,55,0.25)'
      ctx.fill()

      // Core
      ctx.beginPath()
      ctx.arc(x, y, isActive ? 3.5 : 2.5, 0, Math.PI * 2)
      ctx.fillStyle = isActive ? '#ffffff' : '#f0ece3'
      ctx.fill()

      // Pulse ring
      if (i === selectedSkill) {
        ctx.beginPath()
        ctx.arc(x, y, 16, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(224, 31, 55, 0.15)'
        ctx.lineWidth = 1
        ctx.stroke()
      }
    }

    // Labels
    for (let i = 0; i < sides; i++) {
      const angle = i * angleStep - Math.PI / 2
      const isActive = i === selectedSkill || i === hoveredIndex
      const labelR = radius + 45

      const lx = center + Math.cos(angle) * labelR
      const ly = center + Math.sin(angle) * labelR

      // Adjust text alignment based on position
      const isLeft = Math.cos(angle) < -0.3
      const isRight = Math.cos(angle) > 0.3
      const isTop = Math.sin(angle) < -0.3

      ctx.font = `${isActive ? '700' : '600'} ${isActive ? '12' : '11'}px Panchang, system-ui, sans-serif`
      ctx.textBaseline = 'middle'

      // Smart text alignment
      if (isLeft) ctx.textAlign = 'right'
      else if (isRight) ctx.textAlign = 'left'
      else ctx.textAlign = 'center'

      const textWidth = ctx.measureText(data[i].label).width
      const padX = 10
      const padY = 10
      const bgW = textWidth + padX * 2
      const bgH = 20

      // Calculate bg position based on alignment
      let bgX
      if (ctx.textAlign === 'right') bgX = lx - bgW + padX
      else if (ctx.textAlign === 'left') bgX = lx - padX
      else bgX = lx - bgW / 2

      // Label background
      ctx.fillStyle = isActive ? 'rgba(224,31,55,0.12)' : 'rgba(1, 29, 58, 0.7)'
      ctx.beginPath()
      ctx.roundRect(bgX, ly - bgH / 2, bgW, bgH, 6)
      ctx.fill()

      if (isActive) {
        ctx.strokeStyle = 'rgba(224, 31, 55, 0.25)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.roundRect(bgX, ly - bgH / 2, bgW, bgH, 6)
        ctx.stroke()
      }

      // Label text
      ctx.fillStyle = isActive ? '#f0ece3' : labelColor
      ctx.fillText(data[i].label, lx, ly)

      // Value below label
      ctx.font = `700 ${isActive ? '11' : '10'}px Panchang, system-ui, sans-serif`
      ctx.fillStyle = isActive ? '#ffffff' : color
      ctx.fillText(
        `${Math.round(data[i].value * animProgress)}%`,
        lx,
        ly + 16
      )
    }

    // Center dot
    ctx.beginPath()
    ctx.arc(center, center, 3, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(240, 236, 227, 0.15)'
    ctx.fill()
  }, [data, canvasSize, size, color, labelColor, animProgress, selectedSkill, hoveredIndex])

  return (
    <canvas
      ref={canvasRef}
      onClick={handleCanvasClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredIndex(-1)}
      style={{
        width: `${canvasSize}px`,
        height: `${canvasSize}px`,
        touchAction: 'none',
      }}
    />
  )
}