import { motion } from 'framer-motion'

export default function GlowCard({ children, className = '', hoverGlow = true, onClick }) {
  return (
    <motion.div
      className={`rounded-2xl border transition-all duration-300 ${className}`}
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
      whileHover={
        hoverGlow
          ? {
              y: -4,
              borderColor: 'rgba(124,58,237,0.5)',
              boxShadow:
                '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 20px rgba(124,58,237,0.2), inset 0 1px 0 rgba(255,255,255,0.08)',
              transition: { duration: 0.2 },
            }
          : {}
      }
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}
