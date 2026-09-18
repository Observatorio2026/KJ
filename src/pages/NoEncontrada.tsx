import { Link } from 'react-router-dom'

export default function NoEncontrada() {
  return (
    <div className="mx-auto max-w-xl px-6 py-28 text-center">
      <p className="font-display text-6xl text-amarillo">404</p>
      <h1 className="mt-4 font-display text-3xl text-morado">Esta página no existe o está apagada</h1>
      <p className="mt-3 text-grafito/60">
        Puede que la sección esté desactivada desde el panel interno. Vuelve al inicio y sigue el menú.
      </p>
      <Link to="/" className="boton mt-8">Volver al inicio</Link>
    </div>
  )
}
