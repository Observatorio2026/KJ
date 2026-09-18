import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, Upload } from 'lucide-react'
import { api } from '../lib/api'
import { subirArchivo } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export type Campo = {
  k: string
  t: string
  tipo?: 'texto' | 'area' | 'select' | 'fecha' | 'numero' | 'check' | 'lista' | 'archivo'
  opciones?: { v: string; t: string }[]
  ancho?: 'completo' | 'medio'
  ayuda?: string
}

interface Props {
  titulo: string
  descripcion: string
  tabla: string
  campos: Campo[]
  cargar: () => Promise<any[]>
  fila: (r: any) => { principal: string; secundario: string; estado?: string }
  nuevoPorDefecto?: Record<string, any>
  /** Estados de publicacion disponibles; el comunicador decide que se ve. */
  conEstado?: 'estado' | 'estado_publicacion' | null
}

const campoCls = 'w-full rounded-sm border border-morado/15 bg-white px-3 py-2 text-sm text-grafito placeholder:text-grafito/60 focus:border-morado/40 focus:outline-none'

export default function Coleccion({ titulo, descripcion, tabla, campos, cargar, fila, nuevoPorDefecto = {}, conEstado = 'estado_publicacion' }: Props) {
  const { puede } = useAuth()
  const [items, setItems] = useState<any[]>([])
  const [editando, setEditando] = useState<any | null>(null)
  const [aviso, setAviso] = useState('')
  const [cargando, setCargando] = useState(true)

  const refrescar = () => cargar().then((r) => { setItems(r); setCargando(false) })
  useEffect(() => { refrescar() }, [])

  async function guardar() {
    try {
      const limpio = { ...editando }
      campos.filter((c) => c.tipo === 'lista').forEach((c) => {
        if (typeof limpio[c.k] === 'string') limpio[c.k] = limpio[c.k].split(',').map((s: string) => s.trim()).filter(Boolean)
      })
      await api.guardar(tabla, limpio)
      setEditando(null); setAviso('Cambios guardados.'); refrescar()
    } catch (e: any) { setAviso(e.message) }
  }

  async function borrar(id: string) {
    if (!confirm('¿Eliminar este registro? La acción no se puede deshacer.')) return
    try { await api.eliminar(tabla, id); setAviso('Registro eliminado.'); refrescar() }
    catch (e: any) { setAviso(e.message) }
  }

  async function archivo(c: Campo, f: File) {
    try {
      const url = await subirArchivo(f, tabla)
      setEditando((e: any) => ({ ...e, [c.k]: url }))
    } catch (err: any) { setAviso(err.message) }
  }

  const estados = conEstado === 'estado'
    ? [{ v: 'borrador', t: 'Borrador' }, { v: 'revision', t: 'En revisión' }, { v: 'publicado', t: 'Publicado' }]
    : [{ v: 'borrador', t: 'Borrador' }, { v: 'revision', t: 'En revisión' }, { v: 'publicado', t: 'Publicado' }]

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-grafito">{titulo}</h1>
          <p className="mt-2 max-w-medida text-sm text-grafito/60">{descripcion}</p>
        </div>
        <button
          onClick={() => setEditando({ ...nuevoPorDefecto, ...(conEstado ? { [conEstado]: 'borrador' } : {}) })}
          className="boton inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs tracking-wide text-grafito/60"
        >
          <Plus size={14} /> Crear
        </button>
      </div>

      {aviso && <p className="mt-4 text-sm text-naranja">{aviso}</p>}
      {!api.configurado && (
        <p className="mt-4 rounded-sm border border-naranja/40 bg-amarillo/10 p-3 text-xs text-naranja">
          Estás viendo datos de ejemplo. Conecta Supabase para crear y editar contenido real.
        </p>
      )}

      <div className="mt-8 divide-y divide-morado/10 border-y border-morado/15">
        {cargando && <p className="py-6 text-sm text-grafito/60">Cargando…</p>}
        {!cargando && items.length === 0 && (
          <p className="py-8 text-sm text-grafito/60">Todavía no hay registros. Usa el botón «Crear» para agregar el primero.</p>
        )}
        {items.map((r) => {
          const f = fila(r)
          return (
            <div key={r.id} className="flex items-start gap-4 py-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-grafito">{f.principal}</p>
                <p className="mt-1 truncate text-xs text-grafito/60">{f.secundario}</p>
              </div>
              {conEstado && (
                <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] ${
                  r[conEstado] === 'publicado' ? 'border-verde/40 text-verde'
                  : r[conEstado] === 'revision' ? 'border-naranja/40 text-naranja' : 'border-morado/15 text-grafito/60'
                }`}>
                  {r[conEstado] === 'publicado' ? 'Publicado' : r[conEstado] === 'revision' ? 'En revisión' : 'Borrador'}
                </span>
              )}
              <button onClick={() => setEditando({ ...r })} className="shrink-0 text-grafito/60 hover:text-naranja" aria-label="Editar"><Pencil size={15} /></button>
              {puede('gestionar_sitio') && (
                <button onClick={() => borrar(r.id)} className="shrink-0 text-grafito/60 hover:text-red-600" aria-label="Eliminar"><Trash2 size={15} /></button>
              )}
            </div>
          )
        })}
      </div>

      {editando && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 sm:p-8">
          <div className="tarjeta w-full max-w-2xl rounded-sm p-6">
            <h2 className="font-display text-2xl text-grafito">{editando.id ? 'Editar registro' : 'Nuevo registro'}</h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {campos.map((c) => (
                <div key={c.k} className={c.ancho === 'medio' ? '' : 'sm:col-span-2'}>
                  <label className="mb-1.5 block text-xs text-grafito/60">{c.t}</label>

                  {c.tipo === 'area' ? (
                    <textarea className={`${campoCls} min-h-[120px]`} value={editando[c.k] ?? ''} onChange={(e) => setEditando({ ...editando, [c.k]: e.target.value })} />
                  ) : c.tipo === 'select' ? (
                    <select className={campoCls} value={editando[c.k] ?? ''} onChange={(e) => setEditando({ ...editando, [c.k]: e.target.value })}>
                      <option value="" className="bg-white">Seleccionar…</option>
                      {c.opciones?.map((o) => <option key={o.v} value={o.v} className="bg-white">{o.t}</option>)}
                    </select>
                  ) : c.tipo === 'check' ? (
                    <label className="flex items-center gap-2 text-sm text-grafito/60">
                      <input type="checkbox" checked={!!editando[c.k]} onChange={(e) => setEditando({ ...editando, [c.k]: e.target.checked })} className="accent-[#F1B809]" />
                      Sí
                    </label>
                  ) : c.tipo === 'archivo' ? (
                    <div className="flex items-center gap-3">
                      <input className={campoCls} placeholder="https://…" value={editando[c.k] ?? ''} onChange={(e) => setEditando({ ...editando, [c.k]: e.target.value })} />
                      <label className="boton inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-xs text-grafito/60">
                        <Upload size={13} /> Subir
                        <input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && archivo(c, e.target.files[0])} />
                      </label>
                    </div>
                  ) : (
                    <input
                      className={campoCls}
                      type={c.tipo === 'fecha' ? 'date' : c.tipo === 'numero' ? 'number' : 'text'}
                      value={Array.isArray(editando[c.k]) ? editando[c.k].join(', ') : editando[c.k] ?? ''}
                      onChange={(e) => setEditando({ ...editando, [c.k]: e.target.value })}
                    />
                  )}
                  {c.ayuda && <p className="mt-1 text-[11px] text-grafito/60">{c.ayuda}</p>}
                </div>
              ))}

              {conEstado && (
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs text-grafito/60">Estado</label>
                  <select className={campoCls} value={editando[conEstado] ?? 'borrador'} onChange={(e) => setEditando({ ...editando, [conEstado]: e.target.value })}>
                    {estados.map((o) => <option key={o.v} value={o.v} className="bg-white">{o.t}</option>)}
                  </select>
                  <p className="mt-1 text-[11px] text-grafito/60">Solo lo que esté en «Publicado» aparece en el sitio.</p>
                </div>
              )}
            </div>

            <div className="mt-7 flex gap-3">
              <button onClick={guardar} className="boton rounded-full px-6 py-2.5 text-xs tracking-wide text-grafito/60">Guardar cambios</button>
              <button onClick={() => setEditando(null)} className="rounded-full border border-morado/15 px-6 py-2.5 text-xs text-grafito/60 hover:text-grafito">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
