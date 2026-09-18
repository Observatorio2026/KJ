/** Imagotipo: simbolo de hojas entrelazadas + nombre. Reemplazable por el SVG oficial. */
export default function Logo({ claro = false, compacto = false }: { claro?: boolean; compacto?: boolean }) {
  const texto = claro ? 'text-white' : 'text-morado'
  return (
    <span className="inline-flex items-center gap-3">
      <svg viewBox="0 0 48 56" className="h-9 w-auto" aria-hidden>
        <path d="M31 2c8 13 7 33-7 52C11 41 12 19 31 2z" fill="#F1B809" />
        <path d="M17 6C2 22 3 40 19 54 8 34 9 19 17 6z" fill="#E27815" />
        <path d="M26 8c5 12 4 29-6 44-8-14-7-31 6-44z" fill={claro ? '#FFFFFF' : '#3E3185'} opacity=".92" />
      </svg>
      {!compacto && (
        <span className="leading-none">
          <span className={`block font-display text-xl font-semibold ${texto}`}>Kevin</span>
          <span className="block text-[11px] font-medium tracking-[0.38em] text-amarillo">JIMÉNEZ</span>
        </span>
      )}
    </span>
  )
}
