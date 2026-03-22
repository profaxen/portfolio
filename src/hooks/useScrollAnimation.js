import { useInView, useAnimation } from 'framer-motion'
import { useEffect, useRef } from 'react'

export function useScrollAnimation(options = {}) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    margin: options.margin || '-100px',
  })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  return { ref, controls, isInView }
}
