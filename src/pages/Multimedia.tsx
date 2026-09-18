import { useEffect, useState } from 'react'
import { Play, Image as Img, Volume2 } from 'lucide-react'
import Pagina from '../components/Pagina'
import { api, fechaCorta } from '../lib/api'
import { useSitio } from '../context/SitioContext'
import { porClave } from '../lib/navegacion'
import type { Multimedia as M } from '../lib/types'

export default function Multimedia() {
  const { tituloDe } = useSitio()
  const [items, setItems] = useState<M[]>([])
  useEffect(() => { api.multimedia().then(setItems) }, [])

  const Icono = { foto: Img, video: Play, audio: Volume2 }

  return (
    <Pagina titulo={tituloDe('multimedia')} bajada={porClave('multimedia')!.bajada}>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((m) => {
          const I = Icono[m.tipo]
          const contenido = (
            <>
              <div className="flex aspect-[4/3] items-center justify-center bg-morado">
                {m.miniatura_url
                  ? <img src={m.miniatura_url} alt="" className="h-full w-full object-cover" />
                  : <I size={30} className="text-white/40" />}
              </div>
              <div className="p-4">
                <h2 className="font-display text-lg text-grafito">{m.titulo}</h2>
                <p className="mt-1 text-xs text-grafito/45">{m.tipo} · {fechaCorta(m.fecha)}</p>
              </div>
            </>
          )
          return m.url
            ? <a key={m.id} href={m.url} target="_blank" rel="noreferrer" className="tarjeta tarjeta-enlace overflow-hidden rounded-2xl">{contenido}</a>
            : <div key={m.id} className="tarjeta overflow-hidden rounded-2xl">{contenido}</div>
        })}
        {items.length === 0 && <p className="text-sm text-grafito/50">Todavía no hay material publicado.</p>}
      </div>
    </Pagina>
  )
}
