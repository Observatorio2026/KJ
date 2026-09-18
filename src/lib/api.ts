import { supabase, supabaseListo } from './supabase'
import * as demo from './demo'
import type {
  Ajustes, Modulo, Publicacion, ProyectoAcuerdo, Votacion, ControlPolitico,
  EventoAgenda, Indicador, Multimedia, DocumentoTransparencia, Pqrs, Perfil, PaginaLibre,
} from './types'

/**
 * Capa de datos unica. Si Supabase esta configurado consulta la base;
 * si no, devuelve los datos de ejemplo para que la pagina siempre renderice.
 */

type Tabla =
  | 'publicaciones' | 'proyectos_acuerdo' | 'votaciones' | 'control_politico'
  | 'agenda' | 'indicadores' | 'multimedia' | 'transparencia' | 'pqrs' | 'perfiles'

async function traer<T>(tabla: Tabla, orden: string, asc = false, soloPublicado = true): Promise<T[]> {
  if (!supabaseListo || !supabase) return []
  let q = supabase.from(tabla).select('*').order(orden, { ascending: asc })
  if (soloPublicado) q = q.eq('estado_publicacion', 'publicado')
  const { data, error } = await q
  if (error) { console.error(`[${tabla}]`, error.message); return [] }
  return (data ?? []) as T[]
}

export const api = {
  configurado: supabaseListo,

  async ajustes(): Promise<Ajustes> {
    if (!supabaseListo || !supabase) return demo.ajustesDemo
    const { data } = await supabase.from('ajustes').select('*').eq('id', 1).single()
    return (data as Ajustes) ?? demo.ajustesDemo
  },

  async modulos(): Promise<Modulo[]> {
    if (!supabaseListo || !supabase) return demo.modulosDemo
    const { data } = await supabase.from('modulos').select('*').order('orden')
    return (data as Modulo[]) ?? demo.modulosDemo
  },

  async indicadores(): Promise<Indicador[]> {
    if (!supabaseListo || !supabase) return demo.indicadoresDemo
    const { data } = await supabase.from('indicadores').select('*').order('orden')
    return (data as Indicador[]) ?? demo.indicadoresDemo
  },

  async publicaciones(todas = false): Promise<Publicacion[]> {
    if (!supabaseListo || !supabase) return demo.publicacionesDemo
    let q = supabase.from('publicaciones').select('*').order('publicado_at', { ascending: false })
    if (!todas) q = q.eq('estado', 'publicado')
    const { data } = await q
    return (data as Publicacion[]) ?? []
  },

  async publicacionPorSlug(slug: string): Promise<Publicacion | null> {
    if (!supabaseListo || !supabase) return demo.publicacionesDemo.find((p) => p.slug === slug) ?? null
    const { data } = await supabase.from('publicaciones').select('*').eq('slug', slug).single()
    return (data as Publicacion) ?? null
  },

  async proyectos(todos = false): Promise<ProyectoAcuerdo[]> {
    const r = await traer<ProyectoAcuerdo>('proyectos_acuerdo', 'fecha_radicacion', false, !todos)
    return supabaseListo ? r : demo.proyectosDemo
  },

  async votaciones(todas = false): Promise<Votacion[]> {
    const r = await traer<Votacion>('votaciones', 'fecha', false, !todas)
    return supabaseListo ? r : demo.votacionesDemo
  },

  async controlPolitico(todos = false): Promise<ControlPolitico[]> {
    const r = await traer<ControlPolitico>('control_politico', 'fecha', false, !todos)
    return supabaseListo ? r : demo.controlDemo
  },

  async agenda(todos = false): Promise<EventoAgenda[]> {
    const r = await traer<EventoAgenda>('agenda', 'fecha_inicio', true, !todos)
    return supabaseListo ? r : demo.agendaDemo
  },

  async multimedia(todos = false): Promise<Multimedia[]> {
    const r = await traer<Multimedia>('multimedia', 'fecha', false, !todos)
    return supabaseListo ? r : demo.multimediaDemo
  },

  async transparencia(todos = false): Promise<DocumentoTransparencia[]> {
    const r = await traer<DocumentoTransparencia>('transparencia', 'fecha_publicacion', false, !todos)
    return supabaseListo ? r : demo.transparenciaDemo
  },

  async paginasLibres(todas = false): Promise<PaginaLibre[]> {
    if (!supabaseListo || !supabase) return demo.paginasLibresDemo
    let q = supabase.from('paginas_libres').select('*').order('clave')
    if (!todas) q = q.eq('estado_publicacion', 'publicado')
    const { data } = await q
    return (data as PaginaLibre[]) ?? []
  },

  async paginaLibre(clave: string): Promise<PaginaLibre | null> {
    const todas = await this.paginasLibres(true)
    return todas.find((p) => p.clave === clave) ?? null
  },

  async pqrs(): Promise<Pqrs[]> {
    if (!supabaseListo || !supabase) return []
    const { data } = await supabase.from('pqrs').select('*').order('created_at', { ascending: false })
    return (data as Pqrs[]) ?? []
  },

  async enviarPqrs(p: Omit<Pqrs, 'id' | 'estado' | 'created_at'>) {
    if (!supabaseListo || !supabase) return { ok: true, demo: true }
    const { error } = await supabase.from('pqrs').insert({ ...p, estado: 'nuevo' })
    if (error) throw error
    return { ok: true, demo: false }
  },

  async suscribir(email: string) {
    if (!supabaseListo || !supabase) return { ok: true, demo: true }
    const { error } = await supabase.from('suscriptores').insert({ email, acepta_datos: true })
    if (error) throw error
    return { ok: true, demo: false }
  },

  async perfiles(): Promise<Perfil[]> {
    if (!supabaseListo || !supabase) return []
    const { data } = await supabase.from('perfiles').select('*').order('nombre')
    return (data as Perfil[]) ?? []
  },

  /** Crear / actualizar / borrar genericos usados por el panel. */
  async guardar(tabla: string, fila: Record<string, any>) {
    if (!supabaseListo || !supabase) throw new Error('Conecta Supabase para guardar cambios.')
    const { data, error } = fila.id
      ? await supabase.from(tabla).update(fila).eq('id', fila.id).select().single()
      : await supabase.from(tabla).insert(fila).select().single()
    if (error) throw error
    return data
  },

  async eliminar(tabla: string, id: string | number) {
    if (!supabaseListo || !supabase) throw new Error('Conecta Supabase para eliminar registros.')
    const { error } = await supabase.from(tabla).delete().eq('id', id)
    if (error) throw error
  },
}

export const fechaLarga = (iso: string) =>
  new Date(iso + (iso.length === 10 ? 'T12:00:00' : '')).toLocaleDateString('es-CO', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

export const fechaCorta = (iso: string) =>
  new Date(iso + (iso.length === 10 ? 'T12:00:00' : '')).toLocaleDateString('es-CO', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
