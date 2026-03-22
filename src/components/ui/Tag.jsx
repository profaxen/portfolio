import { motion } from 'framer-motion'

const colorMap = {
  purple: {
    bg: 'rgba(124, 58, 237, 0.15)',
    border: 'rgba(124, 58, 237, 0.3)',
    text: '#a78bfa',
  },
  blue: {
    bg: 'rgba(59, 130, 246, 0.15)',
    border: 'rgba(59, 130, 246, 0.3)',
    text: '#93c5fd',
  },
  cyan: {
    bg: 'rgba(6, 182, 212, 0.15)',
    border: 'rgba(6, 182, 212, 0.3)',
    text: '#67e8f9',
  },
  green: {
    bg: 'rgba(16, 185, 129, 0.15)',
    border: 'rgba(16, 185, 129, 0.3)',
    text: '#6ee7b7',
  },
  amber: {
    bg: 'rgba(245, 158, 11, 0.15)',
    border: 'rgba(245, 158, 11, 0.3)',
    text: '#fcd34d',
  },
  gray: {
    bg: 'rgba(100, 116, 139, 0.15)',
    border: 'rgba(100, 116, 139, 0.3)',
    text: '#94a3b8',
  },
}

export default function Tag({ text, color = 'purple', className = '' }) {
  const colors = colorMap[color] || colorMap.purple

  return (
    <motion.span
      className={`inline-block text-xs font-mono px-3 py-1 rounded-full font-medium ${className}`}
      style={{
        background: colors.bg,
        border: `1px solid ${colors.border}`,
        color: colors.text,
        fontFamily: 'JetBrains Mono, monospace',
      }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.15 }}
    >
      {text}
    </motion.span>
  )
}
