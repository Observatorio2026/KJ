import { useEffect, useState } from 'react'
import Pagina from '../components/Pagina'
import { api } from '../lib/api'
import { useSitio } from '../context/SitioContext'
import type { PaginaLibre as PL } from '../lib/types'

/**
 * Subpagina en blanco, lista para conectar. Su titulo, bajada y contenido se editan
 * en el panel (Paginas libres) y se enciende en Configuracion del sitio.
 */
export default function PaginaLibre({ clave }: { clave: 'pagina_libre_1' | 'pagina_libre_2' }) {
  const { tituloDe } = useSitio()
  const [pl, setPl] = useState<PL | null>(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => { api.paginaLibre(clave).then((r) => { setPl(r); setCargando(false) }) }, [clave])

  if (cargando) return <div className="px-6 py-24 text-center text-sm text-grafito/50">Cargando…</div>

  return (
    <Pagina titulo={pl?.titulo || tituloDe(clave)} bajada={pl?.bajada}>
      {pl?.imagen_url && <img src={pl.imagen_url} alt="" className="mb-8 w-full rounded-2xl" />}
      <div className="prosa max-w-medida text-[16px] text-grafito/80">
        {(pl?.contenido || 'Esta página aún no tiene contenido. Edítala desde el panel interno, en «Páginas libres».')
          .split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </Pagina>
  )
}
