import { Outlet } from 'react-router-dom'
import Navegacion from './Navegacion'
import PieDePagina from './PieDePagina'

/** Estructura comun del sitio publico: barra fija arriba, subpagina en medio, pie abajo. */
export default function Cascara() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navegacion />
      <div className="flex-1"><Outlet /></div>
      <PieDePagina />
    </div>
  )
}
