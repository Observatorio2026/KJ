import { ReactNode } from 'react'
import { Entrada } from './Fade'

/** Envoltura comun de las secciones publicas: titulo en serif y bajada corta. */
export default function Seccion({
  id, titulo, bajada, children, fondo = 'tinta',
}: { id: string; titulo: string; bajada?: string; children: ReactNode; fondo?: 'tinta' | 'pizarra' }) {
  return (
    <section id={id} className={`scroll-mt-16 px-5 py-20 sm:px-8 md:px-12 md:py-28 ${fondo === 'pizarra' ? 'bg-pizarra' : 'bg-tinta'}`}>
      <div className="mx-auto max-w-6xl">
        <Entrada>
          <div className="mb-10 border-b border-hueso/10 pb-6">
            <h2 className="font-garamond text-3xl leading-tight text-hueso sm:text-4xl md:text-5xl">{titulo}</h2>
            {bajada && <p className="mt-3 max-w-medida text-sm leading-relaxed text-hueso/55 sm:text-base">{bajada}</p>}
          </div>
        </Entrada>
        {children}
      </div>
    </section>
  )
}

export function Etiqueta({ children, tono = 'musgo' }: { children: ReactNode; tono?: 'musgo' | 'arena' | 'neutro' | 'rojo' }) {
  const tonos = {
    musgo: 'border-musgoclaro/40 text-musgoclaro',
    arena: 'border-arena/40 text-arena',
    neutro: 'border-hueso/20 text-hueso/50',
    rojo: 'border-red-400/40 text-red-300',
  }
  return <span className={`inline-block rounded-full border px-3 py-1 text-[11px] tracking-wide ${tonos[tono]}`}>{children}</span>
}
