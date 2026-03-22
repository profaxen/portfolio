import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer
      className="relative z-10 py-8"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500">
          © 2024 Adarsh Tiwari · Built with{' '}
          <a
            href="https://react.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-accent-purple transition-colors duration-200"
          >
            React
          </a>{' '}
          &amp; ♥
        </p>

        <div className="flex items-center gap-5">
          {[
            { Icon: Github, href: 'https://github.com/profaxen', label: 'GitHub' },
            { Icon: Linkedin, href: 'https://www.linkedin.com/in/adarsh-tiwari-590b56244', label: 'LinkedIn' },
            { Icon: Mail, href: 'mailto:codewithadarshh@gmail.com', label: 'Email' },
          ].map(({ Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-slate-500 hover:text-accent-purple transition-colors duration-200"
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  )
}
