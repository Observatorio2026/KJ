import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { SitioProvider, useSitio } from './context/SitioContext'

import Cascara from './components/Cascara'
import Inicio from './pages/Inicio'
import QuienSoy from './pages/QuienSoy'
import Proyectos from './pages/Proyectos'
import Votaciones from './pages/Votaciones'
import Control from './pages/Control'
import Publicaciones from './pages/Publicaciones'
import PublicacionDetalle from './pages/PublicacionDetalle'
import Agenda from './pages/Agenda'
import Multimedia from './pages/Multimedia'
import Transparencia from './pages/Transparencia'
import Escribame from './pages/Escribame'
import PaginaLibre from './pages/PaginaLibre'
import PoliticaDatos from './pages/PoliticaDatos'
import NoEncontrada from './pages/NoEncontrada'

import Login from './admin/Login'
import Layout from './admin/Layout'
import Resumen from './admin/Resumen'
import ConfigSitio from './admin/ConfigSitio'
import Usuarios from './admin/Usuarios'
import Buzon from './admin/Buzon'
import PaginasLibres from './admin/PaginasLibres'
import {
  AdminPublicaciones, AdminProyectos, AdminVotaciones, AdminControl,
  AdminAgenda, AdminMultimedia, AdminTransparencia,
} from './admin/paginas'

/** Una subpagina solo responde si su modulo esta encendido. */
function Modulo({ clave, children }: { clave: string; children: JSX.Element }) {
  const { activo, cargando } = useSitio()
  if (cargando) return <div className="px-6 py-24 text-center text-sm text-grafito/50">Cargando…</div>
  return activo(clave) ? children : <NoEncontrada />
}

function Protegido({ children, soloAdmin = false }: { children: JSX.Element; soloAdmin?: boolean }) {
  const { perfil, cargando, puede } = useAuth()
  if (cargando) return <div className="flex h-screen items-center justify-center text-sm text-grafito/50">Verificando sesión…</div>
  if (!perfil || !perfil.activo) return <Login />
  if (soloAdmin && !puede('gestionar_sitio')) {
    return (
      <div className="p-8">
        <h1 className="font-display text-2xl text-morado">Esta sección es del administrador</h1>
        <p className="mt-2 text-sm text-grafito/60">Tu perfil de comunicaciones puede crear y publicar contenido, pero no cambiar la configuración del sitio.</p>
      </div>
    )
  }
  return children
}

export default function App() {
  return (
    <AuthProvider>
      <SitioProvider>
        <Routes>
          {/* Sitio publico: cada apartado es su propia subpagina */}
          <Route element={<Cascara />}>
            <Route path="/" element={<Inicio />} />
            <Route path="/quien-soy" element={<Modulo clave="perfil"><QuienSoy /></Modulo>} />
            <Route path="/proyectos-de-acuerdo" element={<Modulo clave="proyectos"><Proyectos /></Modulo>} />
            <Route path="/votaciones" element={<Modulo clave="votaciones"><Votaciones /></Modulo>} />
            <Route path="/control-politico" element={<Modulo clave="control"><Control /></Modulo>} />
            <Route path="/publicaciones" element={<Modulo clave="publicaciones"><Publicaciones /></Modulo>} />
            <Route path="/publicacion/:slug" element={<Modulo clave="publicaciones"><PublicacionDetalle /></Modulo>} />
            <Route path="/agenda" element={<Modulo clave="agenda"><Agenda /></Modulo>} />
            <Route path="/multimedia" element={<Modulo clave="multimedia"><Multimedia /></Modulo>} />
            <Route path="/transparencia" element={<Modulo clave="transparencia"><Transparencia /></Modulo>} />
            <Route path="/escribame" element={<Modulo clave="pqrs"><Escribame /></Modulo>} />
            <Route path="/pagina-1" element={<Modulo clave="pagina_libre_1"><PaginaLibre clave="pagina_libre_1" /></Modulo>} />
            <Route path="/pagina-2" element={<Modulo clave="pagina_libre_2"><PaginaLibre clave="pagina_libre_2" /></Modulo>} />
            <Route path="/politica-de-datos" element={<PoliticaDatos />} />
            <Route path="*" element={<NoEncontrada />} />
          </Route>

          {/* Panel interno */}
          <Route path="/admin" element={<Protegido><Layout /></Protegido>}>
            <Route index element={<Resumen />} />
            <Route path="publicaciones" element={<AdminPublicaciones />} />
            <Route path="proyectos" element={<AdminProyectos />} />
            <Route path="votaciones" element={<AdminVotaciones />} />
            <Route path="control" element={<AdminControl />} />
            <Route path="agenda" element={<AdminAgenda />} />
            <Route path="multimedia" element={<AdminMultimedia />} />
            <Route path="transparencia" element={<AdminTransparencia />} />
            <Route path="pqrs" element={<Buzon />} />
            <Route path="paginas" element={<PaginasLibres />} />
            <Route path="sitio" element={<Protegido soloAdmin><ConfigSitio /></Protegido>} />
            <Route path="usuarios" element={<Protegido soloAdmin><Usuarios /></Protegido>} />
          </Route>

          <Route path="/inicio" element={<Navigate to="/" replace />} />
        </Routes>
      </SitioProvider>
    </AuthProvider>
  )
}
