import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'
import { useAuth } from '../context/AuthContext'
import { useSitio } from '../context/SitioContext'

export default function Resumen() {
  const { perfil, puede } = useAuth()
  const { ajustes, modulos } = useSitio()
  const [cifras, setCifras] = useState({ publicaciones: 0, borradores: 0, proyectos: 0, votaciones: 0, pqrs: 0 })

  useEffect(() => {
    Promise.all([api.publicaciones(true), api.proyectos(true), api.votaciones(true), api.pqrs()]).then(([p, pr, v, q]) => {
      setCifras({
        publicaciones: p.filter((x) => x.estado === 'publicado').length,
        borradores: p.filter((x) => x.estado !== 'publicado').length,
        proyectos: pr.length,
        votaciones: v.length,
        pqrs: q.filter((x) => x.estado === 'nuevo').length,
      })
    })
  }, [])

  const tarjetas = [
    { t: 'Publicaciones activas', v: cifras.publicaciones, a: '/admin/publicaciones' },
    { t: 'En borrador', v: cifras.borradores, a: '/admin/publicaciones' },
    { t: 'Proyectos registrados', v: cifras.proyectos, a: '/admin/proyectos' },
    { t: 'Votaciones registradas', v: cifras.votaciones, a: '/admin/votaciones' },
    { t: 'Mensajes sin abrir', v: cifras.pqrs, a: '/admin/pqrs' },
  ]

  const apagados = modulos.filter((m) => !m.activo)

  return (
    <div>
      <h1 className="font-display text-3xl text-grafito">Hola, {perfil?.nombre?.split(' ')[0]}</h1>
      <p className="mt-2 max-w-medida text-sm text-grafito/60">
        {puede('gestionar_sitio')
          ? 'Tienes control total: puedes encender o apagar secciones, editar la configuración del sitio y administrar usuarios.'
          : 'Puedes crear y publicar contenido. La configuración del sitio la maneja el administrador.'}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tarjetas.map((c) => (
          <Link key={c.t} to={c.a} className="tarjeta rounded-sm p-5 transition-colors hover:border-naranja/40">
            <p className="font-display text-4xl text-naranja">{c.v}</p>
            <p className="mt-1 text-sm text-grafito/60">{c.t}</p>
          </Link>
        ))}
      </div>

      {apagados.length > 0 && (
        <div className="tarjeta mt-8 rounded-sm p-5">
          <p className="text-sm text-grafito">Secciones apagadas ahora mismo</p>
          <p className="mt-2 text-xs text-grafito/60">{apagados.map((m) => m.nombre).join(' · ')}</p>
          {puede('gestionar_sitio') && (
            <Link to="/admin/sitio" className="mt-3 inline-block text-xs text-naranja hover:underline">Ir a configuración</Link>
          )}
        </div>
      )}

      <div className="tarjeta mt-8 rounded-sm p-5 text-sm text-grafito/60">
        <p className="text-grafito">Sitio: {ajustes?.concejal_nombre} · {ajustes?.municipio}</p>
        <p className="mt-2 text-xs">
          Antes de publicar, revise que la justificación del voto se entienda sin conocimiento jurídico previo y que los
          documentos adjuntos abran correctamente.
        </p>
      </div>
    </div>
  )
}
