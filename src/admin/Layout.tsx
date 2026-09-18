import { NavLink, Outlet, Link } from 'react-router-dom'
import {
  LayoutDashboard, FileText, Gavel, Vote, Megaphone, CalendarDays,
  Images, ShieldCheck, Inbox, SlidersHorizontal, Users, LogOut, ExternalLink, Layers,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const CONTENIDO = [
  { a: '/admin', t: 'Resumen', I: LayoutDashboard, exacto: true },
  { a: '/admin/publicaciones', t: 'Publicaciones', I: FileText },
  { a: '/admin/proyectos', t: 'Proyectos de acuerdo', I: Gavel },
  { a: '/admin/votaciones', t: 'Votaciones', I: Vote },
  { a: '/admin/control', t: 'Control político', I: Megaphone },
  { a: '/admin/agenda', t: 'Agenda', I: CalendarDays },
  { a: '/admin/multimedia', t: 'Multimedia', I: Images },
  { a: '/admin/transparencia', t: 'Transparencia', I: ShieldCheck },
  { a: '/admin/pqrs', t: 'Buzón ciudadano', I: Inbox },
  { a: '/admin/paginas', t: 'Páginas libres', I: Layers },
]

const ADMINISTRACION = [
  { a: '/admin/sitio', t: 'Configuración del sitio', I: SlidersHorizontal },
  { a: '/admin/usuarios', t: 'Usuarios y permisos', I: Users },
]

export default function Layout() {
  const { perfil, salir, puede } = useAuth()

  const clase = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-sm px-3 py-2 text-sm transition-colors ${
      isActive ? 'bg-morado text-white' : 'text-grafito/60 hover:bg-morado/5 hover:text-grafito'
    }`

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 border-r border-morado/15 bg-white p-5 md:block">
        <p className="font-display text-lg text-morado">Panel interno</p>
        <p className="mt-1 text-[11px] text-grafito/60">
          {perfil?.nombre} · {perfil?.rol === 'admin' ? 'Administrador' : 'Comunicaciones'}
        </p>

        <nav className="mt-7 space-y-1">
          <p className="px-3 pb-2 text-[11px] tracking-wide text-grafito/60">Contenido</p>
          {CONTENIDO.map((i) => (
            <NavLink key={i.a} to={i.a} end={i.exacto} className={clase}>
              <i.I size={15} /> {i.t}
            </NavLink>
          ))}

          {puede('gestionar_sitio') && (
            <>
              <p className="px-3 pb-2 pt-5 text-[11px] tracking-wide text-grafito/60">Administración</p>
              {ADMINISTRACION.map((i) => (
                <NavLink key={i.a} to={i.a} className={clase}>
                  <i.I size={15} /> {i.t}
                </NavLink>
              ))}
            </>
          )}
        </nav>

        <div className="mt-8 space-y-1 border-t border-morado/15 pt-5">
          <Link to="/" className="flex items-center gap-3 px-3 py-2 text-sm text-grafito/60 hover:text-grafito">
            <ExternalLink size={15} /> Ver el sitio
          </Link>
          <button onClick={salir} className="flex w-full items-center gap-3 px-3 py-2 text-sm text-grafito/60 hover:text-grafito">
            <LogOut size={15} /> Cerrar sesión
          </button>
        </div>
      </aside>

      <div className="flex-1 overflow-x-hidden">
        {/* Navegacion compacta para pantallas pequenas */}
        <div className="flex gap-1 overflow-x-auto border-b border-morado/15 bg-white p-2 md:hidden">
          {[...CONTENIDO, ...(puede('gestionar_sitio') ? ADMINISTRACION : [])].map((i) => (
            <NavLink key={i.a} to={i.a} end={(i as any).exacto} className="shrink-0 rounded-sm px-3 py-2 text-xs text-grafito/60">
              {i.t}
            </NavLink>
          ))}
        </div>
        <div className="p-5 sm:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
