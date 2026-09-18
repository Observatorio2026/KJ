import Pagina from '../components/Pagina'
import { useSitio } from '../context/SitioContext'
import { porClave } from '../lib/navegacion'

const PILARES = [
  { t: 'Kev', d: 'Una forma de hacer política: escuchar primero en el territorio, redactar después.', c: 'bg-morado' },
  { t: 'Comunidad', d: 'La diferencia no divide, conecta. Cada pieza del rompecabezas cuenta.', c: 'bg-naranja' },
  { t: 'Territorio', d: 'Las montañas, el agua y las veredas son el punto de partida de cada proyecto.', c: 'bg-verde' },
]

export default function QuienSoy() {
  const { ajustes, tituloDe } = useSitio()
  if (!ajustes) return null

  return (
    <Pagina titulo={tituloDe('perfil')} bajada={porClave('perfil')!.bajada}>
      <div className="grid gap-10 md:grid-cols-[1fr_1.5fr]">
        <div className="tarjeta overflow-hidden rounded-2xl">
          {ajustes.foto_url ? (
            <img src={ajustes.foto_url} alt={ajustes.concejal_nombre} className="aspect-[3/4] w-full object-cover" />
          ) : (
            <div className="flex aspect-[3/4] items-center justify-center bg-morado">
              <span className="font-display text-6xl text-white/25">
                {ajustes.concejal_nombre.split(' ').map((p) => p[0]).slice(0, 2).join('')}
              </span>
            </div>
          )}
          <dl className="space-y-4 p-6 text-sm">
            {[
              ['Partido o movimiento', ajustes.partido],
              ['Periodo', ajustes.periodo],
              ['Despacho', ajustes.direccion_despacho],
              ['Atención al público', ajustes.horario_atencion],
            ].map(([t, v]) => (
              <div key={t}>
                <dt className="text-xs uppercase tracking-wide text-grafito/40">{t}</dt>
                <dd className="mt-0.5 text-grafito">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <p className="font-display text-2xl text-morado">{ajustes.lema}</p>
          <div className="prosa mt-5 max-w-medida text-[15px] text-grafito/80">
            {ajustes.bio_larga.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {PILARES.map((p) => (
              <div key={p.t} className="tarjeta rounded-2xl p-5">
                <span className={`mb-4 block h-1.5 w-10 rounded-full ${p.c}`} />
                <p className="font-display text-xl text-morado">{p.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-grafito/65">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Pagina>
  )
}
