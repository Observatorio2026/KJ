import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Lock } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { useSitio } from '../context/SitioContext'
import { SECCIONES } from '../lib/navegacion'

export default function Navegacion() {
  const [abierto, setAbierto] = useState(false)
  const { enMenu, tituloDe } = useSitio()
  const { pathname } = useLocation()

  useEffect(() => { setAbierto(false) }, [pathname])

  const visibles = SECCIONES.filter((s) => enMenu(s.clave))

  const clase = ({ isActive }: { isActive: boolean }) =>
    `relative py-1 text-[13px] font-medium transition-colors ${
      isActive ? 'text-amarillo' : 'text-white/75 hover:text-white'
    }`

  return (
    <div className="sticky top-0 z-40 border-b border-white/10 bg-morado/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link to="/" aria-label="Inicio"><Logo claro /></Link>

        <div className="hidden items-center gap-6 lg:flex">
          {visibles.map((s) => (
            <NavLink key={s.clave} to={s.ruta} className={clase}>{tituloDe(s.clave)}</NavLink>
          ))}
          <Link to="/admin" aria-label="Panel interno" className="text-white/45 hover:text-amarillo">
            <Lock size={15} />
          </Link>
        </div>

        <button
          onClick={() => setAbierto((v) => !v)}
          className="text-white lg:hidden"
          aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={abierto}
        >
          {abierto ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {abierto && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="overflow-hidden bg-moradoprofundo lg:hidden"
          >
            <div className="flex flex-col px-5 pb-6 pt-2">
              {visibles.map((s, i) => (
                <motion.div key={s.clave} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 + i * 0.04 }}>
                  <NavLink
                    to={s.ruta}
                    className={({ isActive }) =>
                      `block border-b border-white/10 py-3 text-sm ${isActive ? 'text-amarillo' : 'text-white/85'}`}
                  >
                    {tituloDe(s.clave)}
                  </NavLink>
                </motion.div>
              ))}
              <Link to="/admin" className="mt-4 text-xs tracking-[0.2em] text-amarillo/80">PANEL INTERNO</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
