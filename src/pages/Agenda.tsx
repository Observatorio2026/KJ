import { useEffect, useState } from 'react'
import { MapPin, Clock } from 'lucide-react'
import Pagina, { Etiqueta } from '../components/Pagina'
import { api } from '../lib/api'
import { useSitio } from '../context/SitioContext'
import { porClave } from '../lib/navegacion'
import type { EventoAgenda } from '../lib/types'

const TIPOS: Record<EventoAgenda['tipo'], string> = {
  sesion_plenaria: 'Plenaria', comision: 'Comisión', comunidad: 'Comunidad',
  visita_territorio: 'Territorio', rendicion_cuentas: 'Rendición de cuentas',
}

export default function Agenda() {
  const { tituloDe } = useSitio()
  const [items, setItems] = useState<EventoAgenda[]>([])
  useEffect(() => { api.agenda().then(setItems) }, [])

  const dia = (iso: string) => new Date(iso + 'T12:00:00').getDate()
  const mes = (iso: string) => new Date(iso + 'T12:00:00').toLocaleDateString('es-CO', { month: 'short' })

  return (
    <Pagina titulo={tituloDe('agenda')} bajada={porClave('agenda')!.bajada}>
      <div className="space-y-3">
        {items.map((e) => (
          <article key={e.id} className="tarjeta flex gap-5 rounded-2xl p-5">
            <div className="flex w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-morado py-3 text-white">
              <span className="font-display text-2xl leading-none">{dia(e.fecha_inicio)}</span>
              <span className="mt-1 text-[11px] uppercase text-amarillo">{mes(e.fecha_inicio)}</span>
            </div>
            <div>
              <Etiqueta tono="verde">{TIPOS[e.tipo]}</Etiqueta>
              <h2 className="mt-2 font-display text-lg text-grafito">{e.titulo}</h2>
              <p className="mt-1 text-sm text-grafito/60">{e.descripcion}</p>
              <div className="mt-2 flex flex-wrap gap-4 text-xs text-grafito/45">
                <span className="inline-flex items-center gap-1.5"><Clock size={12} /> {e.hora}</span>
                <span className="inline-flex items-center gap-1.5"><MapPin size={12} /> {e.lugar}</span>
              </div>
            </div>
          </article>
        ))}
        {items.length === 0 && <p className="text-sm text-grafito/50">No hay actividades programadas por ahora.</p>}
      </div>
    </Pagina>
  )
}
