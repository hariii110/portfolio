'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'

const ReactGlobe = dynamic(
  () => import('react-globe.gl'),
  { ssr: false }
)

export default function LocationGlobe({ size = 380 }) {
  const globeRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [globeReady, setGlobeReady] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef(null)

  const KOCHI = { lat: 9.9312, lng: 76.2673 }

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const onGlobeReady = useCallback(() => {
    setGlobeReady(true)
  }, [])

  useEffect(() => {
    if (!globeRef.current || !globeReady) return

    const globe = globeRef.current
    const controls = globe.controls()

    controls.autoRotate = true
    controls.autoRotateSpeed = 0.6
    controls.enableRotate = true
    controls.enableZoom = false
    controls.enablePan = false
    controls.enableDamping = true
    controls.dampingFactor = 0.1
    controls.rotateSpeed = 0.8

    const canvas = globe.renderer().domElement
    if (canvas) {
      canvas.style.pointerEvents = 'auto'
      canvas.style.touchAction = 'none'
      canvas.style.cursor = 'grab'

      const onDown = () => {
        canvas.style.cursor = 'grabbing'
        controls.autoRotate = false
      }
      const onUp = () => {
        canvas.style.cursor = 'grab'
        setTimeout(() => {
          if (controls) {
            controls.autoRotate = true
            controls.autoRotateSpeed = 0.2
          }
        }, 3000)
      }

      canvas.addEventListener('pointerdown', onDown)
      canvas.addEventListener('pointerup', onUp)
      canvas.addEventListener('touchstart', onDown, { passive: true })
      canvas.addEventListener('touchend', onUp)
    }

    globe.pointOfView({ lat: 20, lng: 78, altitude: 2.5 }, 0)

    const timer = setTimeout(() => {
      controls.autoRotate = false
      globe.pointOfView(
        { lat: KOCHI.lat, lng: KOCHI.lng, altitude: 1.5 },
        3000
      )
      setTimeout(() => {
        setIsZoomed(true)
        setTimeout(() => {
          controls.autoRotate = true
          controls.autoRotateSpeed = 0.2
        }, 2000)
      }, 3000)
    }, 5000)

    return () => clearTimeout(timer)
  }, [globeReady])

  const cities = [
    { lat: 28.6, lng: 77.2, region: 'in' },
    { lat: 19.0, lng: 72.8, region: 'in' },
    { lat: 13.0, lng: 80.2, region: 'in' },
    { lat: 12.9, lng: 77.5, region: 'in' },
    { lat: 22.5, lng: 88.3, region: 'in' },
    { lat: 17.3, lng: 78.4, region: 'in' },
    { lat: 10.0, lng: 76.2, region: 'in' },
    { lat: 8.5, lng: 76.9, region: 'in' },
    { lat: 9.93, lng: 76.26, region: 'in' },
    { lat: 40.7, lng: -74.0, region: 'na' },
    { lat: 34.0, lng: -118.2, region: 'na' },
    { lat: 37.7, lng: -122.4, region: 'na' },
    { lat: 41.8, lng: -87.6, region: 'na' },
    { lat: 51.5, lng: -0.1, region: 'eu' },
    { lat: 48.8, lng: 2.3, region: 'eu' },
    { lat: 52.5, lng: 13.4, region: 'eu' },
    { lat: 55.7, lng: 37.6, region: 'eu' },
    { lat: 35.6, lng: 139.6, region: 'ea' },
    { lat: 31.2, lng: 121.4, region: 'ea' },
    { lat: 39.9, lng: 116.4, region: 'ea' },
    { lat: 22.3, lng: 114.1, region: 'ea' },
    { lat: 37.5, lng: 126.9, region: 'ea' },
    { lat: 1.3, lng: 103.8, region: 'sea' },
    { lat: 13.7, lng: 100.5, region: 'sea' },
    { lat: 25.2, lng: 55.2, region: 'me' },
    { lat: 30.0, lng: 31.2, region: 'me' },
    { lat: -23.5, lng: -46.6, region: 'sa' },
    { lat: -34.6, lng: -58.3, region: 'sa' },
    { lat: -33.8, lng: 151.2, region: 'au' },
    { lat: -37.8, lng: 144.9, region: 'au' },
  ]

  const arcsData = []
  for (let i = 0; i < cities.length; i++) {
    for (let j = i + 1; j < cities.length; j++) {
      if (cities[i].region !== cities[j].region) continue
      const dLat = cities[i].lat - cities[j].lat
      const dLng = cities[i].lng - cities[j].lng
      const dist = Math.sqrt(dLat * dLat + dLng * dLng)
      if (dist < 20) {
        arcsData.push({
          startLat: cities[i].lat, startLng: cities[i].lng,
          endLat: cities[j].lat, endLng: cities[j].lng,
          isKochi: false,
        })
      }
    }
  }

  const hubCoords = [
    { lat: 25.2, lng: 55.2 },
    { lat: 1.3, lng: 103.8 },
    { lat: 19.0, lng: 72.8 },
    { lat: 28.6, lng: 77.2 },
    { lat: 51.5, lng: -0.1 },
    { lat: 35.6, lng: 139.6 },
  ]
  hubCoords.forEach((hub) => {
    arcsData.push({
      startLat: KOCHI.lat, startLng: KOCHI.lng,
      endLat: hub.lat, endLng: hub.lng,
      isKochi: true,
    })
  })

  const ringsData = [
    { lat: KOCHI.lat, lng: KOCHI.lng, maxR: 3, propagationSpeed: 2, repeatPeriod: 1000 },
    { lat: KOCHI.lat, lng: KOCHI.lng, maxR: 5, propagationSpeed: 1.5, repeatPeriod: 1500 },
  ]

  const hexData = cities.map((c) => ({
    lat: c.lat, lng: c.lng,
    w: (c.lat === KOCHI.lat && c.lng === KOCHI.lng) ? 0.8 : 0.3,
  }))

  // Mobile - simple static version
  if (isMobile) {
    return (
      <div
        ref={containerRef}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(26, 74, 122, 0.3) 0%, rgba(1, 29, 58, 0.5) 70%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(10, 61, 110, 0.3)',
          boxShadow: '0 0 30px rgba(26, 74, 122, 0.15)',
          maxWidth: '100%',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px', height: '40px',
            borderRadius: '50%',
            background: 'rgba(224, 31, 55, 0.15)',
            border: '1px solid rgba(224, 31, 55, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 10px',
          }}>
            <div style={{
              width: '8px', height: '8px',
              borderRadius: '50%',
              background: '#e01f37',
              animation: 'pulse 2s ease infinite',
            }} />
          </div>
          <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f0ece3', marginBottom: '4px' }}>
            Kochi, Kerala
          </p>
          <p style={{ fontSize: '0.65rem', color: '#7a9abb' }}>India</p>
        </div>

        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.3); }
          }
        `}</style>
      </div>
    )
  }

  if (!isVisible) {
    return (
      <div
        ref={containerRef}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          background: 'rgba(1, 29, 58, 0.3)',
        }}
      />
    )
  }

  return (
    <div
      ref={containerRef}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        position: 'relative',
        cursor: 'grab',
        touchAction: 'none',
      }}
    >
      {/* Outer glow */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: `${size * 1.8}px`,
        height: `${size * 1.8}px`,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(80,150,255,0.15) 0%, rgba(50,120,220,0.08) 25%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
        animation: 'auraOuter 5s ease-in-out infinite',
      }} />

      {/* Mid glow */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: `${size * 1.5}px`,
        height: `${size * 1.5}px`,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(100,170,255,0.2) 0%, rgba(60,130,220,0.1) 30%, transparent 75%)',
        pointerEvents: 'none',
        zIndex: 0,
        animation: 'auraMid 4s ease-in-out infinite reverse',
      }} />

      {/* Globe */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        pointerEvents: 'auto',
      }}>
        <ReactGlobe
          ref={globeRef}
          width={size}
          height={size}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl="https://unpkg.com/three-globe/example/img/earth-night.jpg"
          bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
          showAtmosphere={true}
          atmosphereColor="#4488cc"
          atmosphereAltitude={0.25}
          onGlobeReady={onGlobeReady}
          animateIn={true}

          hexBinPointsData={hexData}
          hexBinPointLat="lat"
          hexBinPointLng="lng"
          hexBinPointWeight="w"
          hexBinResolution={4}
          hexTopColor={() => 'rgba(255, 220, 100, 0.7)'}
          hexSideColor={() => 'rgba(255, 200, 80, 0.4)'}
          hexAltitude={0.006}
          hexTopCurvatureResolution={0}

          arcsData={arcsData}
          arcStartLat="startLat"
          arcStartLng="startLng"
          arcEndLat="endLat"
          arcEndLng="endLng"
          arcColor={(d) =>
            d.isKochi
              ? ['rgba(224, 31, 55, 0.7)', 'rgba(224, 31, 55, 0.2)']
              : ['rgba(255, 220, 100, 0.35)', 'rgba(255, 200, 80, 0.1)']
          }
          arcAltitude={(d) => (d.isKochi ? 0.15 : 0.02)}
          arcStroke={(d) => (d.isKochi ? 0.8 : 0.3)}
          arcDashLength={0.5}
          arcDashGap={0.3}
          arcDashAnimateTime={(d) => (d.isKochi ? 3000 : 5000)}

          ringsData={ringsData}
          ringLat="lat"
          ringLng="lng"
          ringMaxRadius="maxR"
          ringPropagationSpeed="propagationSpeed"
          ringRepeatPeriod="repeatPeriod"
          ringColor={() => 'rgba(224, 31, 55, 0.7)'}
          ringAltitude={0.003}

          labelsData={isZoomed ? [{
            lat: KOCHI.lat, lng: KOCHI.lng,
            text: 'KOCHI, KERALA',
            color: '#f0ece3', size: 0.6,
          }] : []}
          labelLat="lat"
          labelLng="lng"
          labelText="text"
          labelColor="color"
          labelSize="size"
          labelAltitude={0.01}
          labelDotRadius={0.3}
          labelDotOrientation={() => 'bottom'}
          labelResolution={2}
        />
      </div>

      {/* Drag hint */}
      <div style={{
        position: 'absolute',
        bottom: '8px', left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '0.6rem',
        color: 'rgba(240,236,227,0.3)',
        fontWeight: 700,
        letterSpacing: '0.1em',
        pointerEvents: 'none',
        zIndex: 2,
        whiteSpace: 'nowrap',
      }}>
        DRAG TO ROTATE
      </div>

      <style>{`
        @keyframes auraOuter {
          0%, 100% { opacity: 0.7; transform: translate(-50%,-50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%,-50%) scale(1.05); }
        }
        @keyframes auraMid {
          0%, 100% { opacity: 0.8; transform: translate(-50%,-50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%,-50%) scale(1.03); }
        }
      `}</style>
    </div>
  )
}