// Block Ctrl + Scroll
document.addEventListener('wheel', function(e) {
  if (e.ctrlKey) e.preventDefault()
}, { passive: false })

// Block Ctrl + Plus/Minus
document.addEventListener('keydown', function(e) {
  if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '=' || e.key === '0')) {
    e.preventDefault()
  }
})

// Block multi-touch
document.addEventListener('touchstart', function(e) {
  if (e.touches.length > 1) e.preventDefault()
}, { passive: false })

document.addEventListener('touchmove', function(e) {
  if (e.touches.length > 1) e.preventDefault()
}, { passive: false })

// Block gestures (Safari)
document.addEventListener('gesturestart', function(e) { e.preventDefault() })
document.addEventListener('gesturechange', function(e) { e.preventDefault() })
document.addEventListener('gestureend', function(e) { e.preventDefault() })

// Block double tap zoom
var lastTouchEnd = 0
document.addEventListener('touchend', function(e) {
  var now = Date.now()
  if (now - lastTouchEnd <= 300) e.preventDefault()
  lastTouchEnd = now
}, false)