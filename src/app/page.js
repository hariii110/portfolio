'use client'

import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'

const LaptopIntro = dynamic(
  () => import('@/components/ui/LaptopIntro'),
  {
    ssr: false,
    loading: () => (
      <div style={{
        position: 'fixed', inset: 0,
        background: '#011d3a',
        zIndex: 999999,
      }} />
    ),
  }
)

const MainContent = dynamic(
  () => import('@/components/layout/MainContent'),
  { ssr: false }
)

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false)

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true)
  }, [])

  return (
    <>
      {!introComplete && (
        <LaptopIntro onComplete={handleIntroComplete} />
      )}
      {introComplete && <MainContent />}
    </>
  )
}