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
  const containerRef = useRef(null)

  const KOCHI = { lat: 9.9312, lng: 76.2673 }

  // Visibility observer
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

  // Setup controls
  useEffect(() => {
    if (!globeRef.current || !globeReady) return

    const globe = globeRef.current
    const controls = globe.controls()

    // Enable rotation
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.6
    controls.enableRotate = true
    controls.enableZoom = false
    controls.enablePan = false
    controls.enableDamping = true
    controls.dampingFactor = 0.1
    controls.rotateSpeed = 0.8

    // Fix: Force pointer events on canvas
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

    // Start facing India
    globe.pointOfView({ lat: 20, lng: 78, altitude: 2.5 }, 0)

    // Zoom to Kochi after 5 seconds
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

  // ================================
  // CITY DATA
  // ================================
  const cities = [
    // India
    { lat: 28.6, lng: 77.2, region: 'in' },
    { lat: 19.0, lng: 72.8, region: 'in' },
    { lat: 13.0, lng: 80.2, region: 'in' },
    { lat: 12.9, lng: 77.5, region: 'in' },
    { lat: 22.5, lng: 88.3, region: 'in' },
    { lat: 17.3, lng: 78.4, region: 'in' },
    { lat: 23.0, lng: 72.5, region: 'in' },
    { lat: 18.5, lng: 73.8, region: 'in' },
    { lat: 10.0, lng: 76.2, region: 'in' },
    { lat: 8.5, lng: 76.9, region: 'in' },
    { lat: 11.0, lng: 76.9, region: 'in' },
    { lat: 26.9, lng: 75.7, region: 'in' },
    { lat: 30.7, lng: 76.7, region: 'in' },
    { lat: 25.6, lng: 85.1, region: 'in' },
    { lat: 9.93, lng: 76.26, region: 'in' },

    // North America
    { lat: 40.7, lng: -74.0, region: 'na' },
    { lat: 34.0, lng: -118.2, region: 'na' },
    { lat: 37.7, lng: -122.4, region: 'na' },
    { lat: 47.6, lng: -122.3, region: 'na' },
    { lat: 41.8, lng: -87.6, region: 'na' },
    { lat: 43.6, lng: -79.3, region: 'na' },
    { lat: 19.4, lng: -99.1, region: 'na' },
    { lat: 29.7, lng: -95.3, region: 'na' },
    { lat: 38.9, lng: -77.0, region: 'na' },

    // Europe
    { lat: 51.5, lng: -0.1, region: 'eu' },
    { lat: 48.8, lng: 2.3, region: 'eu' },
    { lat: 52.5, lng: 13.4, region: 'eu' },
    { lat: 41.9, lng: 12.4, region: 'eu' },
    { lat: 40.4, lng: -3.7, region: 'eu' },
    { lat: 55.7, lng: 37.6, region: 'eu' },
    { lat: 59.3, lng: 18.0, region: 'eu' },
    { lat: 41.0, lng: 28.9, region: 'eu' },
    { lat: 52.3, lng: 4.9, region: 'eu' },
    { lat: 48.2, lng: 16.3, region: 'eu' },

    // East Asia
    { lat: 35.6, lng: 139.6, region: 'ea' },
    { lat: 31.2, lng: 121.4, region: 'ea' },
    { lat: 39.9, lng: 116.4, region: 'ea' },
    { lat: 22.3, lng: 114.1, region: 'ea' },
    { lat: 37.5, lng: 126.9, region: 'ea' },
    { lat: 34.6, lng: 135.5, region: 'ea' },

    // Southeast Asia
    { lat: 1.3, lng: 103.8, region: 'sea' },
    { lat: 13.7, lng: 100.5, region: 'sea' },
    { lat: -6.2, lng: 106.8, region: 'sea' },
    { lat: 3.1, lng: 101.6, region: 'sea' },
    { lat: 23.8, lng: 90.4, region: 'sea' },

    // Middle East
    { lat: 25.2, lng: 55.2, region: 'me' },
    { lat: 30.0, lng: 31.2, region: 'me' },
    { lat: 24.7, lng: 46.7, region: 'me' },

    // South America
    { lat: -23.5, lng: -46.6, region: 'sa' },
    { lat: -34.6, lng: -58.3, region: 'sa' },
    { lat: -22.9, lng: -43.1, region: 'sa' },

    // Africa
    { lat: 6.5, lng: 3.3, region: 'af' },
    { lat: -33.9, lng: 18.4, region: 'af' },
    { lat: -1.2, lng: 36.8, region: 'af' },

    // Australia
    { lat: -33.8, lng: 151.2, region: 'au' },
    { lat: -37.8, lng: 144.9, region: 'au' },
  ]

  // ================================
  // NETWORK ARCS
  // ================================
  const arcsData = []

  // Connect within same region
  for (let i = 0; i < cities.length; i++) {
    for (let j = i + 1; j < cities.length; j++) {
      if (cities[i].region !== cities[j].region) continue
      const dLat = cities[i].lat - cities[j].lat
      const dLng = cities[i].lng - cities[j].lng
      const dist = Math.sqrt(dLat * dLat + dLng * dLng)
      if (dist < 20) {
        arcsData.push({
          startLat: cities[i].lat,
          startLng: cities[i].lng,
          endLat: cities[j].lat,
          endLng: cities[j].lng,
          isKochi: false,
        })
      }
    }
  }

  // Connect Kochi to major hubs
  const hubCoords = [
    { lat: 25.2, lng: 55.2 },   // Dubai
    { lat: 1.3, lng: 103.8 },   // Singapore
    { lat: 19.0, lng: 72.8 },   // Mumbai
    { lat: 28.6, lng: 77.2 },   // Delhi
    { lat: 51.5, lng: -0.1 },   // London
    { lat: 35.6, lng: 139.6 },  // Tokyo
  ]

  hubCoords.forEach((hub) => {
    arcsData.push({
      startLat: KOCHI.lat,
      startLng: KOCHI.lng,
      endLat: hub.lat,
      endLng: hub.lng,
      isKochi: true,
    })
  })

  // Pulsing rings
  const ringsData = [
    {
      lat: KOCHI.lat, lng: KOCHI.lng,
      maxR: 3, propagationSpeed: 2, repeatPeriod: 1000,
    },
    {
      lat: KOCHI.lat, lng: KOCHI.lng,
      maxR: 5, propagationSpeed: 1.5, repeatPeriod: 1500,
    },
  ]

  // Hex data for flat dots
  const hexData = cities.map((c) => ({
    lat: c.lat,
    lng: c.lng,
    w: (c.lat === KOCHI.lat && c.lng === KOCHI.lng) ? 0.8 : 0.3,
  }))

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

          // Flat hex dots - no 3D balls
          hexBinPointsData={hexData}
          hexBinPointLat="lat"
          hexBinPointLng="lng"
          hexBinPointWeight="w"
          hexBinResolution={4}
          hexTopColor={() => 'rgba(255, 220, 100, 0.7)'}
          hexSideColor={() => 'rgba(255, 200, 80, 0.4)'}
          hexAltitude={0.006}
          hexTopCurvatureResolution={0}

          // Network arcs
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

          // Pulsing rings at Kochi
          ringsData={ringsData}
          ringLat="lat"
          ringLng="lng"
          ringMaxRadius="maxR"
          ringPropagationSpeed="propagationSpeed"
          ringRepeatPeriod="repeatPeriod"
          ringColor={() => 'rgba(224, 31, 55, 0.7)'}
          ringAltitude={0.003}

          // Label after zoom
          labelsData={isZoomed ? [{
            lat: KOCHI.lat,
            lng: KOCHI.lng,
            text: 'KOCHI, KERALA',
            color: '#f0ece3',
            size: 0.6,
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
        bottom: '8px',
        left: '50%',
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