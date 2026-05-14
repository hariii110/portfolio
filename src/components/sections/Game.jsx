'use client'

import { useState, useEffect, useRef } from 'react'
import { Zap, X, Play, Pause, ChevronRight } from 'lucide-react'

const W = 380
const H = 500
const BIRD_SIZE = 18
const PIPE_W = 52

const DIFFICULTY = {
  easy: {
    label: 'Easy',
    color: '#22c55e',
    gap: 175,
    gravity: 0.28,
    flap: -5.5,
    speed: 2,
    spawnRate: 110,
    speedInc: 0.02,
    maxSpeed: 3.5,
  },
  medium: {
    label: 'Medium',
    color: '#f59e0b',
    gap: 150,
    gravity: 0.32,
    flap: -6,
    speed: 2.5,
    spawnRate: 95,
    speedInc: 0.03,
    maxSpeed: 4.5,
  },
  hard: {
    label: 'Hard',
    color: '#ef4444',
    gap: 130,
    gravity: 0.36,
    flap: -6.5,
    speed: 3,
    spawnRate: 80,
    speedInc: 0.05,
    maxSpeed: 5.5,
  },
  insane: {
    label: 'Insane',
    color: '#8b5cf6',
    gap: 115,
    gravity: 0.4,
    flap: -7,
    speed: 3.5,
    spawnRate: 65,
    speedInc: 0.06,
    maxSpeed: 6.5,
  },
}

// AI uses easy settings always
const AI_SETTINGS = {
  gap: 165,
  gravity: 0.3,
  flap: -5.8,
  speed: 2.5,
  spawnRate: 100,
  speedInc: 0.025,
  maxSpeed: 4,
}

export default function Game() {
  const canvasRef = useRef(null)
  const stateRef = useRef(null)
  const aiRef = useRef(false)
  const pausedRef = useRef(false)
  const diffRef = useRef('medium')

  const [score, setScore] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [dead, setDead] = useState(false)
  const [best, setBest] = useState(0)
  const [aiMode, setAiMode] = useState(false)
  const [paused, setPaused] = useState(false)
  const [difficulty, setDifficulty] = useState('medium')
  const [showDiffSelect, setShowDiffSelect] = useState(false)

  useEffect(() => { aiRef.current = aiMode }, [aiMode])
  useEffect(() => { pausedRef.current = paused }, [paused])
  useEffect(() => { diffRef.current = difficulty }, [difficulty])

  function getSettings() {
    if (aiRef.current) return AI_SETTINGS
    return DIFFICULTY[diffRef.current] || DIFFICULTY.medium
  }

  function initState() {
    const cfg = getSettings()
    return {
      bird: { x: W * 0.25, y: H / 2, vel: 0, angle: 0 },
      pipes: [],
      clouds: Array.from({ length: 5 }, (_, i) => ({
        x: i * 90 + Math.random() * 40,
        y: 30 + Math.random() * 80,
        w: 40 + Math.random() * 30,
        speed: 0.3 + Math.random() * 0.3,
      })),
      groundOffset: 0,
      score: 0,
      pipeTimer: 80,
      frame: 0,
      dead: false,
      started: false,
      speed: cfg.speed,
      cfg,
      // Animations
      shakeX: 0, shakeY: 0,
      flash: 0,
      scorePopups: [],
    }
  }

  function startGame(ai) {
    setAiMode(ai)
    aiRef.current = ai
    stateRef.current = initState()
    setScore(0)
    setPlaying(true)
    setDead(false)
    setPaused(false)
    pausedRef.current = false
    setShowDiffSelect(false)
  }

  function stopGame() {
    const s = stateRef.current
    if (s && s.score > best && !aiRef.current) setBest(s.score)
    if (s) s.dead = true
    setPlaying(false)
    setDead(false)
    setPaused(false)
  }
  function doFlap() {
    const s = stateRef.current
    if (!s || s.dead || pausedRef.current) return
    if (!s.started) s.started = true
    s.bird.vel = s.cfg.flap
  }

  function togglePause() {
    setPaused((p) => !p)
  }

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      const k = e.key.toLowerCase()

      if (k === ' ' && dead) {
        e.preventDefault()
        startGame(aiRef.current)
        return
      }

      if ((k === 'p' || k === 'escape') && playing && !dead) {
        e.preventDefault()
        togglePause()
        return
      }

      if (k === ' ' || k === 'arrowup' || k === 'w') {
        e.preventDefault()
        if (!pausedRef.current) doFlap()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [playing, dead])

  // Click/Touch
  useEffect(() => {
    const c = canvasRef.current
    if (!c || !playing) return

    const handle = (e) => {
      e.preventDefault()
      if (!pausedRef.current && !stateRef.current?.dead) doFlap()
    }

    c.addEventListener('click', handle)
    c.addEventListener('touchstart', handle, { passive: false })
    return () => {
      c.removeEventListener('click', handle)
      c.removeEventListener('touchstart', handle)
    }
  }, [playing])

  // Game loop
  useEffect(() => {
    if (!playing || dead) return
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    let raf = null

    function tick() {
      const s = stateRef.current
      if (!s) return

      s.frame++
      const cfg = s.cfg

      // ================================
      // AI
      // ================================
      if (aiRef.current && !s.dead) {
        if (!s.started) {
          s.started = true
          s.bird.vel = cfg.flap
        }

        if (s.started && !pausedRef.current) {
          let nextPipe = null
          for (let i = 0; i < s.pipes.length; i++) {
            if (s.pipes[i].x + PIPE_W > s.bird.x - 10) {
              nextPipe = s.pipes[i]
              break
            }
          }

          if (nextPipe) {
            const gapCenter = nextPipe.topH + cfg.gap / 2
            const distToPipe = nextPipe.x - s.bird.x
            const futureVel = s.bird.vel + cfg.gravity * 3
            const futureY = s.bird.y + futureVel * 3

            if (distToPipe < 150) {
              if (futureY > gapCenter + 8) doFlap()
            } else {
              if (s.bird.y > gapCenter + 15) doFlap()
            }

            if (s.bird.y > nextPipe.botY - 22) doFlap()
          } else {
            if (s.bird.y > H / 2 + 10) doFlap()
          }

          if (s.bird.y > H - 85) doFlap()
        }
      }

      // ================================
      // PHYSICS
      // ================================
      if (!pausedRef.current && s.started && !s.dead) {
        s.bird.vel += cfg.gravity
        s.bird.vel = Math.min(s.bird.vel, 8)
        s.bird.y += s.bird.vel
        s.bird.angle = Math.min(Math.max(s.bird.vel * 3, -25), 60)

        s.speed = cfg.speed + Math.min(s.score * cfg.speedInc, cfg.maxSpeed - cfg.speed)

        s.pipeTimer++
        if (s.pipeTimer >= Math.max(cfg.spawnRate * 0.6, cfg.spawnRate - s.score * 0.3)) {
          s.pipeTimer = 0
          const minTop = 65
          const maxTop = H - cfg.gap - 85
          const topH = minTop + Math.random() * (maxTop - minTop)

          s.pipes.push({
            x: W + 10,
            topH,
            botY: topH + cfg.gap,
            scored: false,
          })
        }

        s.pipes = s.pipes.filter((pipe) => {
          pipe.x -= s.speed

          if (!pipe.scored && pipe.x + PIPE_W < s.bird.x) {
            pipe.scored = true
            s.score++
            setScore(s.score)

            // Score popup
            s.scorePopups.push({
              x: s.bird.x + 20,
              y: s.bird.y - 20,
              val: s.score,
              life: 1,
            })
          }

          return pipe.x > -PIPE_W - 10
        })

        // Collision
        const bx = s.bird.x
        const by = s.bird.y
        const br = BIRD_SIZE * 0.6

        if (by + br > H - 60 || by - br < 0) {
          if (aiRef.current) {
            if (by + br > H - 60) { s.bird.y = H - 60 - br; s.bird.vel = 0 }
            if (by - br < 0) { s.bird.y = br + 1; s.bird.vel = 1 }
          } else {
            s.dead = true
            s.shakeX = 10; s.flash = 1
            if (s.score > best && !aiRef.current) setBest(s.score)
            setTimeout(() => { setDead(true); setPlaying(false) }, 500)
          }
        }

        for (let i = 0; i < s.pipes.length; i++) {
          const pipe = s.pipes[i]
          if (bx + br > pipe.x + 3 && bx - br < pipe.x + PIPE_W - 3) {
            if (by - br < pipe.topH || by + br > pipe.botY) {
              if (aiRef.current) {
                const gc = pipe.topH + cfg.gap / 2
                s.bird.y = gc; s.bird.vel = 0
              } else {
                s.dead = true
                s.shakeX = 10; s.flash = 1
                if (s.score > best) setBest(s.score)
                setTimeout(() => { setDead(true); setPlaying(false) }, 500)
              }
            }
          }
        }

        s.groundOffset = (s.groundOffset + s.speed) % 24
      }

      // Shake decay
      if (s.shakeX > 0) s.shakeX *= 0.85
      if (s.flash > 0) s.flash *= 0.9

      // Score popups
      s.scorePopups = s.scorePopups.filter((p) => {
        p.y -= 1.5
        p.life -= 0.025
        return p.life > 0
      })

      // Clouds
      s.clouds.forEach((cloud) => {
        cloud.x -= cloud.speed * (pausedRef.current ? 0.2 : 1)
        if (cloud.x + cloud.w < 0) {
          cloud.x = W + 10
          cloud.y = 30 + Math.random() * 80
        }
      })

      // ================================
      // DRAW
      // ================================
      ctx.save()

      // Screen shake
      if (s.shakeX > 0.5) {
        ctx.translate(
          (Math.random() - 0.5) * s.shakeX,
          (Math.random() - 0.5) * s.shakeX * 0.5
        )
      }

      // Sky
      const sky = ctx.createLinearGradient(0, 0, 0, H)
      sky.addColorStop(0, '#0a1628')
      sky.addColorStop(0.4, '#0f2240')
      sky.addColorStop(0.8, '#162d50')
      sky.addColorStop(1, '#1a3a5c')
      ctx.fillStyle = sky
      ctx.fillRect(0, 0, W, H)

      // Stars
      for (let i = 0; i < 25; i++) {
        const sx = (i * 97.3 + s.frame * 0.02) % W
        const sy = (i * 61.7) % (H * 0.5)
        ctx.fillStyle = `rgba(255,255,255,${0.2 + Math.sin(s.frame * 0.01 + i) * 0.15})`
        ctx.beginPath(); ctx.arc(sx, sy, 1, 0, Math.PI * 2); ctx.fill()
      }

      // Moon
      ctx.fillStyle = 'rgba(240,236,227,0.06)'
      ctx.beginPath(); ctx.arc(W - 60, 50, 25, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = 'rgba(240,236,227,0.03)'
      ctx.beginPath(); ctx.arc(W - 55, 45, 20, 0, Math.PI * 2); ctx.fill()

      // Clouds
      s.clouds.forEach((cloud) => {
        ctx.fillStyle = 'rgba(255,255,255,0.04)'
        ctx.beginPath()
        ctx.ellipse(cloud.x + cloud.w / 2, cloud.y, cloud.w / 2, 12, 0, 0, Math.PI * 2)
        ctx.fill()
      })

      // Pipes
      s.pipes.forEach((pipe) => {
        const pGrad = ctx.createLinearGradient(pipe.x, 0, pipe.x + PIPE_W, 0)
        pGrad.addColorStop(0, '#1a6b3a')
        pGrad.addColorStop(0.3, '#22c55e')
        pGrad.addColorStop(0.7, '#16a34a')
        pGrad.addColorStop(1, '#15803d')

        // Top pipe
        ctx.fillStyle = pGrad
        ctx.fillRect(pipe.x, 0, PIPE_W, pipe.topH)
        ctx.fillStyle = '#22c55e'
        ctx.fillRect(pipe.x - 3, pipe.topH - 18, PIPE_W + 6, 18)
        ctx.strokeStyle = '#15803d'; ctx.lineWidth = 1
        ctx.strokeRect(pipe.x - 3, pipe.topH - 18, PIPE_W + 6, 18)
        ctx.fillStyle = 'rgba(255,255,255,0.08)'
        ctx.fillRect(pipe.x + 5, 0, 5, pipe.topH - 18)

        // Bottom pipe
        ctx.fillStyle = pGrad
        ctx.fillRect(pipe.x, pipe.botY, PIPE_W, H - pipe.botY - 60)
        ctx.fillStyle = '#22c55e'
        ctx.fillRect(pipe.x - 3, pipe.botY, PIPE_W + 6, 18)
        ctx.strokeStyle = '#15803d'
        ctx.strokeRect(pipe.x - 3, pipe.botY, PIPE_W + 6, 18)
        ctx.fillStyle = 'rgba(255,255,255,0.08)'
        ctx.fillRect(pipe.x + 5, pipe.botY + 18, 5, H - pipe.botY - 78)
      })

      // Ground
      ctx.fillStyle = '#1a3a20'; ctx.fillRect(0, H - 60, W, 60)
      ctx.fillStyle = '#22502a'; ctx.fillRect(0, H - 60, W, 3)
      for (let i = -1; i < W / 24 + 1; i++) {
        const gx = i * 24 - s.groundOffset
        ctx.fillStyle = (i % 2 === 0) ? '#1e4425' : '#1a3a20'
        ctx.fillRect(gx, H - 57, 24, 57)
      }
      ctx.fillStyle = '#2d6b3a'
      for (let i = 0; i < W; i += 6) {
        const gh = 3 + Math.sin(i * 0.5 + s.frame * 0.04) * 1.5
        ctx.fillRect(i, H - 60 - gh, 2, gh)
      }

      // Bird
      if (!s.dead) {
        const bx = s.bird.x
        const by = s.bird.y
        const ang = s.bird.angle * Math.PI / 180

        ctx.save(); ctx.translate(bx, by); ctx.rotate(ang)

        const col = aiRef.current ? '#22c55e' : '#f59e0b'
        const colDark = aiRef.current ? '#15803d' : '#d97706'
        const colLight = aiRef.current ? '#4ade80' : '#fbbf24'

        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.15)'
        ctx.beginPath()
        ctx.ellipse(1, 2, BIRD_SIZE, BIRD_SIZE * 0.7, 0, 0, Math.PI * 2)
        ctx.fill()

        // Body
        ctx.fillStyle = col
        ctx.beginPath()
        ctx.ellipse(0, 0, BIRD_SIZE, BIRD_SIZE * 0.7, 0, 0, Math.PI * 2)
        ctx.fill()

        // Belly
        ctx.fillStyle = colLight
        ctx.beginPath()
        ctx.ellipse(3, 3, BIRD_SIZE * 0.5, BIRD_SIZE * 0.4, 0, 0, Math.PI * 2)
        ctx.fill()

        // Wing
        const wingA = Math.sin(s.frame * 0.2) * 0.4
        ctx.fillStyle = colDark
        ctx.save(); ctx.rotate(wingA)
        ctx.beginPath()
        ctx.ellipse(-4, -2, BIRD_SIZE * 0.55, BIRD_SIZE * 0.3, -0.3, 0, Math.PI * 2)
        ctx.fill(); ctx.restore()

        // Eye
        ctx.fillStyle = '#fff'
        ctx.beginPath(); ctx.arc(8, -5, 4.5, 0, Math.PI * 2); ctx.fill()
        ctx.fillStyle = '#000'
        ctx.beginPath(); ctx.arc(9, -5, 2.2, 0, Math.PI * 2); ctx.fill()
        ctx.fillStyle = '#fff'
        ctx.beginPath(); ctx.arc(10, -6, 0.8, 0, Math.PI * 2); ctx.fill()

        // Beak
        ctx.fillStyle = '#e01f37'
        ctx.beginPath()
        ctx.moveTo(13, -2); ctx.lineTo(20, 0); ctx.lineTo(13, 3)
        ctx.closePath(); ctx.fill()

        ctx.restore()
      }

      // Score popups
      s.scorePopups.forEach((p) => {
        ctx.globalAlpha = p.life
        ctx.fillStyle = '#f59e0b'
        ctx.font = 'bold 14px sans-serif'
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
        ctx.fillText(`+1`, p.x, p.y)
      })
      ctx.globalAlpha = 1

      // Score display
      ctx.fillStyle = 'rgba(0,0,0,0.3)'
      ctx.font = 'bold 28px sans-serif'
      ctx.textAlign = 'center'; ctx.textBaseline = 'top'
      ctx.fillText(s.score.toString(), W / 2 + 2, 22)
      ctx.fillStyle = '#fff'
      ctx.fillText(s.score.toString(), W / 2, 20)

      // Difficulty badge (manual mode only)
      if (!aiRef.current && s.started) {
        const dcfg = DIFFICULTY[diffRef.current]
        ctx.fillStyle = `${dcfg.color}25`
        ctx.beginPath(); ctx.roundRect(W / 2 - 28, 54, 56, 16, 5); ctx.fill()
        ctx.fillStyle = dcfg.color
        ctx.font = 'bold 8px sans-serif'
        ctx.fillText(dcfg.label.toUpperCase(), W / 2, 58)
      }

      // AI badge
      if (aiRef.current) {
        ctx.fillStyle = 'rgba(34,197,94,0.2)'
        ctx.beginPath(); ctx.roundRect(W / 2 - 30, 54, 60, 16, 5); ctx.fill()
        ctx.fillStyle = '#22c55e'
        ctx.font = 'bold 8px sans-serif'
        ctx.fillText('AI MODE', W / 2, 58)
      }

      // Death flash
      if (s.flash > 0.1) {
        ctx.fillStyle = `rgba(224, 31, 55, ${s.flash * 0.3})`
        ctx.fillRect(0, 0, W, H)
      }

      // Tap to start
      if (!s.started && !s.dead) {
        ctx.fillStyle = 'rgba(0,0,0,0.5)'
        ctx.fillRect(0, 0, W, H)

        // Animated bird icon
        const bobY = Math.sin(s.frame * 0.05) * 8
        ctx.fillStyle = aiRef.current ? '#22c55e' : '#f59e0b'
        ctx.beginPath()
        ctx.ellipse(W / 2, H / 2 - 50 + bobY, 22, 16, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = '#fff'
        ctx.beginPath(); ctx.arc(W / 2 + 8, H / 2 - 55 + bobY, 4, 0, Math.PI * 2); ctx.fill()
        ctx.fillStyle = '#000'
        ctx.beginPath(); ctx.arc(W / 2 + 9, H / 2 - 55 + bobY, 2, 0, Math.PI * 2); ctx.fill()
        ctx.fillStyle = '#e01f37'
        ctx.beginPath()
        ctx.moveTo(W / 2 + 16, H / 2 - 52 + bobY)
        ctx.lineTo(W / 2 + 24, H / 2 - 50 + bobY)
        ctx.lineTo(W / 2 + 16, H / 2 - 47 + bobY)
        ctx.closePath(); ctx.fill()

        // Text with glow
        ctx.fillStyle = '#f0ece3'
        ctx.font = 'bold 18px sans-serif'
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
        ctx.fillText('Tap or Press Space', W / 2, H / 2 + 10)

        ctx.font = '11px sans-serif'
        ctx.fillStyle = '#7a9abb'
        ctx.fillText('to start flying', W / 2, H / 2 + 32)

        // Animated arrow
        const arrowBob = Math.sin(s.frame * 0.08) * 3
        ctx.fillStyle = 'rgba(240,236,227,0.3)'
        ctx.beginPath()
        ctx.moveTo(W / 2 - 8, H / 2 + 50 + arrowBob)
        ctx.lineTo(W / 2, H / 2 + 58 + arrowBob)
        ctx.lineTo(W / 2 + 8, H / 2 + 50 + arrowBob)
        ctx.closePath(); ctx.fill()
      }

      // Pause overlay
      if (pausedRef.current && !s.dead) {
        ctx.fillStyle = 'rgba(0,0,0,0.6)'
        ctx.fillRect(0, 0, W, H)

        // Pause icon
        ctx.fillStyle = 'rgba(240,236,227,0.15)'
        ctx.beginPath(); ctx.roundRect(W / 2 - 30, H / 2 - 55, 60, 50, 12); ctx.fill()
        ctx.fillStyle = '#f0ece3'
        ctx.fillRect(W / 2 - 12, H / 2 - 45, 8, 30)
        ctx.fillRect(W / 2 + 4, H / 2 - 45, 8, 30)

        ctx.fillStyle = '#f0ece3'
        ctx.font = 'bold 20px sans-serif'
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
        ctx.fillText('PAUSED', W / 2, H / 2 + 15)

        // Animated hint
        const hintAlpha = 0.4 + Math.sin(s.frame * 0.04) * 0.2
        ctx.fillStyle = `rgba(122, 154, 187, ${hintAlpha})`
        ctx.font = '11px sans-serif'
        ctx.fillText('Press P or ESC to resume', W / 2, H / 2 + 40)

        // Score during pause
        ctx.fillStyle = 'rgba(240,236,227,0.3)'
        ctx.font = '10px sans-serif'
        ctx.fillText(`Score: ${s.score}`, W / 2, H / 2 + 60)
      }

      ctx.restore()

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => { if (raf) cancelAnimationFrame(raf) }
  }, [playing, dead, best])

  return (
    <div className="section-wrapper">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">
            Flappy <span className="gradient-text">Bird</span>
          </h2>
          <p className="section-subtitle">Tap to fly through the pipes</p>
          <div className="section-line" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>

          {/* HUD */}
          {playing && (
            <div style={{
              display: 'flex', gap: '6px', alignItems: 'center',
              flexWrap: 'wrap', justifyContent: 'center',
            }}>
              <div style={{
                background: 'rgba(1,44,86,0.5)', border: '1px solid rgba(10,61,110,0.8)',
                borderRadius: '10px', padding: '5px 12px', fontSize: '0.75rem',
              }}>
                <span style={{ color: 'var(--muted)', fontSize: '0.65rem' }}>Score </span>
                <span style={{ color: 'var(--cream)', fontWeight: 700 }}>{score}</span>
              </div>
              <div style={{
                background: 'rgba(1,44,86,0.5)', border: '1px solid rgba(10,61,110,0.8)',
                borderRadius: '10px', padding: '5px 12px', fontSize: '0.75rem',
              }}>
                <span style={{ color: 'var(--muted)', fontSize: '0.65rem' }}>Best </span>
                <span style={{ color: '#22c55e', fontWeight: 700 }}>{best}</span>
              </div>

              <button onClick={() => setAiMode(!aiMode)} style={{
                padding: '5px 12px', borderRadius: '100px', fontSize: '0.68rem', fontWeight: 700,
                background: aiMode ? 'rgba(34,197,94,0.15)' : 'rgba(240,236,227,0.08)',
                color: aiMode ? '#22c55e' : 'var(--cream)',
                border: aiMode ? '1px solid rgba(34,197,94,0.4)' : '1px solid rgba(240,236,227,0.15)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px',
              }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: aiMode ? '#22c55e' : '#7a9abb' }} />
                {aiMode ? 'AI' : 'Manual'}
              </button>

              <button onClick={togglePause} style={{
                padding: '5px 12px', borderRadius: '100px', fontSize: '0.68rem', fontWeight: 700,
                background: paused ? 'rgba(245,158,11,0.15)' : 'rgba(240,236,227,0.08)',
                color: paused ? '#f59e0b' : 'var(--cream)',
                border: paused ? '1px solid rgba(245,158,11,0.4)' : '1px solid rgba(240,236,227,0.15)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px',
              }}>
                {paused ? <Play size={10} /> : <Pause size={10} />}
                {paused ? 'Play' : 'Pause'}
              </button>

              <button onClick={stopGame} style={{
                padding: '5px 12px', borderRadius: '100px', fontSize: '0.68rem', fontWeight: 700,
                background: 'rgba(224,31,55,0.15)', color: '#e01f37',
                border: '1px solid rgba(224,31,55,0.4)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px',
              }}>
                <X size={10} /> Exit
              </button>
            </div>
          )}

          {/* Canvas */}
          <div style={{
            borderRadius: '16px', overflow: 'hidden',
            border: '2px solid rgba(10,61,110,0.8)',
            boxShadow: '0 16px 48px -12px rgba(0,0,0,0.5)',
          }}>
            <canvas ref={canvasRef} width={W} height={H}
              style={{ display: 'block', maxWidth: '100%', height: 'auto', background: '#0a1628', cursor: 'pointer' }} />
          </div>

          {/* Start Screen */}
          {!playing && !dead && (
            <div style={{ textAlign: 'center', maxWidth: '400px', width: '100%' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '8px' }}>
                Tap, Click or Space to flap
              </p>
              <p style={{ fontSize: '0.68rem', color: 'var(--muted)', marginBottom: '16px', opacity: 0.5 }}>
                P = Pause &nbsp;|&nbsp; Space = Restart after game over
              </p>

              {best > 0 && (
                <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '14px' }}>
                  Best: <span style={{ color: '#22c55e', fontWeight: 700 }}>{best}</span>
                </p>
              )}

              {/* Difficulty Selection */}
              <div style={{
                background: 'rgba(1,44,86,0.5)', border: '1px solid rgba(10,61,110,0.6)',
                borderRadius: '16px', padding: '16px', marginBottom: '16px',
              }}>
                <p style={{ fontSize: '0.72rem', color: 'var(--muted)', marginBottom: '10px', fontWeight: 700 }}>
                  Select Difficulty
                </p>
                <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  {Object.entries(DIFFICULTY).map(([key, cfg]) => (
                    <button
                      key={key}
                      onClick={() => setDifficulty(key)}
                      style={{
                        padding: '8px 16px', borderRadius: '10px',
                        fontSize: '0.75rem', fontWeight: 700,
                        background: difficulty === key ? `${cfg.color}20` : 'rgba(240,236,227,0.05)',
                        color: difficulty === key ? cfg.color : 'var(--muted)',
                        border: difficulty === key ? `1.5px solid ${cfg.color}60` : '1px solid rgba(240,236,227,0.1)',
                        cursor: 'pointer', transition: 'all 0.2s ease',
                        transform: difficulty === key ? 'scale(1.05)' : 'scale(1)',
                      }}
                    >
                      {cfg.label}
                    </button>
                  ))}
                </div>

                {/* Difficulty info */}
                <div style={{
                  marginTop: '10px', padding: '8px 12px',
                  borderRadius: '8px', background: 'rgba(240,236,227,0.03)',
                  fontSize: '0.65rem', color: 'var(--muted)',
                  display: 'flex', justifyContent: 'center', gap: '12px',
                }}>
                  <span>Gap: {DIFFICULTY[difficulty].gap}px</span>
                  <span>Speed: {DIFFICULTY[difficulty].speed}</span>
                  <span>Gravity: {DIFFICULTY[difficulty].gravity}</span>
                </div>
              </div>

              {/* Start Buttons */}
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={() => startGame(false)} className="btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                  <Zap size={14} /> Play
                  <span style={{
                    fontSize: '0.6rem', padding: '2px 6px', borderRadius: '4px',
                    background: 'rgba(255,255,255,0.2)', marginLeft: '2px',
                  }}>
                    {DIFFICULTY[difficulty].label}
                  </span>
                </button>
                <button onClick={() => startGame(true)} style={{
                  padding: '12px 24px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 700,
                  background: 'rgba(34,197,94,0.15)', color: '#22c55e',
                  border: '1px solid rgba(34,197,94,0.4)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '6px',
                }}>
                  <Zap size={14} /> Watch AI
                </button>
              </div>
            </div>
          )}

          {/* Game Over */}
          {dead && (
            <div style={{
              background: 'rgba(1,44,86,0.6)', border: '1px solid rgba(10,61,110,0.8)',
              borderRadius: '20px', padding: '28px', textAlign: 'center',
              maxWidth: '360px', width: '100%',
              animation: 'gameOverIn 0.4s ease both',
            }}>
              <h3 style={{
                fontSize: '1.2rem', fontWeight: 700,
                color: 'var(--cream)', marginBottom: '4px',
              }}>
                Game Over
              </h3>

              {!aiRef.current && (
                <p style={{
                  fontSize: '0.65rem', fontWeight: 700, marginBottom: '14px',
                  color: DIFFICULTY[difficulty].color,
                }}>
                  {DIFFICULTY[difficulty].label} Mode
                </p>
              )}

              <div style={{
                display: 'flex', justifyContent: 'center',
                gap: '30px', marginBottom: '16px',
              }}>
                <div>
                  <p style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--cream)' }}>{score}</p>
                  <p style={{ fontSize: '0.6rem', color: 'var(--muted)' }}>Score</p>
                </div>
                <div>
                  <p style={{ fontSize: '1.8rem', fontWeight: 700, color: '#22c55e' }}>{best}</p>
                  <p style={{ fontSize: '0.6rem', color: 'var(--muted)' }}>Best</p>
                </div>
              </div>

              {score >= best && score > 0 && (
                <div style={{
                  padding: '6px 14px', borderRadius: '8px',
                  background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)',
                  display: 'inline-block', marginBottom: '14px',
                }}>
                  <p style={{ fontSize: '0.75rem', color: '#22c55e', fontWeight: 700 }}>
                    New High Score!
                  </p>
                </div>
              )}

              {/* Space key hint */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: '6px', marginBottom: '16px',
              }}>
                <div style={{
                  padding: '4px 10px', borderRadius: '6px',
                  background: 'rgba(240,236,227,0.08)',
                  border: '1px solid rgba(240,236,227,0.15)',
                  fontSize: '0.7rem', fontWeight: 700, color: 'var(--cream)',
                  fontFamily: 'monospace',
                }}>
                  SPACE
                </div>
                <span style={{ fontSize: '0.65rem', color: 'var(--muted)' }}>
                  to play again
                </span>
              </div>

              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={() => startGame(false)} className="btn-primary"
                  style={{ fontSize: '0.8rem', padding: '10px 20px' }}>
                  Play Again
                </button>
                <button onClick={() => startGame(true)} style={{
                  padding: '10px 20px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 700,
                  background: 'rgba(34,197,94,0.15)', color: '#22c55e',
                  border: '1px solid rgba(34,197,94,0.4)', cursor: 'pointer',
                }}>
                  AI Mode
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes gameOverIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  )
}