import { useEffect, useState } from 'react'
import { Check, X, Minus, CircleSlash, UserMinus } from 'lucide-react'
import Pagina, { Etiqueta } from '../components/Pagina'
import { api, fechaLarga } from '../lib/api'
import { useSitio } from '../context/SitioContext'
import { porClave } from '../lib/navegacion'
import type { Votacion } from '../lib/types'

const VOTOS = {
  si: { texto: 'Voté sí', Icono: Check, fondo: 'bg-verde', texto_color: 'text-verde' },
  no: { texto: 'Voté no', Icono: X, fondo: 'bg-naranja', texto_color: 'text-naranja' },
  abstencion: { texto: 'Me abstuve', Icono: Minus, fondo: 'bg-amarillo', texto_color: 'text-[#8a6600]' },
  ausente: { texto: 'Ausente', Icono: UserMinus, fondo: 'bg-grafito/40', texto_color: 'text-grafito/60' },
  impedido: { texto: 'Impedimento', Icono: CircleSlash, fondo: 'bg-morado', texto_color: 'text-morado' },
}

export default function Votaciones() {
  const { tituloDe } = useSitio()
  const [items, setItems] = useState<Votacion[]>([])
  const [filtro, setFiltro] = useState('todos')
  useEffect(() => { api.votaciones().then(setItems) }, [])

  const visibles = filtro === 'todos' ? items : items.filter((v) => v.voto === filtro)

  return (
    <Pagina titulo={tituloDe('votaciones')} bajada={porClave('votaciones')!.bajada}>
      <div className="mb-10 flex flex-wrap gap-2">
        {['todos', 'si', 'no', 'abstencion', 'impedido', 'ausente'].map((f) => (
          <button key={f} onClick={() => setFiltro(f)}
            className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
              filtro === f ? 'bg-morado text-white' : 'bg-white text-grafito/60 hover:text-morado'
            }`}>
            {f === 'todos' ? 'Todas' : VOTOS[f as keyof typeof VOTOS].texto}
          </button>
        ))}
      </div>

      <ol className="relative border-l-2 border-morado/15 pl-7 sm:pl-9">
        {visibles.map((v) => {
          const { texto, Icono, fondo, texto_color } = VOTOS[v.voto]
          return (
            <li key={v.id} className="relative pb-10">
              <span className={`absolute -left-[41px] flex h-8 w-8 items-center justify-center rounded-full text-white sm:-left-[49px] ${fondo}`}>
                <Icono size={15} />
              </span>
              <div className="flex flex-wrap items-center gap-3 text-xs text-grafito/45">
                <span>{fechaLarga(v.fecha)}</span>
                <span>·</span>
                <span>{v.sesion}</span>
                {v.proyecto_numero && <Etiqueta tono="gris">Proyecto {v.proyecto_numero}</Etiqueta>}
              </div>
              <h2 className="mt-2 font-display text-xl text-grafito sm:text-2xl">{v.asunto}</h2>
              <p className={`mt-2 text-sm font-semibold ${texto_color}`}>{texto} · El asunto quedó {v.resultado}</p>
              <p className="mt-2 max-w-medida leading-relaxed text-grafito/70">{v.justificacion}</p>
              {v.acta_url && v.acta_url !== '#' && (
                <a href={v.acta_url} target="_blank" rel="noreferrer" className="mt-2 inline-block text-sm font-medium text-naranja hover:underline">
                  Ver acta de la sesión
                </a>
              )}
            </li>
          )
        })}
      </ol>
      {visibles.length === 0 && <p className="text-sm text-grafito/50">No hay votaciones registradas con ese filtro.</p>}
    </Pagina>
  )
}
