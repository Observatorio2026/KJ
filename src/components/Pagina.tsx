import { ReactNode, useEffect } from 'react'
import { Entrada } from './Fade'

/** Cabecera comun de cada subpagina, con las curvas de la marca. */
export default function Pagina({ titulo, bajada, children }: { titulo: string; bajada?: string; children: ReactNode }) {
  useEffect(() => { window.scrollTo(0, 0); document.title = `${titulo} | Kevin Jiménez` }, [titulo])

  return (
    <main>
      <header className="curvas-marca px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <span className="mb-4 inline-block h-1 w-14 bg-amarillo" />
          <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl">{titulo}</h1>
          {bajada && <p className="mt-4 max-w-medida text-base leading-relaxed text-white/75">{bajada}</p>}
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        <Entrada>{children}</Entrada>
      </div>
    </main>
  )
}

export function Etiqueta({ children, tono = 'morado' }: { children: ReactNode; tono?: 'morado' | 'amarillo' | 'naranja' | 'verde' | 'gris' }) {
  const tonos = {
    morado: 'bg-morado/10 text-morado',
    amarillo: 'bg-amarillo/20 text-[#8a6600]',
    naranja: 'bg-naranja/15 text-naranja',
    verde: 'bg-verde/15 text-verde',
    gris: 'bg-grafito/8 text-grafito/60',
  }
  return <span className={`inline-block rounded-full px-3 py-1 text-[11px] font-medium ${tonos[tono]}`}>{children}</span>
}
