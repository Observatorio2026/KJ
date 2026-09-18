import { useEffect, useState } from 'react'
import { api, fechaLarga } from '../lib/api'
import type { Pqrs } from '../lib/types'

const ESTADO_TEXTO: Record<Pqrs['estado'], string> = { nuevo: 'Sin abrir', en_tramite: 'En trámite', cerrado: 'Cerrado' }
const ESTADO_TONO: Record<Pqrs['estado'], string> = {
  nuevo: 'bg-naranja/15 text-naranja',
  en_tramite: 'bg-amarillo/20 text-[#8a6600]',
  cerrado: 'bg-verde/15 text-verde',
}

export default function Buzon() {
  const [items, setItems] = useState<Pqrs[]>([])
  const [filtro, setFiltro] = useState('todos')
  const [aviso, setAviso] = useState('')
  const [guardandoId, setGuardandoId] = useState<string | null>(null)
  const cargar = () => api.pqrs().then(setItems)
  useEffect(() => { cargar() }, [])

  async function marcar(p: Pqrs, estado: Pqrs['estado']) {
    setGuardandoId(p.id)
    try {
      await api.guardar('pqrs', { ...p, estado })
      setAviso(`Actualizado a «${ESTADO_TEXTO[estado]}».`)
      await cargar()
    } catch (e: any) {
      setAviso(
        e.message?.includes('multiple (or no) rows') || e.message?.includes('coerce')
          ? 'Tu usuario no tiene permiso para actualizar el buzón. Revisa que tu perfil esté activo en la tabla "perfiles".'
          : `No se pudo actualizar: ${e.message}`
      )
    } finally {
      setGuardandoId(null)
    }
  }

  const visibles = filtro === 'todos' ? items : items.filter((i) => i.estado === filtro)

  return (
    <div className="max-w-4xl">
      <h1 className="font-display text-3xl text-grafito">Buzón ciudadano</h1>
      <p className="mt-2 max-w-medida text-sm text-grafito/60">
        Peticiones radicadas desde el sitio. El término legal de respuesta corre desde la fecha de radicación.
      </p>

      <div className="mt-6 flex gap-2">
        {['todos', 'nuevo', 'en_tramite', 'cerrado'].map((f) => (
          <button key={f} onClick={() => setFiltro(f)}
            className={`rounded-full border px-4 py-1.5 text-xs ${filtro === f ? 'border-naranja text-naranja' : 'border-morado/15 text-grafito/60'}`}>
            {f === 'todos' ? 'Todos' : f === 'en_tramite' ? 'En trámite' : f === 'nuevo' ? 'Sin abrir' : 'Cerrados'}
          </button>
        ))}
      </div>

      {aviso && (
        <p className={`mt-4 text-sm font-medium ${aviso.startsWith('Actualizado') ? 'text-verde' : 'text-red-600'}`}>{aviso}</p>
      )}

      <div className="mt-6 space-y-3">
        {visibles.map((p) => (
          <article key={p.id} className="tarjeta rounded-sm p-5">
            <div className="flex flex-wrap items-center gap-3 text-xs text-grafito/60">
              <span className="capitalize text-naranja">{p.tipo}</span>
              <span>{fechaLarga(p.created_at.slice(0, 10))}</span>
              <span>{p.barrio_vereda}</span>
              <span className={`ml-auto rounded-full px-3 py-1 text-[11px] font-semibold ${ESTADO_TONO[p.estado]}`}>
                {ESTADO_TEXTO[p.estado]}
              </span>
            </div>
            <p className="mt-2 text-sm text-grafito">{p.nombre} · {p.email} {p.telefono && `· ${p.telefono}`}</p>
            <p className="mt-2 text-sm leading-relaxed text-grafito/60">{p.mensaje}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => marcar(p, 'en_tramite')}
                disabled={guardandoId === p.id || p.estado === 'en_tramite'}
                className={`rounded-full border px-4 py-1.5 text-xs transition-colors disabled:opacity-40 ${
                  p.estado === 'en_tramite' ? 'border-amarillo bg-amarillo/15 text-[#8a6600]' : 'border-morado/15 text-grafito/60 hover:text-grafito'
                }`}
              >
                {guardandoId === p.id ? 'Guardando…' : 'Marcar en trámite'}
              </button>
              <button
                onClick={() => marcar(p, 'cerrado')}
                disabled={guardandoId === p.id || p.estado === 'cerrado'}
                className={`rounded-full border px-4 py-1.5 text-xs transition-colors disabled:opacity-40 ${
                  p.estado === 'cerrado' ? 'border-verde bg-verde/10 text-verde' : 'border-morado/15 text-grafito/60 hover:text-grafito'
                }`}
              >
                {guardandoId === p.id ? 'Guardando…' : 'Cerrar'}
              </button>
              <a href={`mailto:${p.email}`} className="rounded-full border border-naranja/40 px-4 py-1.5 text-xs text-naranja">Responder</a>
            </div>
          </article>
        ))}
        {visibles.length === 0 && <p className="py-8 text-sm text-grafito/60">No hay mensajes con ese filtro.</p>}
      </div>
    </div>
  )
}
