import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import type { Perfil } from '../lib/types'

/** Solo administrador. Los usuarios se crean en Supabase > Authentication y aqui se les asigna rol. */
export default function Usuarios() {
  const [perfiles, setPerfiles] = useState<Perfil[]>([])
  const [aviso, setAviso] = useState('')

  const cargar = () => api.perfiles().then(setPerfiles)
  useEffect(() => { cargar() }, [])

  async function cambiar(p: Perfil, cambios: Partial<Perfil>) {
    try { await api.guardar('perfiles', { ...p, ...cambios }); setAviso('Permisos actualizados.'); cargar() }
    catch (e: any) { setAviso(e.message) }
  }

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-3xl text-grafito">Usuarios y permisos</h1>
      <p className="mt-2 max-w-medida text-sm text-grafito/60">
        El <strong className="text-grafito/60">administrador</strong> configura el sitio, enciende o apaga secciones y elimina
        registros. El perfil de <strong className="text-grafito/60">comunicaciones</strong> crea, edita y publica contenido.
      </p>
      {aviso && <p className="mt-4 text-sm text-naranja">{aviso}</p>}

      <div className="mt-8 divide-y divide-morado/10 border-y border-morado/15">
        {perfiles.map((p) => (
          <div key={p.id} className="flex flex-wrap items-center gap-4 py-4">
            <div className="min-w-0 flex-1">
              <p className="text-sm text-grafito">{p.nombre}</p>
              <p className="text-xs text-grafito/60">{p.email ?? p.id}</p>
            </div>
            <select
              value={p.rol}
              onChange={(e) => cambiar(p, { rol: e.target.value as any })}
              className="rounded-sm border border-morado/15 bg-white px-3 py-2 text-xs text-grafito"
            >
              <option value="admin" className="bg-white">Administrador</option>
              <option value="comunicador" className="bg-white">Comunicaciones</option>
            </select>
            <label className="flex items-center gap-2 text-xs text-grafito/60">
              <input type="checkbox" checked={p.activo} onChange={() => cambiar(p, { activo: !p.activo })} className="accent-[#28949B]" />
              Activo
            </label>
          </div>
        ))}
        {perfiles.length === 0 && (
          <p className="py-8 text-sm text-grafito/60">
            No hay perfiles cargados. Crea los usuarios en Supabase → Authentication → Users; el perfil se genera solo y aparecerá aquí.
          </p>
        )}
      </div>
    </div>
  )
}
