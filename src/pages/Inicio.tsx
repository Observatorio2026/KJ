import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Entrada } from '../components/Fade'
import { useSitio } from '../context/SitioContext'
import { api, fechaCorta } from '../lib/api'
import type { Indicador, Publicacion, Votacion, EventoAgenda } from '../lib/types'

const ATAJOS = [
  { clave: 'proyectos', ruta: '/proyectos-de-acuerdo', color: 'bg-morado', pie: 'Lo que he propuesto' },
  { clave: 'votaciones', ruta: '/votaciones', color: 'bg-naranja', pie: 'Cómo he votado' },
  { clave: 'control', ruta: '/control-politico', color: 'bg-verde', pie: 'A quién he citado' },
  { clave: 'transparencia', ruta: '/transparencia', color: 'bg-amarillo', pie: 'Qué tengo y qué declaro' },
]

export default function Inicio() {
  const { ajustes, activo, tituloDe } = useSitio()
  const [cifras, setCifras] = useState<Indicador[]>([])
  const [posts, setPosts] = useState<Publicacion[]>([])
  const [votos, setVotos] = useState<Votacion[]>([])
  const [agenda, setAgenda] = useState<EventoAgenda[]>([])

  useEffect(() => {
    document.title = 'Kevin Jiménez | Desde la diferencia construimos'
    api.indicadores().then(setCifras)
    api.publicaciones().then((r) => setPosts(r.slice(0, 3)))
    api.votaciones().then((r) => setVotos(r.slice(0, 3)))
    api.agenda().then((r) => setAgenda(r.slice(0, 3)))
  }, [])

  return (
    <main>
      {/* Portada: video de fondo bajo un velo morado de marca */}
      <header className="relative overflow-hidden bg-moradoprofundo">
        {ajustes?.video_hero_url && (
          <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline>
            <source src={ajustes.video_hero_url} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-moradoprofundo via-morado/90 to-morado/60" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.25fr_1fr] lg:items-center">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="text-xs font-medium tracking-[0.3em] text-amarillo"
            >
              {ajustes?.cargo?.toUpperCase()} · {ajustes?.municipio?.toUpperCase()} · {ajustes?.periodo}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-5 font-display text-5xl leading-[1.05] text-white sm:text-6xl lg:text-7xl"
            >
              Desde la diferencia<br />
              <span className="text-amarillo">construimos</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-6 max-w-medida text-base leading-relaxed text-white/80 sm:text-lg"
            >
              {ajustes?.bio_corta}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Link to="/votaciones" className="boton">Ver cómo he votado <ArrowRight size={16} /></Link>
              <Link to="/escribame" className="boton-linea">Escribirme</Link>
            </motion.div>
          </div>

          {/* Atajos a las subpaginas principales */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
            className="grid grid-cols-2 gap-3"
          >
            {ATAJOS.filter((a) => activo(a.clave)).map((a) => (
              <Link key={a.clave} to={a.ruta} className={`${a.color} group flex flex-col justify-between rounded-2xl p-5 text-white transition-transform hover:-translate-y-1`}>
                <span className={`font-display text-xl leading-tight ${a.clave === 'transparencia' ? 'text-moradoprofundo' : ''}`}>
                  {tituloDe(a.clave)}
                </span>
                <span className={`mt-8 inline-flex items-center gap-1 text-xs ${a.clave === 'transparencia' ? 'text-moradoprofundo/80' : 'text-white/75'}`}>
                  {a.pie} <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </motion.div>
        </div>
      </header>

      {/* Cifras */}
      {activo('gestion') && cifras.length > 0 && (
        <section className="border-b border-morado/10 bg-white px-5 py-12 sm:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {cifras.map((c, i) => (
              <Entrada key={c.id} delay={i * 0.05}>
                <p className="font-display text-5xl text-morado">
                  {c.valor}<span className="text-2xl text-naranja">{c.sufijo}</span>
                </p>
                <p className="mt-2 font-medium text-grafito">{c.etiqueta}</p>
                <p className="mt-1 text-sm text-grafito/55">{c.detalle}</p>
              </Entrada>
            ))}
          </div>
        </section>
      )}

      {/* Ultimos votos */}
      {activo('votaciones') && votos.length > 0 && (
        <section className="px-5 py-16 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2 className="font-display text-3xl text-morado">Últimos votos</h2>
              <Link to="/votaciones" className="text-sm font-medium text-naranja hover:underline">Ver el récord completo</Link>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {votos.map((v) => (
                <Link key={v.id} to="/votaciones" className="tarjeta tarjeta-enlace rounded-2xl p-5">
                  <span className={`inline-block rounded-full px-3 py-1 text-[11px] font-semibold ${
                    v.voto === 'si' ? 'bg-verde/15 text-verde' : v.voto === 'no' ? 'bg-naranja/15 text-naranja' : 'bg-morado/10 text-morado'
                  }`}>
                    {v.voto === 'si' ? 'Voté sí' : v.voto === 'no' ? 'Voté no' : v.voto === 'abstencion' ? 'Me abstuve' : v.voto === 'impedido' ? 'Impedimento' : 'Ausente'}
                  </span>
                  <p className="mt-3 font-display text-lg leading-snug text-grafito">{v.asunto}</p>
                  <p className="mt-2 text-xs text-grafito/50">{fechaCorta(v.fecha)} · {v.sesion}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Publicaciones + agenda */}
      <section className="bg-white px-5 py-16 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.6fr_1fr]">
          {activo('publicaciones') && (
            <div>
              <div className="mb-8 flex items-end justify-between gap-4">
                <h2 className="font-display text-3xl text-morado">Publicaciones recientes</h2>
                <Link to="/publicaciones" className="text-sm font-medium text-naranja hover:underline">Ver todas</Link>
              </div>
              <div className="space-y-4">
                {posts.map((p) => (
                  <Link key={p.id} to={`/publicacion/${p.slug}`} className="tarjeta tarjeta-enlace block rounded-2xl p-5">
                    <p className="text-xs text-grafito/50">{fechaCorta(p.publicado_at)} · {p.tipo}</p>
                    <h3 className="mt-2 font-display text-xl text-grafito">{p.titulo}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-grafito/65">{p.resumen}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {activo('agenda') && (
            <div>
              <div className="mb-8 flex items-end justify-between gap-4">
                <h2 className="font-display text-3xl text-morado">Agenda</h2>
                <Link to="/agenda" className="text-sm font-medium text-naranja hover:underline">Ver más</Link>
              </div>
              <ul className="space-y-4">
                {agenda.map((e) => (
                  <li key={e.id} className="flex gap-4 border-l-2 border-amarillo pl-4">
                    <div>
                      <p className="text-xs font-semibold text-naranja">{fechaCorta(e.fecha_inicio)} · {e.hora}</p>
                      <p className="mt-1 font-medium text-grafito">{e.titulo}</p>
                      <p className="text-sm text-grafito/55">{e.lugar}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
