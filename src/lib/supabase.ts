import { createClient, SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

/** Cuando no hay llaves configuradas la app funciona con datos de ejemplo. */
export const supabaseListo = Boolean(url && key && url.startsWith('http'))

export const supabase: SupabaseClient | null = supabaseListo
  ? createClient(url as string, key as string)
  : null

/** Sube un archivo al bucket "medios" y devuelve la URL publica. */
export async function subirArchivo(file: File, carpeta = 'general'): Promise<string> {
  if (!supabase) throw new Error('Conecta Supabase para subir archivos.')
  const ruta = `${carpeta}/${Date.now()}-${file.name.replace(/\s+/g, '-').toLowerCase()}`
  const { error } = await supabase.storage.from('medios').upload(ruta, file, { upsert: false })
  if (error) throw error
  const { data } = supabase.storage.from('medios').getPublicUrl(ruta)
  return data.publicUrl
}
