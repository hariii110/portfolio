'use client'

import { useState, useEffect, useRef } from 'react'
import { Zap, X, Play, Pause } from 'lucide-react'

const W = 480
const H = 400
const GRAVITY = 0.5
const JUMP = -10
const SPEED = 3
const TILE = 32

// Level data - 0=empty, 1=ground, 2=brick, 3=question, 4=pipe, 5=flag
const LEVELS = [
  // Level 1
  {
    name: 'World 1-1',
    width: 120,
    playerStart: { x: 3, y: 10 },
    tiles: (w) => {
      const map = Array(13).fill(null).map(() => Array(w).fill(0))
      // Ground
      for (let x = 0; x < w; x++) {
        map[12][x] = 1
        map[11][x] = 1
        // Gaps
        if ((x >= 20 && x <= 22) || (x >= 45 && x <= 47) || (x >= 75 && x <= 76)) {
          map[12][x] = 0
          map[11][x] = 0
        }
      }
      // Bricks and question blocks
      const blocks = [
        [8, 8, 3], [10, 8, 2], [11, 8, 3], [12, 8, 2], [13, 8, 3],
        [25, 8, 2], [26, 8, 2], [27, 8, 3], [28, 8, 2],
        [35, 5, 3], [36, 5, 2], [37, 5, 2],
        [50, 8, 2], [51, 8, 3], [52, 8, 2], [53, 8, 2],
        [60, 6, 3], [61, 6, 2], [62, 6, 2], [63, 6, 3],
        [80, 8, 2], [81, 8, 2], [82, 8, 3],
        [90, 7, 2], [91, 7, 3], [92, 7, 2],
      ]
      blocks.forEach(([x, y, t]) => { if (x < w && y < 13) map[y][x] = t })
      // Pipes
      const pipes = [15, 30, 55, 70, 85, 100]
      pipes.forEach((x) => {
        if (x < w - 1) {
          map[10][x] = 4; map[10][x + 1] = 4
          map[9][x] = 4; map[9][x + 1] = 4
        }
      })
      // Stairs near end
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j <= i; j++) {
          if (105 + i < w) map[10 - j][105 + i] = 1
        }
      }
      // Flag
      if (115 < w) map[3][115] = 5
      return map
    },
    enemies: [
      { x: 12, y: 10, type: 'goomba' },
      { x: 25, y: 10, type: 'goomba' },
      { x: 40, y: 10, type: 'goomba' },
      { x: 55, y: 10, type: 'koopa' },
      { x: 65, y: 10, type: 'goomba' },
      { x: 78, y: 10, type: 'goomba' },
      { x: 88, y: 10, type: 'koopa' },
      { x: 95, y: 10, type: 'goomba' },
    ],
    coins: [
      { x: 8, y: 7 }, { x: 11, y: 7 }, { x: 13, y: 7 },
      { x: 27, y: 7 }, { x: 35, y: 4 }, { x: 51, y: 7 },
      { x: 60, y: 5 }, { x: 63, y: 5 }, { x: 82, y: 7 },
      { x: 91, y: 6 },
    ],
  },
]

export default function Mario() {
  const canvasRef = useRef(null)
  const stateRef = useRef(null)
  const keysRef = useRef({})
  const aiRef = useRef(false)
  const pausedRef = useRef(false)

  const [score, setScore] = useState(0)
  const [coins, setCoins] = useState(0)
  const [lives, setLives] = useState(3)
  const [playing, setPlaying] = useState(false)
  const [dead, setDead] = useState(false)
  const [won, setWon] = useState(false)
  const [paused, setPaused] = useState(false)
  const [aiMode, setAiMode] = useState(false)
  const [best, setBest] = useState(0)
  const [levelName, setLevelName] = useState('')

  useEffect(() => { aiRef.current = aiMode }, [aiMode])
  useEffect(() => { pausedRef.current = paused }, [paused])

  function initState() {
    const level = LEVELS[0]
    const map = level.tiles(level.width)

    return {
      // Player
      px: level.playerStart.x * TILE,
      py: level.playerStart.y * TILE,
      pvx: 0,
      pvy: 0,
      onGround: false,
      facing: 1,
      frame: 0,
      big: false,
      invincible: 0,

      // Camera
      camX: 0,

      // Level
      map,
      levelW: level.width,

      // Enemies
      enemies: level.enemies.map((e) => ({
        x: e.x * TILE,
        y: e.y * TILE,
        type: e.type,
        vx: -1,
        alive: true,
        frame: 0,
        squished: 0,
      })),

      // Coins
      coinItems: level.coins.map((c) => ({
        x: c.x * TILE + TILE / 2,
        y: c.y * TILE + TILE / 2,
        collected: false,
        bounce: 0,
      })),

      // Particles
      particles: [],

      // Stats
      score: 0,
      coinCount: 0,
      dead: false,
      won: false,
      tick: 0,
      time: 300,
    }
  }

  function startGame(ai) {
    setAiMode(ai)
    aiRef.current = ai
    stateRef.current = initState()
    setScore(0)
    setCoins(0)
    setLives(3)
    setPlaying(true)
    setDead(false)
    setWon(false)
    setPaused(false)
    setLevelName(LEVELS[0].name)
  }

  function stopGame() {
    const s = stateRef.current
    if (s && s.score > best && !aiRef.current) setBest(s.score)
    setPlaying(false)
    setDead(false)
    setWon(false)
  }

  // Keyboard
  useEffect(() => {
    const down = (e) => {
      const k = e.key.toLowerCase()
      keysRef.current[k] = true
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(k)) e.preventDefault()
      if (k === 'p' || k === 'escape') { if (playing && !dead && !won) setPaused((p) => !p) }
      if (k === ' ' && (dead || won)) startGame(aiRef.current)
    }
    const up = (e) => { keysRef.current[e.key.toLowerCase()] = false }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up) }
  }, [playing, dead, won])

  // Touch
  useEffect(() => {
    const c = canvasRef.current
    if (!c || !playing) return
    let tx = 0
    const ts = (e) => { e.preventDefault(); tx = e.touches[0].clientX }
    const te = (e) => {
      e.preventDefault()
      const s = stateRef.current
      if (!s || s.dead) return
      const rect = c.getBoundingClientRect()
      const x = (e.changedTouches[0].clientX - rect.left) / rect.width

      if (x < 0.3) keysRef.current['arrowleft'] = true
      else if (x > 0.7) keysRef.current['arrowright'] = true

      const dy = e.changedTouches[0].clientY - e.changedTouches[0].clientY
      if (s.onGround) { s.pvy = JUMP }

      setTimeout(() => {
        keysRef.current['arrowleft'] = false
        keysRef.current['arrowright'] = false
      }, 200)
    }
    c.addEventListener('touchstart', ts, { passive: false })
    c.addEventListener('touchend', te, { passive: false })
    return () => { c.removeEventListener('touchstart', ts); c.removeEventListener('touchend', te) }
  }, [playing])

  // Game loop
  useEffect(() => {
    if (!playing || dead || won) return
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    let raf = null

    function getTile(map, x, y) {
      const tx = Math.floor(x / TILE)
      const ty = Math.floor(y / TILE)
      if (ty < 0 || ty >= 13 || tx < 0 || tx >= map[0].length) return 0
      return map[ty][tx]
    }

    function isSolid(t) { return t === 1 || t === 2 || t === 3 || t === 4 }

    function burst(s, x, y, color, n = 5) {
      for (let i = 0; i < n; i++) {
        s.particles.push({
          x, y,
          vx: (Math.random() - 0.5) * 4,
          vy: -Math.random() * 4,
          life: 1, color, size: 2 + Math.random() * 2,
        })
      }
    }

    function tick() {
      const s = stateRef.current
      if (!s || s.dead || s.won) return

      s.tick++

      // Timer
      if (s.tick % 60 === 0 && !pausedRef.current) {
        s.time--
        if (s.time <= 0) {
          s.dead = true
          setDead(true); setPlaying(false)
        }
      }

      if (pausedRef.current) {
        // Draw even when paused
        draw(s, ctx)
        raf = requestAnimationFrame(tick)
        return
      }

      // ================================
      // AI
      // ================================
      if (aiRef.current) {
        const keys = keysRef.current
        keys['arrowright'] = true
        keys['arrowleft'] = false

        // Look ahead for obstacles
        const lookX = s.px + TILE * 3
        const lookY = s.py

        // Check ground ahead
        const groundAhead = isSolid(getTile(s.map, lookX, s.py + TILE + 2))
        const wallAhead = isSolid(getTile(s.map, s.px + TILE + 4, s.py)) ||
                          isSolid(getTile(s.map, s.px + TILE + 4, s.py - TILE))

        // Check gap ahead
        const gapAhead = !isSolid(getTile(s.map, s.px + TILE * 2, s.py + TILE + 2)) &&
                         !isSolid(getTile(s.map, s.px + TILE * 2, s.py + TILE * 2 + 2))

        // Check enemy ahead
        let enemyNear = false
        for (let i = 0; i < s.enemies.length; i++) {
          const e = s.enemies[i]
          if (!e.alive) continue
          const dx = e.x - s.px
          const dy = e.y - s.py
          if (dx > 0 && dx < TILE * 4 && Math.abs(dy) < TILE * 2) {
            enemyNear = true
            break
          }
        }

        // Jump conditions
        if (s.onGround) {
          if (wallAhead || gapAhead || enemyNear) {
            s.pvy = JUMP
          }
          // Jump for blocks above
          const blockAbove = getTile(s.map, s.px + TILE / 2, s.py - TILE * 2) === 3
          if (blockAbove) s.pvy = JUMP
        }

        // Collect coins - small detour
        for (let i = 0; i < s.coinItems.length; i++) {
          const coin = s.coinItems[i]
          if (coin.collected) continue
          const dx = coin.x - s.px
          const dy = coin.y - s.py
          if (dx > 0 && dx < TILE * 5 && dy < 0 && dy > -TILE * 3 && s.onGround) {
            s.pvy = JUMP
            break
          }
        }
      }

      // ================================
      // PLAYER MOVEMENT
      // ================================
      const keys = keysRef.current
      s.frame++

      // Horizontal
      if (keys['arrowleft'] || keys['a']) {
        s.pvx = Math.max(s.pvx - 0.5, -SPEED)
        s.facing = -1
      } else if (keys['arrowright'] || keys['d']) {
        s.pvx = Math.min(s.pvx + 0.5, SPEED)
        s.facing = 1
      } else {
        s.pvx *= 0.8
        if (Math.abs(s.pvx) < 0.1) s.pvx = 0
      }

      // Jump
      if ((keys['arrowup'] || keys['w'] || keys[' ']) && s.onGround) {
        s.pvy = JUMP
        s.onGround = false
      }

      // Gravity
      s.pvy += GRAVITY
      if (s.pvy > 10) s.pvy = 10

      // Move X
      s.px += s.pvx
      if (s.px < 0) s.px = 0
      if (s.px > (s.levelW - 1) * TILE) s.px = (s.levelW - 1) * TILE

      // X collision
      const pw = 14, ph = TILE - 2
      if (s.pvx > 0) {
        if (isSolid(getTile(s.map, s.px + pw, s.py)) || isSolid(getTile(s.map, s.px + pw, s.py - ph))) {
          s.px = Math.floor((s.px + pw) / TILE) * TILE - pw
          s.pvx = 0
        }
      }
      if (s.pvx < 0) {
        if (isSolid(getTile(s.map, s.px - pw, s.py)) || isSolid(getTile(s.map, s.px - pw, s.py - ph))) {
          s.px = Math.ceil((s.px - pw) / TILE) * TILE + pw
          s.pvx = 0
        }
      }

      // Move Y
      s.py += s.pvy
      s.onGround = false

      // Y collision - falling
      if (s.pvy > 0) {
        if (isSolid(getTile(s.map, s.px - pw + 2, s.py + 1)) || isSolid(getTile(s.map, s.px + pw - 2, s.py + 1))) {
          s.py = Math.floor(s.py / TILE) * TILE
          s.pvy = 0
          s.onGround = true
        }
      }

      // Y collision - hitting head
      if (s.pvy < 0) {
        const headTile = getTile(s.map, s.px, s.py - ph - 1)
        if (isSolid(headTile)) {
          s.py = Math.ceil((s.py - ph) / TILE) * TILE + ph
          s.pvy = 0

          // Break brick or hit question block
          const tx = Math.floor(s.px / TILE)
          const ty = Math.floor((s.py - ph - 1) / TILE)
          if (headTile === 2) {
            s.map[ty][tx] = 0
            s.score += 10
            burst(s, tx * TILE + TILE / 2, ty * TILE + TILE / 2, '#c4813d', 6)
          }
          if (headTile === 3) {
            s.map[ty][tx] = 2 // Turn to used block
            s.score += 100
            s.coinCount++
            burst(s, tx * TILE + TILE / 2, ty * TILE, '#f59e0b', 4)
          }
        }
      }

      // Fall death
      if (s.py > 13 * TILE + 50) {
        s.dead = true
        if (s.score > best && !aiRef.current) setBest(s.score)
        setScore(s.score)
        setCoins(s.coinCount)
        setTimeout(() => { setDead(true); setPlaying(false) }, 300)
        return
      }

      // Invincibility
      if (s.invincible > 0) s.invincible--

      // ================================
      // COINS
      // ================================
      s.coinItems.forEach((coin) => {
        if (coin.collected) return
        const dx = s.px - coin.x
        const dy = s.py - TILE / 2 - coin.y
        if (Math.abs(dx) < 16 && Math.abs(dy) < 16) {
          coin.collected = true
          s.score += 50
          s.coinCount++
          burst(s, coin.x, coin.y, '#f59e0b', 4)
        }
        coin.bounce = Math.sin(s.tick * 0.05) * 3
      })

      // ================================
      // ENEMIES
      // ================================
      s.enemies.forEach((e) => {
        if (!e.alive) return
        if (e.squished > 0) { e.squished--; if (e.squished <= 0) e.alive = false; return }

        e.x += e.vx
        e.frame++

        // Enemy collision with walls
        if (isSolid(getTile(s.map, e.x - 12, e.y)) || isSolid(getTile(s.map, e.x + 12, e.y))) {
          e.vx *= -1
        }

        // Enemy falls
        if (!isSolid(getTile(s.map, e.x, e.y + TILE / 2 + 1))) {
          e.y += 2
        } else {
          e.y = Math.floor(e.y / TILE) * TILE + TILE / 2
        }

        // Enemy off screen
        if (e.x < s.camX - TILE * 2 || e.x > s.camX + W + TILE * 2) return

        // Player collision
        const dx = s.px - e.x
        const dy = s.py - e.y
        if (Math.abs(dx) < 20 && Math.abs(dy) < 24) {
          if (s.pvy > 0 && dy < -8) {
            // Stomp!
            e.squished = 15
            s.pvy = -6
            s.score += 100
            burst(s, e.x, e.y, '#ef4444', 4)
          } else if (s.invincible <= 0) {
            // Hit by enemy
            if (aiRef.current) {
              // AI bounces off
              s.pvy = -8
              s.invincible = 60
            } else {
              s.dead = true
              if (s.score > best) setBest(s.score)
              setScore(s.score)
              setCoins(s.coinCount)
              setTimeout(() => { setDead(true); setPlaying(false) }, 300)
            }
          }
        }
      })

      // ================================
      // FLAG (WIN)
      // ================================
      const flagTx = Math.floor(s.px / TILE)
      const flagTy = Math.floor(s.py / TILE)
      if (flagTx >= 0 && flagTy >= 0 && flagTx < s.map[0].length && flagTy < 13) {
        if (s.map[flagTy][flagTx] === 5 || s.map[Math.max(0, flagTy - 1)][flagTx] === 5) {
          s.won = true
          s.score += s.time * 10
          if (s.score > best && !aiRef.current) setBest(s.score)
          setScore(s.score)
          setCoins(s.coinCount)
          setWon(true)
          setPlaying(false)
          return
        }
      }

      // Camera
      s.camX = Math.max(0, s.px - W / 3)
      s.camX = Math.min(s.camX, s.levelW * TILE - W)

      // Particles
      s.particles = s.particles.filter((p) => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.15; p.life -= 0.03
        return p.life > 0
      })

      // Update React state periodically
      if (s.tick % 10 === 0) {
        setScore(s.score)
        setCoins(s.coinCount)
      }

      draw(s, ctx)
      raf = requestAnimationFrame(tick)
    }

    function draw(s, ctx) {
      // Sky
      const sky = ctx.createLinearGradient(0, 0, 0, H)
      sky.addColorStop(0, '#1a1a3e')
      sky.addColorStop(0.6, '#162d50')
      sky.addColorStop(1, '#0a3d6e')
      ctx.fillStyle = sky
      ctx.fillRect(0, 0, W, H)

      // Stars
      for (let i = 0; i < 15; i++) {
        const sx = (i * 137 + s.tick * 0.01) % W
        const sy = (i * 67) % (H * 0.4)
        ctx.fillStyle = `rgba(255,255,255,${0.2 + Math.sin(s.tick * 0.01 + i) * 0.15})`
        ctx.beginPath(); ctx.arc(sx, sy, 1, 0, Math.PI * 2); ctx.fill()
      }

      ctx.save()
      ctx.translate(-s.camX, 0)

      // Draw tiles
      const startX = Math.floor(s.camX / TILE)
      const endX = Math.ceil((s.camX + W) / TILE) + 1

      for (let y = 0; y < 13; y++) {
        for (let x = startX; x < endX && x < s.map[0].length; x++) {
          const tile = s.map[y][x]
          if (tile === 0) continue

          const tx = x * TILE
          const ty = y * TILE

          switch (tile) {
            case 1: // Ground
              ctx.fillStyle = '#2d6b3a'
              ctx.fillRect(tx, ty, TILE, TILE)
              ctx.fillStyle = '#1a4a25'
              ctx.fillRect(tx, ty, TILE, 2)
              ctx.fillRect(tx + 8, ty + 8, 16, 16)
              break
            case 2: // Brick
              ctx.fillStyle = '#c4813d'
              ctx.fillRect(tx, ty, TILE, TILE)
              ctx.strokeStyle = '#8b5a2b'
              ctx.lineWidth = 1
              ctx.strokeRect(tx + 1, ty + 1, TILE - 2, TILE - 2)
              ctx.fillStyle = '#8b5a2b'
              ctx.fillRect(tx + TILE / 2 - 1, ty, 2, TILE)
              ctx.fillRect(tx, ty + TILE / 2 - 1, TILE, 2)
              break
            case 3: // Question
              ctx.fillStyle = '#f59e0b'
              ctx.fillRect(tx, ty, TILE, TILE)
              ctx.strokeStyle = '#d97706'
              ctx.lineWidth = 1
              ctx.strokeRect(tx + 1, ty + 1, TILE - 2, TILE - 2)
              ctx.fillStyle = '#fff'
              ctx.font = 'bold 16px sans-serif'
              ctx.textAlign = 'center'
              ctx.textBaseline = 'middle'
              ctx.fillText('?', tx + TILE / 2, ty + TILE / 2)
              break
            case 4: // Pipe
              ctx.fillStyle = '#22c55e'
              ctx.fillRect(tx, ty, TILE, TILE)
              ctx.fillStyle = '#15803d'
              ctx.fillRect(tx, ty, 4, TILE)
              ctx.fillStyle = '#4ade80'
              ctx.fillRect(tx + 4, ty, 4, TILE)
              break
            case 5: // Flag
              ctx.fillStyle = '#fff'
              ctx.fillRect(tx + TILE / 2 - 2, ty, 4, TILE * 9)
              ctx.fillStyle = '#e01f37'
              ctx.fillRect(tx + TILE / 2, ty, 20, 14)
              break
          }
        }
      }

      // Coins
      s.coinItems.forEach((coin) => {
        if (coin.collected) return
        ctx.fillStyle = '#f59e0b'
        ctx.beginPath()
        ctx.arc(coin.x, coin.y + coin.bounce, 8, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = '#fbbf24'
        ctx.beginPath()
        ctx.arc(coin.x - 2, coin.y + coin.bounce - 2, 4, 0, Math.PI * 2)
        ctx.fill()
      })

      // Enemies
      s.enemies.forEach((e) => {
        if (!e.alive) return

        if (e.squished > 0) {
          ctx.fillStyle = '#ef4444'
          ctx.fillRect(e.x - 12, e.y + 4, 24, 8)
          return
        }

        if (e.type === 'goomba') {
          ctx.fillStyle = '#8b4513'
          ctx.beginPath()
          ctx.arc(e.x, e.y - 4, 12, 0, Math.PI * 2)
          ctx.fill()
          ctx.fillStyle = '#654321'
          ctx.fillRect(e.x - 10, e.y + 4, 8, 8)
          ctx.fillRect(e.x + 2, e.y + 4, 8, 8)
          // Eyes
          ctx.fillStyle = '#fff'
          ctx.beginPath()
          ctx.arc(e.x - 4, e.y - 6, 3, 0, Math.PI * 2)
          ctx.arc(e.x + 4, e.y - 6, 3, 0, Math.PI * 2)
          ctx.fill()
          ctx.fillStyle = '#000'
          ctx.beginPath()
          ctx.arc(e.x - 3, e.y - 6, 1.5, 0, Math.PI * 2)
          ctx.arc(e.x + 5, e.y - 6, 1.5, 0, Math.PI * 2)
          ctx.fill()
        } else {
          // Koopa
          ctx.fillStyle = '#22c55e'
          ctx.beginPath()
          ctx.arc(e.x, e.y - 8, 10, 0, Math.PI * 2)
          ctx.fill()
          ctx.fillStyle = '#15803d'
          ctx.fillRect(e.x - 8, e.y, 16, 12)
          ctx.fillStyle = '#fff'
          ctx.beginPath()
          ctx.arc(e.x - 2, e.y - 10, 3, 0, Math.PI * 2)
          ctx.fill()
          ctx.fillStyle = '#000'
          ctx.beginPath()
          ctx.arc(e.x - 1, e.y - 10, 1.5, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // Player
      if (!s.dead) {
        const px = s.px
        const py = s.py
        const col = aiRef.current ? '#22c55e' : '#e01f37'
        const colDark = aiRef.current ? '#15803d' : '#b81828'

        if (s.invincible > 0 && s.tick % 4 < 2) {
          // Flashing
        } else {
          // Body
          ctx.fillStyle = col
          ctx.beginPath()
          ctx.roundRect(px - 10, py - 24, 20, 20, 4)
          ctx.fill()

          // Head
          ctx.fillStyle = '#fbbf24'
          ctx.beginPath()
          ctx.arc(px, py - 28, 9, 0, Math.PI * 2)
          ctx.fill()

          // Cap
          ctx.fillStyle = col
          ctx.fillRect(px - 10, py - 36, 20, 6)
          ctx.fillRect(px + (s.facing > 0 ? 2 : -12), py - 34, 10, 4)

          // Eyes
          ctx.fillStyle = '#000'
          ctx.beginPath()
          ctx.arc(px + s.facing * 3, py - 30, 1.5, 0, Math.PI * 2)
          ctx.fill()

          // Legs
          const legOff = Math.abs(s.pvx) > 0.5 ? Math.sin(s.frame * 0.3) * 4 : 0
          ctx.fillStyle = colDark
          ctx.fillRect(px - 7, py - 4, 6, 6 + legOff)
          ctx.fillRect(px + 1, py - 4, 6, 6 - legOff)
        }
      }

      // Particles
      s.particles.forEach((p) => {
        ctx.globalAlpha = p.life
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1

      ctx.restore()

      // HUD on canvas
      ctx.fillStyle = 'rgba(0,0,0,0.3)'
      ctx.fillRect(0, 0, W, 28)

      ctx.fillStyle = '#fff'
      ctx.font = 'bold 11px sans-serif'
      ctx.textAlign = 'left'
      ctx.textBaseline = 'middle'
      ctx.fillText(`Score: ${s.score}`, 10, 14)
      ctx.fillText(`Coins: ${s.coinCount}`, 120, 14)
      ctx.fillText(`Time: ${s.time}`, W - 80, 14)

      if (aiRef.current) {
        ctx.fillStyle = '#22c55e'
        ctx.fillText('AI', W / 2 - 8, 14)
      }

      // Pause overlay
      if (pausedRef.current) {
        ctx.fillStyle = 'rgba(0,0,0,0.6)'
        ctx.fillRect(0, 0, W, H)
        ctx.fillStyle = '#f0ece3'
        ctx.font = 'bold 20px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText('PAUSED', W / 2, H / 2 - 10)
        ctx.font = '11px sans-serif'
        ctx.fillStyle = '#7a9abb'
        ctx.fillText('Press P to resume', W / 2, H / 2 + 15)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => { if (raf) cancelAnimationFrame(raf) }
  }, [playing, dead, won, best])

  return (
    <div className="section-wrapper">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Super <span className="gradient-text">Mario</span></h2>
          <p className="section-subtitle">Classic platformer action</p>
          <div className="section-line" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>

          {playing && (
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <div style={{ background: 'rgba(1,44,86,0.5)', border: '1px solid rgba(10,61,110,0.8)', borderRadius: '10px', padding: '5px 12px', fontSize: '0.75rem' }}>
                <span style={{ color: 'var(--muted)', fontSize: '0.65rem' }}>Score </span>
                <span style={{ color: 'var(--cream)', fontWeight: 700 }}>{score}</span>
              </div>
              <div style={{ background: 'rgba(1,44,86,0.5)', border: '1px solid rgba(10,61,110,0.8)', borderRadius: '10px', padding: '5px 12px', fontSize: '0.75rem' }}>
                <span style={{ color: 'var(--muted)', fontSize: '0.65rem' }}>Coins </span>
                <span style={{ color: '#f59e0b', fontWeight: 700 }}>{coins}</span>
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
              <button onClick={() => setPaused(!paused)} style={{
                padding: '5px 12px', borderRadius: '100px', fontSize: '0.68rem', fontWeight: 700,
                background: paused ? 'rgba(245,158,11,0.15)' : 'rgba(240,236,227,0.08)',
                color: paused ? '#f59e0b' : 'var(--cream)',
                border: paused ? '1px solid rgba(245,158,11,0.4)' : '1px solid rgba(240,236,227,0.15)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px',
              }}>
                {paused ? <Play size={10} /> : <Pause size={10} />}
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

          <div style={{
            borderRadius: '16px', overflow: 'hidden',
            border: '2px solid rgba(10,61,110,0.8)',
            boxShadow: '0 16px 48px -12px rgba(0,0,0,0.5)',
          }}>
            <canvas ref={canvasRef} width={W} height={H}
              style={{ display: 'block', maxWidth: '100%', height: 'auto', background: '#1a1a3e' }} />
          </div>

          {!playing && !dead && !won && (
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '8px' }}>
                Arrow keys to move, Up/Space to jump
              </p>
              <p style={{ fontSize: '0.68rem', color: 'var(--muted)', marginBottom: '14px', opacity: 0.5 }}>
                P = Pause | Stomp enemies | Collect coins
              </p>
              {best > 0 && (
                <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '10px' }}>
                  Best: <span style={{ color: '#22c55e', fontWeight: 700 }}>{best}</span>
                </p>
              )}
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={() => startGame(false)} className="btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                  <Zap size={14} /> Play
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

          {(dead || won) && (
            <div style={{
              background: 'rgba(1,44,86,0.6)', border: '1px solid rgba(10,61,110,0.8)',
              borderRadius: '20px', padding: '28px', textAlign: 'center',
              maxWidth: '360px', width: '100%',
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: won ? '#22c55e' : 'var(--cream)', marginBottom: '12px' }}>
                {won ? 'Level Complete!' : 'Game Over'}
              </h3>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '16px' }}>
                <div>
                  <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--cream)' }}>{score}</p>
                  <p style={{ fontSize: '0.6rem', color: 'var(--muted)' }}>Score</p>
                </div>
                <div>
                  <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f59e0b' }}>{coins}</p>
                  <p style={{ fontSize: '0.6rem', color: 'var(--muted)' }}>Coins</p>
                </div>
                <div>
                  <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#22c55e' }}>{best}</p>
                  <p style={{ fontSize: '0.6rem', color: 'var(--muted)' }}>Best</p>
                </div>
              </div>
              <p style={{ fontSize: '0.65rem', color: 'var(--muted)', marginBottom: '14px' }}>
                Press Space to play again
              </p>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                <button onClick={() => startGame(false)} className="btn-primary" style={{ fontSize: '0.8rem', padding: '10px 20px' }}>
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
    </div>
  )
}