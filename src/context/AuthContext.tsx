import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase, supabaseListo } from '../lib/supabase'
import type { Perfil, Rol } from '../lib/types'

interface Estado {
  perfil: Perfil | null
  cargando: boolean
  entrar: (email: string, clave: string) => Promise<void>
  salir: () => Promise<void>
  puede: (accion: 'gestionar_sitio' | 'gestionar_usuarios' | 'publicar' | 'editar_contenido') => boolean
}

const Ctx = createContext<Estado>(null as any)
export const useAuth = () => useContext(Ctx)

/** Permisos por rol. El admin configura el sitio; el comunicador maneja el contenido. */
const PERMISOS: Record<Rol, string[]> = {
  admin: ['gestionar_sitio', 'gestionar_usuarios', 'publicar', 'editar_contenido'],
  comunicador: ['publicar', 'editar_contenido'],
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [perfil, setPerfil] = useState<Perfil | null>(null)
  const [cargando, setCargando] = useState(true)

  async function cargarPerfil(userId: string, email?: string) {
    if (!supabase) return null
    const { data } = await supabase.from('perfiles').select('*').eq('id', userId).single()
    if (!data) return null
    const p = { ...(data as Perfil), email }
    setPerfil(p)
    return p
  }

  useEffect(() => {
    if (!supabaseListo || !supabase) { setCargando(false); return }
    supabase.auth.getSession().then(async ({ data }) => {
      if (data.session?.user) await cargarPerfil(data.session.user.id, data.session.user.email!)
      setCargando(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange(async (_e, session) => {
      if (session?.user) await cargarPerfil(session.user.id, session.user.email!)
      else setPerfil(null)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  async function entrar(email: string, clave: string) {
    if (!supabase) throw new Error('Conecta Supabase en el archivo .env para iniciar sesión.')
    const { error } = await supabase.auth.signInWithPassword({ email, password: clave })
    if (error) throw new Error('Correo o contraseña incorrectos.')
  }

  async function salir() {
    await supabase?.auth.signOut()
    setPerfil(null)
  }

  const puede = (accion: string) => !!perfil && PERMISOS[perfil.rol]?.includes(accion)

  return <Ctx.Provider value={{ perfil, cargando, entrar, salir, puede: puede as any }}>{children}</Ctx.Provider>
}
