import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/api'

export default function Login() {
  const { entrar } = useAuth()
  const [email, setEmail] = useState('')
  const [clave, setClave] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  async function enviar(e: React.FormEvent) {
    e.preventDefault()
    setError(''); setCargando(true)
    try { await entrar(email, clave) }
    catch (err: any) { setError(err.message) }
    finally { setCargando(false) }
  }

  const campo = 'w-full rounded-sm border border-morado/15 bg-white px-4 py-3 text-sm text-grafito placeholder:text-grafito/60 focus:border-morado/40 focus:outline-none'

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <form onSubmit={enviar} className="tarjeta w-full max-w-sm rounded-sm p-8">
        <h1 className="font-display text-2xl text-grafito">Panel interno</h1>
        <p className="mt-2 text-xs text-grafito/60">Acceso para el despacho y el equipo de comunicaciones.</p>

        <div className="mt-6 space-y-3">
          <input className={campo} type="email" placeholder="Correo institucional" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className={campo} type="password" placeholder="Contraseña" value={clave} onChange={(e) => setClave(e.target.value)} />
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        {!api.configurado && (
          <p className="mt-4 rounded-sm border border-naranja/40 bg-amarillo/10 p-3 text-xs leading-relaxed text-naranja">
            Supabase todavía no está conectado. Copia <code>.env.example</code> a <code>.env</code>, pon la URL y la llave
            anónima de tu proyecto, y reinicia el servidor.
          </p>
        )}

        <button disabled={cargando} className="boton mt-6 w-full rounded-full py-3 text-[12px] tracking-[0.16em] text-grafito/60 disabled:opacity-50">
          {cargando ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}
