import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { useSitio } from '../context/SitioContext'
import type { Ajustes, Modulo } from '../lib/types'

const campo = 'w-full rounded-sm border border-morado/15 bg-white px-3 py-2 text-sm text-grafito focus:border-morado/40 focus:outline-none'

/** Solo el administrador entra aqui: define identidad del sitio y que secciones se ven. */
export default function ConfigSitio() {
  const { ajustes, modulos, recargar } = useSitio()
  const [a, setA] = useState<Ajustes | null>(null)
  const [m, setM] = useState<Modulo[]>([])
  const [aviso, setAviso] = useState('')

  useEffect(() => { setA(ajustes); setM(modulos) }, [ajustes, modulos])
  if (!a) return null

  const set = (k: keyof Ajustes, v: any) => setA({ ...a, [k]: v })
  const setRed = (k: string, v: string) => setA({ ...a, redes: { ...a.redes, [k]: v } })

  async function guardarAjustes() {
    try { await api.guardar('ajustes', a as any); await recargar(); setAviso('Configuración guardada.') }
    catch (e: any) { setAviso(e.message) }
  }

  async function alternar(clave: string, prop: 'activo' | 'en_menu') {
    const actualizado = m.map((x) => (x.clave === clave ? { ...x, [prop]: !x[prop] } : x))
    setM(actualizado)
    const fila = actualizado.find((x) => x.clave === clave)!
    try { await api.guardar('modulos', fila as any); await recargar() }
    catch (e: any) { setAviso(e.message) }
  }

  /** El nombre del modulo es el que aparece en el menu y en la cabecera de su subpagina. */
  const renombrar = (clave: string, nombre: string) =>
    setM((l) => l.map((x) => (x.clave === clave ? { ...x, nombre } : x)))

  async function guardarNombre(clave: string) {
    const fila = m.find((x) => x.clave === clave)!
    try { await api.guardar('modulos', fila as any); await recargar(); setAviso('Nombre actualizado.') }
    catch (e: any) { setAviso(e.message) }
  }

  const campos: [keyof Ajustes, string][] = [
    ['concejal_nombre', 'Nombre completo'], ['cargo', 'Cargo'], ['municipio', 'Municipio'],
    ['departamento', 'Departamento'], ['periodo', 'Periodo'], ['partido', 'Partido o movimiento'],
    ['lema', 'Lema del hero'], ['email_contacto', 'Correo de contacto'], ['telefono', 'Teléfono'],
    ['direccion_despacho', 'Dirección del despacho'], ['horario_atencion', 'Horario de atención'],
    ['foto_url', 'Foto de perfil (URL)'], ['video_hero_url', 'Video de fondo del hero (URL)'],
  ]

  return (
    <div className="max-w-4xl">
      <h1 className="font-display text-3xl text-grafito">Configuración del sitio</h1>
      <p className="mt-2 max-w-medida text-sm text-grafito/60">
        Aquí se define la identidad del sitio y qué subpáginas ve la ciudadanía. Puedes renombrar cada sección (el nombre
        aparece en el menú y en su cabecera). Apagar una subpágina la oculta de inmediato, sin borrar su contenido.
      </p>
      {aviso && <p className="mt-4 text-sm text-naranja">{aviso}</p>}

      <h2 className="mt-10 text-sm tracking-wide text-naranja">Secciones del sitio</h2>
      <div className="mt-4 divide-y divide-morado/10 border-y border-morado/15">
        {m.map((mod) => (
          <div key={mod.clave} className="flex flex-wrap items-center gap-4 py-4">
            <div className="min-w-0 flex-1">
              <input
                value={mod.nombre}
                onChange={(e) => renombrar(mod.clave, e.target.value)}
                onBlur={() => guardarNombre(mod.clave)}
                className="w-full rounded-lg border border-transparent bg-transparent px-2 py-1 text-sm font-medium text-grafito hover:border-morado/15 focus:border-morado focus:outline-none"
              />
              <p className="mt-0.5 px-2 text-xs text-grafito/60">
                {mod.descripcion}{mod.ruta && mod.ruta !== '/' ? ` · ${mod.ruta}` : ''}
              </p>
            </div>
            <label className="flex items-center gap-2 text-xs text-grafito/60">
              <input type="checkbox" checked={mod.activo} onChange={() => alternar(mod.clave, 'activo')} className="accent-[#28949B]" />
              Visible
            </label>
            <label className="flex items-center gap-2 text-xs text-grafito/60">
              <input type="checkbox" checked={mod.en_menu} onChange={() => alternar(mod.clave, 'en_menu')} className="accent-[#F1B809]" />
              En el menú
            </label>
          </div>
        ))}
      </div>

      <h2 className="mt-12 text-sm tracking-wide text-naranja">Identidad</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {campos.map(([k, t]) => (
          <div key={k}>
            <label className="mb-1.5 block text-xs text-grafito/60">{t}</label>
            <input className={campo} value={(a[k] as string) ?? ''} onChange={(e) => set(k, e.target.value)} />
          </div>
        ))}
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs text-grafito/60">Biografía corta</label>
          <textarea className={`${campo} min-h-[80px]`} value={a.bio_corta} onChange={(e) => set('bio_corta', e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs text-grafito/60">Biografía completa</label>
          <textarea className={`${campo} min-h-[160px]`} value={a.bio_larga} onChange={(e) => set('bio_larga', e.target.value)} />
        </div>
      </div>

      <h2 className="mt-12 text-sm tracking-wide text-naranja">Redes sociales</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {['instagram', 'facebook', 'x', 'youtube', 'whatsapp'].map((r) => (
          <div key={r}>
            <label className="mb-1.5 block text-xs capitalize text-grafito/60">{r}</label>
            <input className={campo} value={(a.redes as any)[r] ?? ''} onChange={(e) => setRed(r, e.target.value)} placeholder="https://" />
          </div>
        ))}
      </div>

      <button onClick={guardarAjustes} className="boton mt-8 rounded-full px-7 py-3 text-xs tracking-wide text-grafito/60">
        Guardar configuración
      </button>
    </div>
  )
}
