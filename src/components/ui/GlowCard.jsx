import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef } from 'react'

export default function GlowCard({ children, className = '', hoverGlow = true, onClick }) {
  const ref = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const glowX = useSpring(mouseX, { damping: 20, stiffness: 300 })
  const glowY = useSpring(mouseY, { damping: 20, stiffness: 300 })

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <motion.div
      ref={ref}
      className={`rounded-2xl border transition-all duration-300 relative overflow-hidden ${className}`}
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
      whileHover={
        hoverGlow
          ? {
              y: -6,
              borderColor: 'rgba(124,58,237,0.5)',
              boxShadow:
                '0 12px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(124,58,237,0.2), inset 0 1px 0 rgba(255,255,255,0.08)',
              transition: { type: 'spring', stiffness: 300, damping: 20 },
            }
          : {}
      }
      onMouseMove={handleMouseMove}
      onClick={onClick}
    >
      {/* Mouse-tracking glow effect */}
      {hoverGlow && (
        <motion.div
          className="absolute pointer-events-none rounded-full opacity-0 group-hover:opacity-100"
          style={{
            width: 200,
            height: 200,
            x: glowX,
            y: glowY,
            translateX: '-50%',
            translateY: '-50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
