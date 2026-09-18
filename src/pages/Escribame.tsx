import { useState } from 'react'
import Pagina from '../components/Pagina'
import { api } from '../lib/api'
import { useSitio } from '../context/SitioContext'
import { porClave } from '../lib/navegacion'

const TIPOS = [
  { v: 'peticion', t: 'Petición' }, { v: 'queja', t: 'Queja' }, { v: 'reclamo', t: 'Reclamo' },
  { v: 'sugerencia', t: 'Sugerencia' }, { v: 'denuncia', t: 'Denuncia' }, { v: 'felicitacion', t: 'Felicitación' },
]

const campo = 'w-full rounded-xl border border-morado/15 bg-white px-4 py-3 text-sm text-grafito placeholder:text-grafito/35 focus:border-morado focus:outline-none'

export default function Escribame() {
  const { ajustes, tituloDe } = useSitio()
  const [enviando, setEnviando] = useState(false)
  const [aviso, setAviso] = useState<{ tipo: 'ok' | 'error'; texto: string } | null>(null)
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', barrio_vereda: '', tipo: 'peticion', mensaje: '' })
  const [acepta, setAcepta] = useState(false)
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  async function enviar() {
    if (!form.nombre || !form.email || !form.mensaje) { setAviso({ tipo: 'error', texto: 'Faltan el nombre, el correo o el mensaje.' }); return }
    if (!acepta) { setAviso({ tipo: 'error', texto: 'Falta autorizar el tratamiento de datos personales.' }); return }
    setEnviando(true)
    try {
      const r = await api.enviarPqrs(form as any)
      setAviso({ tipo: 'ok', texto: r.demo
        ? 'Mensaje registrado en modo demostración. Conecta Supabase para que llegue al despacho.'
        : 'Mensaje recibido. El despacho responde en un máximo de 15 días hábiles.' })
      setForm({ nombre: '', email: '', telefono: '', barrio_vereda: '', tipo: 'peticion', mensaje: '' })
      setAcepta(false)
    } catch { setAviso({ tipo: 'error', texto: 'No se pudo enviar el mensaje. Intenta de nuevo en unos minutos.' }) }
    finally { setEnviando(false) }
  }

  return (
    <Pagina titulo={tituloDe('pqrs')} bajada={porClave('pqrs')!.bajada}>
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <input className={campo} placeholder="Nombre completo" value={form.nombre} onChange={(e) => set('nombre', e.target.value)} />
            <input className={campo} type="email" placeholder="Correo electrónico" value={form.email} onChange={(e) => set('email', e.target.value)} />
            <input className={campo} placeholder="Teléfono (opcional)" value={form.telefono} onChange={(e) => set('telefono', e.target.value)} />
            <input className={campo} placeholder="Barrio o vereda" value={form.barrio_vereda} onChange={(e) => set('barrio_vereda', e.target.value)} />
          </div>
          <select className={campo} value={form.tipo} onChange={(e) => set('tipo', e.target.value)}>
            {TIPOS.map((t) => <option key={t.v} value={t.v}>{t.t}</option>)}
          </select>
          <textarea className={`${campo} min-h-[160px] resize-y`} placeholder="Cuente el caso con el mayor detalle posible: lugar, fecha y qué necesita." value={form.mensaje} onChange={(e) => set('mensaje', e.target.value)} />

          <label className="flex items-start gap-3 text-xs text-grafito/60">
            <input type="checkbox" checked={acepta} onChange={(e) => setAcepta(e.target.checked)} className="mt-0.5 accent-[#3E3185]" />
            <span>Autorizo el tratamiento de mis datos personales conforme a la Ley 1581 de 2012, únicamente para responder esta solicitud.</span>
          </label>

          {aviso && <p className={`text-sm font-medium ${aviso.tipo === 'ok' ? 'text-verde' : 'text-naranja'}`}>{aviso.texto}</p>}
          <button onClick={enviar} disabled={enviando} className="boton disabled:opacity-50">
            {enviando ? 'Enviando…' : 'Enviar solicitud'}
          </button>
        </div>

        <aside className="tarjeta h-fit rounded-2xl p-6">
          <h2 className="font-display text-xl text-morado">Otros canales</h2>
          <dl className="mt-4 space-y-4 text-sm text-grafito/75">
            <div><dt className="text-xs uppercase tracking-wide text-grafito/40">Correo</dt><dd>{ajustes?.email_contacto}</dd></div>
            <div><dt className="text-xs uppercase tracking-wide text-grafito/40">Teléfono</dt><dd>{ajustes?.telefono}</dd></div>
            <div><dt className="text-xs uppercase tracking-wide text-grafito/40">Despacho</dt><dd>{ajustes?.direccion_despacho}</dd></div>
            <div><dt className="text-xs uppercase tracking-wide text-grafito/40">Atención presencial</dt><dd>{ajustes?.horario_atencion}</dd></div>
          </dl>
          <p className="mt-6 border-t border-morado/10 pt-4 text-xs leading-relaxed text-grafito/50">
            Si su solicitud es competencia de la administración municipal, la trasladamos a la secretaría respectiva y le avisamos a dónde fue.
          </p>
        </aside>
      </div>
    </Pagina>
  )
}
