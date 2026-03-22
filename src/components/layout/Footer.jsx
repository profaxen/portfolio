import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.footer
      ref={ref}
      className="relative z-10 py-8"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Gradient line separator */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px"
        style={{
          width: '80%',
          background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.3), rgba(59,130,246,0.3), transparent)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500">
          © 2024 Adarsh Tiwari · Built with{' '}
          <a
            href="https://react.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-accent-purple transition-colors duration-300"
          >
            React
          </a>{' '}
          &amp; ♥
        </p>

        <div className="flex items-center gap-4">
          {[
            { Icon: Github, href: 'https://github.com/profaxen', label: 'GitHub' },
            { Icon: Linkedin, href: 'https://www.linkedin.com/in/adarsh-tiwari-590b56244', label: 'LinkedIn' },
            { Icon: Mail, href: 'mailto:codewithadarshh@gmail.com', label: 'Email' },
          ].map(({ Icon, href, label }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 transition-colors duration-300"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
              whileHover={{
                scale: 1.15,
                color: '#c4b5fd',
                background: 'rgba(124,58,237,0.1)',
                borderColor: 'rgba(124,58,237,0.3)',
                boxShadow: '0 0 15px rgba(124,58,237,0.2)',
                y: -3,
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
            >
              <Icon size={16} />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.footer>
  )
}
