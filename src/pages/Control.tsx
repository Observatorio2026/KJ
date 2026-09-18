import { useEffect, useState } from 'react'
import Pagina, { Etiqueta } from '../components/Pagina'
import { api, fechaLarga } from '../lib/api'
import { useSitio } from '../context/SitioContext'
import { porClave } from '../lib/navegacion'
import type { ControlPolitico } from '../lib/types'

const TIPOS: Record<ControlPolitico['tipo'], string> = {
  debate: 'Debate de control', citacion: 'Citación', proposicion: 'Proposición',
  derecho_peticion: 'Derecho de petición', invitacion: 'Invitación',
}

export default function Control() {
  const { tituloDe } = useSitio()
  const [items, setItems] = useState<ControlPolitico[]>([])
  useEffect(() => { api.controlPolitico().then(setItems) }, [])

  return (
    <Pagina titulo={tituloDe('control')} bajada={porClave('control')!.bajada}>
      <div className="grid gap-5 md:grid-cols-2">
        {items.map((c) => (
          <article key={c.id} className="tarjeta rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <Etiqueta tono="naranja">{TIPOS[c.tipo]}</Etiqueta>
              <span className="text-xs text-grafito/45">{fechaLarga(c.fecha)}</span>
            </div>
            <h2 className="mt-3 font-display text-xl text-grafito">{c.tema}</h2>
            <p className="mt-2 leading-relaxed text-grafito/70">{c.descripcion}</p>
            {c.citados.length > 0 && <p className="mt-3 text-xs text-grafito/50">Citados: {c.citados.join(' · ')}</p>}
            <p className="mt-4 border-l-4 border-verde bg-verde/5 px-4 py-3 text-sm text-grafito/80">{c.resultado}</p>
          </article>
        ))}
        {items.length === 0 && <p className="text-sm text-grafito/50">Todavía no hay acciones de control publicadas.</p>}
      </div>
    </Pagina>
  )
}
