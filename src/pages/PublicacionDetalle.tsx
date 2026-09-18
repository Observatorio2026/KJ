import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { api, fechaLarga } from '../lib/api'
import type { Publicacion } from '../lib/types'

export default function PublicacionDetalle() {
  const { slug } = useParams()
  const [p, setP] = useState<Publicacion | null>(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    api.publicacionPorSlug(slug!).then((r) => { setP(r); setCargando(false); if (r) document.title = `${r.titulo} | Kevin Jiménez` })
  }, [slug])

  if (cargando) return <div className="px-6 py-24 text-center text-sm text-grafito/50">Cargando…</div>

  if (!p) return (
    <div className="mx-auto max-w-2xl px-6 py-28 text-center">
      <h1 className="font-display text-3xl text-morado">Esta publicación no existe o fue retirada</h1>
      <Link to="/publicaciones" className="boton mt-8">Ver todas las publicaciones</Link>
    </div>
  )

  return (
    <main>
      <header className="curvas-marca px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <Link to="/publicaciones" className="inline-flex items-center gap-2 text-xs text-white/70 hover:text-amarillo">
            <ArrowLeft size={14} /> Todas las publicaciones
          </Link>
          <p className="mt-8 text-xs font-medium tracking-wide text-amarillo">{fechaLarga(p.publicado_at)} · {p.autor}</p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-white sm:text-5xl">{p.titulo}</h1>
          <p className="mt-4 max-w-medida text-lg leading-relaxed text-white/75">{p.resumen}</p>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
        {p.portada_url && <img src={p.portada_url} alt="" className="mb-10 w-full rounded-2xl" />}
        <div className="prosa max-w-medida text-[16px] text-grafito/80">
          {p.contenido.split('\n\n').map((par, i) => <p key={i}>{par}</p>)}
        </div>
        {p.etiquetas?.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-2 border-t border-morado/10 pt-6">
            {p.etiquetas.map((t) => (
              <span key={t} className="rounded-full bg-morado/8 px-3 py-1 text-[11px] text-morado">{t}</span>
            ))}
          </div>
        )}
      </article>
    </main>
  )
}
