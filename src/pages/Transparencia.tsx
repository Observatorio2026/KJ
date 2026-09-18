import { useEffect, useState } from 'react'
import { Download } from 'lucide-react'
import Pagina from '../components/Pagina'
import { api, fechaCorta } from '../lib/api'
import { useSitio } from '../context/SitioContext'
import { porClave } from '../lib/navegacion'
import type { DocumentoTransparencia } from '../lib/types'

const CATEGORIAS: Record<DocumentoTransparencia['categoria'], string> = {
  declaracion_bienes: 'Declaración de bienes y rentas',
  conflicto_intereses: 'Conflictos de interés e impedimentos',
  rendicion_cuentas: 'Rendición de cuentas',
  informe_gestion: 'Informes de gestión',
  asistencia: 'Asistencia a sesiones',
  hoja_vida: 'Hoja de vida',
  otro: 'Otros documentos',
}

export default function Transparencia() {
  const { tituloDe } = useSitio()
  const [items, setItems] = useState<DocumentoTransparencia[]>([])
  useEffect(() => { api.transparencia().then(setItems) }, [])

  const grupos = (Object.keys(CATEGORIAS) as DocumentoTransparencia['categoria'][])
    .filter((c) => items.some((i) => i.categoria === c))

  return (
    <Pagina titulo={tituloDe('transparencia')} bajada={porClave('transparencia')!.bajada}>
      <div className="space-y-12">
        {grupos.map((g) => (
          <section key={g}>
            <h2 className="mb-4 flex items-center gap-3 font-display text-xl text-morado">
              <span className="h-1 w-8 bg-amarillo" /> {CATEGORIAS[g]}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {items.filter((i) => i.categoria === g).map((d) => (
                <a key={d.id} href={d.archivo_url} target="_blank" rel="noreferrer" className="tarjeta tarjeta-enlace flex items-start gap-4 rounded-2xl p-5">
                  <Download size={18} className="mt-1 shrink-0 text-naranja" />
                  <div>
                    <p className="font-medium text-grafito">{d.titulo}</p>
                    <p className="mt-1 text-sm text-grafito/60">{d.descripcion}</p>
                    <p className="mt-1 text-xs text-grafito/40">Vigencia {d.vigencia} · Publicado {fechaCorta(d.fecha_publicacion)}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
        {grupos.length === 0 && <p className="text-sm text-grafito/50">Todavía no hay documentos publicados.</p>}
      </div>
    </Pagina>
  )
}
