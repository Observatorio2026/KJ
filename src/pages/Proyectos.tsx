import { useEffect, useMemo, useState } from 'react'
import { FileText } from 'lucide-react'
import Pagina, { Etiqueta } from '../components/Pagina'
import { api, fechaCorta } from '../lib/api'
import { useSitio } from '../context/SitioContext'
import { porClave } from '../lib/navegacion'
import type { ProyectoAcuerdo } from '../lib/types'

const ESTADOS: Record<ProyectoAcuerdo['estado'], { texto: string; tono: any }> = {
  radicado: { texto: 'Radicado', tono: 'gris' },
  primer_debate: { texto: 'Primer debate', tono: 'amarillo' },
  segundo_debate: { texto: 'Segundo debate', tono: 'amarillo' },
  aprobado: { texto: 'Aprobado', tono: 'verde' },
  sancionado: { texto: 'Sancionado', tono: 'verde' },
  objetado: { texto: 'Objetado', tono: 'naranja' },
  archivado: { texto: 'Archivado', tono: 'naranja' },
}

export default function Proyectos() {
  const { tituloDe } = useSitio()
  const [items, setItems] = useState<ProyectoAcuerdo[]>([])
  const [filtro, setFiltro] = useState('todos')
  useEffect(() => { api.proyectos().then(setItems) }, [])

  const temas = useMemo(() => ['todos', ...Array.from(new Set(items.map((i) => i.tema)))], [items])
  const visibles = filtro === 'todos' ? items : items.filter((i) => i.tema === filtro)

  return (
    <Pagina titulo={tituloDe('proyectos')} bajada={porClave('proyectos')!.bajada}>
      <div className="mb-8 flex flex-wrap gap-2">
        {temas.map((t) => (
          <button key={t} onClick={() => setFiltro(t)}
            className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
              filtro === t ? 'bg-morado text-white' : 'bg-white text-grafito/60 hover:text-morado'
            }`}>
            {t === 'todos' ? 'Todos los temas' : t}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {visibles.map((p) => (
          <article key={p.id} className="tarjeta rounded-2xl p-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-display text-lg text-naranja">{p.numero}</span>
              <Etiqueta tono={ESTADOS[p.estado].tono}>{ESTADOS[p.estado].texto}</Etiqueta>
              <Etiqueta tono="morado">{p.rol === 'autor' ? 'Autor' : p.rol === 'ponente' ? 'Ponente' : 'Coautor'}</Etiqueta>
              <Etiqueta tono="gris">{p.tema}</Etiqueta>
            </div>
            <h2 className="mt-3 font-display text-2xl text-grafito">{p.titulo}</h2>
            <p className="mt-2 max-w-medida leading-relaxed text-grafito/70">{p.objeto}</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-grafito/45">
              <span>Radicado el {fechaCorta(p.fecha_radicacion)}</span>
              <span>Último trámite: {fechaCorta(p.fecha_ultimo_tramite)}</span>
              {p.coautores.length > 0 && <span>Con: {p.coautores.join(', ')}</span>}
              {p.documento_url && p.documento_url !== '#' && (
                <a href={p.documento_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-medium text-naranja hover:underline">
                  <FileText size={13} /> Texto radicado
                </a>
              )}
            </div>
          </article>
        ))}
        {visibles.length === 0 && <p className="text-sm text-grafito/50">Todavía no hay proyectos publicados en este tema.</p>}
      </div>
    </Pagina>
  )
}
