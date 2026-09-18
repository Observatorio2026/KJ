import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { api } from '../lib/api'
import { porClave } from '../lib/navegacion'
import type { Ajustes, Modulo } from '../lib/types'

interface Estado {
  ajustes: Ajustes | null
  modulos: Modulo[]
  activo: (clave: string) => boolean
  enMenu: (clave: string) => boolean
  tituloDe: (clave: string) => string
  recargar: () => Promise<void>
  cargando: boolean
}

const Ctx = createContext<Estado>(null as any)
export const useSitio = () => useContext(Ctx)

export function SitioProvider({ children }: { children: ReactNode }) {
  const [ajustes, setAjustes] = useState<Ajustes | null>(null)
  const [modulos, setModulos] = useState<Modulo[]>([])
  const [cargando, setCargando] = useState(true)

  async function recargar() {
    const [a, m] = await Promise.all([api.ajustes(), api.modulos()])
    setAjustes(a); setModulos(m); setCargando(false)
  }
  useEffect(() => { recargar() }, [])

  const activo = (clave: string) => modulos.find((m) => m.clave === clave)?.activo ?? false
  const enMenu = (clave: string) => {
    const m = modulos.find((x) => x.clave === clave)
    return !!m && m.activo && m.en_menu
  }
  /** El administrador puede renombrar cualquier seccion desde el panel. */
  const tituloDe = (clave: string) =>
    modulos.find((m) => m.clave === clave)?.nombre || porClave(clave)?.titulo || clave

  return <Ctx.Provider value={{ ajustes, modulos, activo, enMenu, tituloDe, recargar, cargando }}>{children}</Ctx.Provider>
}
