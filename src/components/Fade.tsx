import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'

/** Titular que aparece caracter por caracter. Se usa una sola vez, en el hero. */
export function LetraPorLetra({ texto, className = '' }: { texto: string; className?: string }) {
  const ref = useRef(null)
  const visible = useInView(ref, { once: true })
  return (
    <span ref={ref} className={className} aria-label={texto}>
      {texto.split('').map((c, i) => (
        <motion.span
          key={i}
          aria-hidden
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.07, duration: 0.5 }}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {c}
        </motion.span>
      ))}
    </span>
  )
}

/** Entrada discreta para bloques de contenido. */
export function Entrada({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const visible = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 14 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
