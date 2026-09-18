import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Instagram, Facebook, Youtube, MessageCircle } from 'lucide-react'
import Logo from './Logo'
import { api } from '../lib/api'
import { useSitio } from '../context/SitioContext'
import { SECCIONES } from '../lib/navegacion'

export default function PieDePagina() {
  const { ajustes, activo, enMenu, tituloDe } = useSitio()
  const [email, setEmail] = useState('')
  const [aviso, setAviso] = useState('')

  async function suscribir() {
    if (!email.includes('@')) { setAviso('Escribe un correo válido.'); return }
    await api.suscribir(email)
    setAviso('Listo. Recibirás el boletín mensual de gestión.')
    setEmail('')
  }

  const redes = ajustes?.redes ?? {}

  return (
    <footer className="bg-moradoprofundo px-5 pb-10 pt-16 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        {activo('suscripcion') && (
          <div className="mb-12 flex flex-col gap-5 border-b border-white/10 pb-12 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-display text-2xl">Boletín mensual de gestión</h2>
              <p className="mt-2 max-w-medida text-sm text-white/65">
                Un correo al mes con lo que se votó, lo que se radicó y lo que viene.
              </p>
            </div>
            <div className="flex w-full max-w-sm gap-2">
              <input
                value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.com"
                className="w-full rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-white/40 focus:border-amarillo focus:outline-none"
              />
              <button onClick={suscribir} className="boton shrink-0">Suscribirme</button>
            </div>
          </div>
        )}
        {aviso && <p className="mb-8 text-sm text-amarillo">{aviso}</p>}

        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Logo claro />
            <p className="mt-4 font-display text-lg text-amarillo">Desde la diferencia construimos</p>
            <p className="mt-2 text-sm text-white/55">
              {ajustes?.cargo} de {ajustes?.municipio}, {ajustes?.departamento} · {ajustes?.periodo}
            </p>
          </div>

          <nav className="text-sm">
            <p className="mb-3 text-xs tracking-[0.2em] text-white/40">SECCIONES</p>
            <ul className="space-y-2">
              {SECCIONES.filter((s) => enMenu(s.clave)).slice(0, 6).map((s) => (
                <li key={s.clave}><Link to={s.ruta} className="text-white/70 hover:text-amarillo">{tituloDe(s.clave)}</Link></li>
              ))}
            </ul>
          </nav>

          <div className="text-sm">
            <p className="mb-3 text-xs tracking-[0.2em] text-white/40">CONTACTO</p>
            <p className="text-white/70">{ajustes?.email_contacto}</p>
            <p className="mt-1 text-white/70">{ajustes?.telefono}</p>
            <p className="mt-1 text-white/55">{ajustes?.direccion_despacho}</p>
            <div className="mt-4 flex gap-4 text-white/60">
              {redes.instagram && <a href={redes.instagram} aria-label="Instagram" className="hover:text-amarillo"><Instagram size={18} /></a>}
              {redes.facebook && <a href={redes.facebook} aria-label="Facebook" className="hover:text-amarillo"><Facebook size={18} /></a>}
              {redes.youtube && <a href={redes.youtube} aria-label="YouTube" className="hover:text-amarillo"><Youtube size={18} /></a>}
              {redes.whatsapp && <a href={redes.whatsapp} aria-label="WhatsApp" className="hover:text-amarillo"><MessageCircle size={18} /></a>}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-6 text-[11px] text-white/35">
          <span>Información publicada por el despacho. No es un sitio oficial del municipio.</span>
          <Link to="/politica-de-datos" className="hover:text-white/70">Política de tratamiento de datos</Link>
          <Link to="/admin" className="hover:text-white/70">Panel interno</Link>
        </div>
      </div>
    </footer>
  )
}
