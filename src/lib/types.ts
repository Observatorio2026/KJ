export type Rol = 'admin' | 'comunicador'
export type EstadoPublicacion = 'borrador' | 'revision' | 'publicado'

export interface Perfil {
  id: string
  nombre: string
  rol: Rol
  activo: boolean
  email?: string
}

export interface Ajustes {
  id: number
  concejal_nombre: string
  cargo: string
  municipio: string
  departamento: string
  periodo: string
  partido: string
  lema: string
  bio_corta: string
  bio_larga: string
  foto_url: string
  video_hero_url: string
  email_contacto: string
  telefono: string
  direccion_despacho: string
  horario_atencion: string
  redes: { instagram?: string; facebook?: string; x?: string; youtube?: string; tiktok?: string; whatsapp?: string }
}

/** Interruptores que solo el administrador puede mover. */
export interface Modulo {
  clave: string
  /** Ruta de la subpagina que representa este modulo. */
  ruta?: string
  nombre: string
  descripcion: string
  activo: boolean
  orden: number
  en_menu: boolean
}

export interface Publicacion {
  id: string
  tipo: 'noticia' | 'articulo' | 'columna' | 'comunicado' | 'informe'
  titulo: string
  slug: string
  resumen: string
  contenido: string
  portada_url: string
  autor: string
  etiquetas: string[]
  destacado: boolean
  estado: EstadoPublicacion
  publicado_at: string
}

export interface ProyectoAcuerdo {
  id: string
  numero: string
  titulo: string
  objeto: string
  tema: string
  rol: 'autor' | 'coautor' | 'ponente'
  estado: 'radicado' | 'primer_debate' | 'segundo_debate' | 'aprobado' | 'archivado' | 'objetado' | 'sancionado'
  fecha_radicacion: string
  fecha_ultimo_tramite: string
  coautores: string[]
  documento_url: string
  estado_publicacion: EstadoPublicacion
}

export interface Votacion {
  id: string
  fecha: string
  sesion: string
  tipo_sesion: 'ordinaria' | 'extraordinaria'
  asunto: string
  proyecto_numero: string | null
  voto: 'si' | 'no' | 'abstencion' | 'ausente' | 'impedido'
  justificacion: string
  resultado: 'aprobado' | 'negado' | 'aplazado'
  acta_url: string
  estado_publicacion: EstadoPublicacion
}

export interface ControlPolitico {
  id: string
  fecha: string
  tipo: 'debate' | 'citacion' | 'proposicion' | 'derecho_peticion' | 'invitacion'
  tema: string
  descripcion: string
  citados: string[]
  resultado: string
  documento_url: string
  estado_publicacion: EstadoPublicacion
}

export interface EventoAgenda {
  id: string
  titulo: string
  descripcion: string
  fecha_inicio: string
  hora: string
  lugar: string
  tipo: 'sesion_plenaria' | 'comision' | 'comunidad' | 'visita_territorio' | 'rendicion_cuentas'
  publico: boolean
  estado_publicacion: EstadoPublicacion
}

export interface Indicador {
  id: string
  etiqueta: string
  valor: number
  sufijo: string
  detalle: string
  orden: number
}

export interface Multimedia {
  id: string
  tipo: 'foto' | 'video' | 'audio'
  titulo: string
  url: string
  miniatura_url: string
  fecha: string
  estado_publicacion: EstadoPublicacion
}

export interface DocumentoTransparencia {
  id: string
  categoria: 'declaracion_bienes' | 'conflicto_intereses' | 'rendicion_cuentas' | 'informe_gestion' | 'asistencia' | 'hoja_vida' | 'otro'
  titulo: string
  descripcion: string
  archivo_url: string
  vigencia: string
  fecha_publicacion: string
  estado_publicacion: EstadoPublicacion
}

export interface Pqrs {
  id: string
  nombre: string
  email: string
  telefono: string
  barrio_vereda: string
  tipo: 'peticion' | 'queja' | 'reclamo' | 'sugerencia' | 'denuncia' | 'felicitacion'
  mensaje: string
  estado: 'nuevo' | 'en_tramite' | 'cerrado'
  created_at: string
}

/** Subpaginas libres que el equipo puede llenar sin tocar el codigo. */
export interface PaginaLibre {
  clave: 'pagina_libre_1' | 'pagina_libre_2'
  titulo: string
  bajada: string
  contenido: string
  imagen_url: string
  estado_publicacion: EstadoPublicacion
}
