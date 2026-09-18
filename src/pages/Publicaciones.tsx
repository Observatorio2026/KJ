import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Pagina, { Etiqueta } from '../components/Pagina'
import { api, fechaCorta } from '../lib/api'
import { useSitio } from '../context/SitioContext'
import { porClave } from '../lib/navegacion'
import type { Publicacion } from '../lib/types'

const TIPOS: Record<Publicacion['tipo'], string> = {
  noticia: 'Noticia', articulo: 'Artículo', columna: 'Columna de opinión',
  comunicado: 'Comunicado', informe: 'Informe',
}

export default function Publicaciones() {
  const { tituloDe } = useSitio()
  const [items, setItems] = useState<Publicacion[]>([])
  const [filtro, setFiltro] = useState('todos')
  useEffect(() => { api.publicaciones().then(setItems) }, [])

  const visibles = filtro === 'todos' ? items : items.filter((p) => p.tipo === filtro)
  const destacadas = visibles.filter((p) => p.destacado).slice(0, 2)
  const resto = visibles.filter((p) => !destacadas.includes(p))

  return (
    <Pagina titulo={tituloDe('publicaciones')} bajada={porClave('publicaciones')!.bajada}>
      <div className="mb-8 flex flex-wrap gap-2">
        {['todos', ...Object.keys(TIPOS)].map((f) => (
          <button key={f} onClick={() => setFiltro(f)}
            className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
              filtro === f ? 'bg-morado text-white' : 'bg-white text-grafito/60 hover:text-morado'
            }`}>
            {f === 'todos' ? 'Todas' : TIPOS[f as Publicacion['tipo']]}
          </button>
        ))}
      </div>

      {destacadas.length > 0 && (
        <div className="mb-10 grid gap-5 md:grid-cols-2">
          {destacadas.map((p) => (
            <Link key={p.id} to={`/publicacion/${p.slug}`} className="tarjeta tarjeta-enlace block overflow-hidden rounded-2xl">
              <div className="aspect-[16/8] bg-morado">
                {p.portada_url && <img src={p.portada_url} alt="" className="h-full w-full object-cover" />}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3">
                  <Etiqueta tono="amarillo">{TIPOS[p.tipo]}</Etiqueta>
                  <span className="text-xs text-grafito/45">{fechaCorta(p.publicado_at)}</span>
                </div>
                <h2 className="mt-3 font-display text-2xl leading-snug text-grafito">{p.titulo}</h2>
                <p className="mt-2 leading-relaxed text-grafito/65">{p.resumen}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="divide-y divide-morado/10 border-y border-morado/10">
        {resto.map((p) => (
          <Link key={p.id} to={`/publicacion/${p.slug}`} className="group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-6">
            <span className="w-28 shrink-0 text-xs text-grafito/45">{fechaCorta(p.publicado_at)}</span>
            <div>
              <h3 className="font-display text-lg text-grafito group-hover:text-morado">{p.titulo}</h3>
              <p className="mt-1 text-sm text-grafito/60">{p.resumen}</p>
            </div>
            <span className="ml-auto hidden shrink-0 text-xs text-grafito/40 sm:block">{TIPOS[p.tipo]}</span>
          </Link>
        ))}
      </div>
      {visibles.length === 0 && <p className="text-sm text-grafito/50">No hay publicaciones de este tipo.</p>}
    </Pagina>
  )
}
