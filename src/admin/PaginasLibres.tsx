import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { subirArchivo } from '../lib/supabase'
import type { PaginaLibre } from '../lib/types'

const campo = 'w-full rounded-xl border border-morado/15 bg-white px-3 py-2 text-sm text-grafito focus:border-morado focus:outline-none'

/** Editor de las dos subpaginas libres (/pagina-1 y /pagina-2). */
export default function PaginasLibres() {
  const [items, setItems] = useState<PaginaLibre[]>([])
  const [aviso, setAviso] = useState('')

  const cargar = () => api.paginasLibres(true).then(setItems)
  useEffect(() => { cargar() }, [])

  const editar = (clave: string, k: string, v: any) =>
    setItems((l) => l.map((p) => (p.clave === clave ? { ...p, [k]: v } : p)))

  async function guardar(p: PaginaLibre) {
    try { await api.guardar('paginas_libres', p as any); setAviso(`«${p.titulo}» guardada.`) }
    catch (e: any) { setAviso(e.message) }
  }

  async function imagen(p: PaginaLibre, f: File) {
    try { editar(p.clave, 'imagen_url', await subirArchivo(f, 'paginas')) }
    catch (e: any) { setAviso(e.message) }
  }

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-3xl text-morado">Páginas libres</h1>
      <p className="mt-2 max-w-medida text-sm text-grafito/60">
        Dos subpáginas vacías listas para conectar. Escribe aquí su contenido y enciéndelas en
        Configuración del sitio para que aparezcan en el menú. Sus rutas son <code>/pagina-1</code> y <code>/pagina-2</code>.
      </p>
      {aviso && <p className="mt-4 text-sm text-naranja">{aviso}</p>}

      <div className="mt-8 space-y-8">
        {items.map((p) => (
          <section key={p.clave} className="tarjeta rounded-2xl p-6">
            <p className="text-xs uppercase tracking-wide text-grafito/40">{p.clave.replace('pagina_libre_', 'Página ')}</p>

            <div className="mt-4 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs text-grafito/50">Título (también es el nombre en el menú)</label>
                <input className={campo} value={p.titulo} onChange={(e) => editar(p.clave, 'titulo', e.target.value)} />
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-grafito/50">Bajada</label>
                <input className={campo} value={p.bajada} onChange={(e) => editar(p.clave, 'bajada', e.target.value)} />
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-grafito/50">Contenido</label>
                <textarea className={`${campo} min-h-[180px]`} value={p.contenido} onChange={(e) => editar(p.clave, 'contenido', e.target.value)} />
                <p className="mt-1 text-[11px] text-grafito/40">Separa los párrafos con una línea en blanco.</p>
              </div>
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <label className="mb-1.5 block text-xs text-grafito/50">Imagen destacada</label>
                  <input className={campo} value={p.imagen_url} onChange={(e) => editar(p.clave, 'imagen_url', e.target.value)} placeholder="https://…" />
                </div>
                <label className="boton cursor-pointer">
                  Subir
                  <input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && imagen(p, e.target.files[0])} />
                </label>
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-grafito/50">Estado</label>
                <select className={campo} value={p.estado_publicacion} onChange={(e) => editar(p.clave, 'estado_publicacion', e.target.value)}>
                  <option value="borrador">Borrador</option>
                  <option value="revision">En revisión</option>
                  <option value="publicado">Publicado</option>
                </select>
              </div>
            </div>

            <button onClick={() => guardar(p)} className="boton mt-6">Guardar cambios</button>
          </section>
        ))}
      </div>
    </div>
  )
}
