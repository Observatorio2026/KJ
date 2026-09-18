import Coleccion, { Campo } from './Coleccion'
import { api, fechaCorta } from '../lib/api'

const est = (l: string[]) => l.map((v) => ({ v, t: v.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase()) }))

export function AdminPublicaciones() {
  const campos: Campo[] = [
    { k: 'titulo', t: 'Título' },
    { k: 'slug', t: 'URL amigable', ancho: 'medio', ayuda: 'Ej: informe-gestion-2026' },
    { k: 'tipo', t: 'Tipo', tipo: 'select', ancho: 'medio', opciones: est(['noticia', 'articulo', 'columna', 'comunicado', 'informe']) },
    { k: 'resumen', t: 'Resumen', tipo: 'area' },
    { k: 'contenido', t: 'Contenido', tipo: 'area', ayuda: 'Separa los párrafos con una línea en blanco.' },
    { k: 'portada_url', t: 'Imagen de portada', tipo: 'archivo' },
    { k: 'autor', t: 'Autor', ancho: 'medio' },
    { k: 'publicado_at', t: 'Fecha de publicación', tipo: 'fecha', ancho: 'medio' },
    { k: 'etiquetas', t: 'Etiquetas', tipo: 'lista', ayuda: 'Separadas por comas.' },
    { k: 'destacado', t: 'Destacar en portada', tipo: 'check' },
  ]
  return (
    <Coleccion
      titulo="Publicaciones" tabla="publicaciones" conEstado="estado"
      descripcion="Noticias, columnas, comunicados e informes. Lo que esté en borrador no se ve en el sitio."
      campos={campos} cargar={() => api.publicaciones(true)}
      fila={(r) => ({ principal: r.titulo, secundario: `${r.tipo} · ${fechaCorta(r.publicado_at)} · ${r.autor}` })}
      nuevoPorDefecto={{ tipo: 'noticia', destacado: false, etiquetas: [] }}
    />
  )
}

export function AdminProyectos() {
  const campos: Campo[] = [
    { k: 'numero', t: 'Número del proyecto', ancho: 'medio', ayuda: 'Ej: 012 de 2026' },
    { k: 'tema', t: 'Tema', ancho: 'medio' },
    { k: 'titulo', t: 'Título' },
    { k: 'objeto', t: 'Objeto del acuerdo', tipo: 'area' },
    { k: 'rol', t: 'Rol en el proyecto', tipo: 'select', ancho: 'medio', opciones: est(['autor', 'coautor', 'ponente']) },
    { k: 'estado', t: 'Estado del trámite', tipo: 'select', ancho: 'medio', opciones: est(['radicado', 'primer_debate', 'segundo_debate', 'aprobado', 'sancionado', 'objetado', 'archivado']) },
    { k: 'fecha_radicacion', t: 'Fecha de radicación', tipo: 'fecha', ancho: 'medio' },
    { k: 'fecha_ultimo_tramite', t: 'Último trámite', tipo: 'fecha', ancho: 'medio' },
    { k: 'coautores', t: 'Coautores', tipo: 'lista' },
    { k: 'documento_url', t: 'Texto radicado (PDF)', tipo: 'archivo' },
  ]
  return (
    <Coleccion
      titulo="Proyectos de acuerdo" tabla="proyectos_acuerdo"
      descripcion="Iniciativas presentadas o ponenciadas, con su trámite actualizado."
      campos={campos} cargar={() => api.proyectos(true)}
      fila={(r) => ({ principal: `${r.numero} — ${r.titulo}`, secundario: `${r.estado.replace(/_/g, ' ')} · ${r.tema}` })}
      nuevoPorDefecto={{ rol: 'autor', estado: 'radicado', coautores: [] }}
    />
  )
}

export function AdminVotaciones() {
  const campos: Campo[] = [
    { k: 'fecha', t: 'Fecha', tipo: 'fecha', ancho: 'medio' },
    { k: 'sesion', t: 'Sesión', ancho: 'medio', ayuda: 'Ej: Sesión ordinaria 08' },
    { k: 'tipo_sesion', t: 'Tipo de sesión', tipo: 'select', ancho: 'medio', opciones: est(['ordinaria', 'extraordinaria']) },
    { k: 'proyecto_numero', t: 'Proyecto relacionado', ancho: 'medio' },
    { k: 'asunto', t: 'Asunto votado' },
    { k: 'voto', t: 'Sentido del voto', tipo: 'select', ancho: 'medio', opciones: est(['si', 'no', 'abstencion', 'ausente', 'impedido']) },
    { k: 'resultado', t: 'Resultado', tipo: 'select', ancho: 'medio', opciones: est(['aprobado', 'negado', 'aplazado']) },
    { k: 'justificacion', t: 'Justificación del voto', tipo: 'area', ayuda: 'Explíquelo en lenguaje claro: es lo que más lee la ciudadanía.' },
    { k: 'acta_url', t: 'Acta de la sesión', tipo: 'archivo' },
  ]
  return (
    <Coleccion
      titulo="Récord de votación" tabla="votaciones"
      descripcion="Cada voto con su razón. Las ausencias e impedimentos también se registran."
      campos={campos} cargar={() => api.votaciones(true)}
      fila={(r) => ({ principal: r.asunto, secundario: `${fechaCorta(r.fecha)} · voto: ${r.voto} · ${r.sesion}` })}
      nuevoPorDefecto={{ voto: 'si', resultado: 'aprobado', tipo_sesion: 'ordinaria' }}
    />
  )
}

export function AdminControl() {
  const campos: Campo[] = [
    { k: 'fecha', t: 'Fecha', tipo: 'fecha', ancho: 'medio' },
    { k: 'tipo', t: 'Tipo', tipo: 'select', ancho: 'medio', opciones: est(['debate', 'citacion', 'proposicion', 'derecho_peticion', 'invitacion']) },
    { k: 'tema', t: 'Tema' },
    { k: 'descripcion', t: 'Descripción', tipo: 'area' },
    { k: 'citados', t: 'Funcionarios citados', tipo: 'lista' },
    { k: 'resultado', t: 'Resultado o compromiso', tipo: 'area' },
    { k: 'documento_url', t: 'Documento soporte', tipo: 'archivo' },
  ]
  return (
    <Coleccion
      titulo="Control político" tabla="control_politico"
      descripcion="Debates, citaciones y proposiciones, con el compromiso al que llegó la administración."
      campos={campos} cargar={() => api.controlPolitico(true)}
      fila={(r) => ({ principal: r.tema, secundario: `${r.tipo} · ${fechaCorta(r.fecha)}` })}
      nuevoPorDefecto={{ tipo: 'debate', citados: [] }}
    />
  )
}

export function AdminAgenda() {
  const campos: Campo[] = [
    { k: 'titulo', t: 'Actividad' },
    { k: 'descripcion', t: 'Descripción', tipo: 'area' },
    { k: 'fecha_inicio', t: 'Fecha', tipo: 'fecha', ancho: 'medio' },
    { k: 'hora', t: 'Hora', ancho: 'medio', ayuda: 'Ej: 08:00' },
    { k: 'lugar', t: 'Lugar', ancho: 'medio' },
    { k: 'tipo', t: 'Tipo', tipo: 'select', ancho: 'medio', opciones: est(['sesion_plenaria', 'comision', 'comunidad', 'visita_territorio', 'rendicion_cuentas']) },
    { k: 'publico', t: 'Abierta al público', tipo: 'check' },
  ]
  return (
    <Coleccion
      titulo="Agenda pública" tabla="agenda"
      descripcion="Sesiones, comisiones y recorridos. La agenda abierta es una de las mejores señales de transparencia."
      campos={campos} cargar={() => api.agenda(true)}
      fila={(r) => ({ principal: r.titulo, secundario: `${fechaCorta(r.fecha_inicio)} · ${r.hora} · ${r.lugar}` })}
      nuevoPorDefecto={{ tipo: 'sesion_plenaria', publico: true }}
    />
  )
}

export function AdminMultimedia() {
  const campos: Campo[] = [
    { k: 'titulo', t: 'Título' },
    { k: 'tipo', t: 'Tipo', tipo: 'select', ancho: 'medio', opciones: est(['foto', 'video', 'audio']) },
    { k: 'fecha', t: 'Fecha', tipo: 'fecha', ancho: 'medio' },
    { k: 'url', t: 'Archivo o enlace', tipo: 'archivo' },
    { k: 'miniatura_url', t: 'Miniatura', tipo: 'archivo' },
  ]
  return (
    <Coleccion
      titulo="Archivo multimedia" tabla="multimedia"
      descripcion="Fotos, videos y audios de la gestión para reutilizar en redes y en el sitio."
      campos={campos} cargar={() => api.multimedia(true)}
      fila={(r) => ({ principal: r.titulo, secundario: `${r.tipo} · ${fechaCorta(r.fecha)}` })}
      nuevoPorDefecto={{ tipo: 'foto' }}
    />
  )
}

export function AdminTransparencia() {
  const campos: Campo[] = [
    { k: 'titulo', t: 'Título del documento' },
    { k: 'categoria', t: 'Categoría', tipo: 'select', ancho: 'medio', opciones: est(['declaracion_bienes', 'conflicto_intereses', 'rendicion_cuentas', 'informe_gestion', 'asistencia', 'hoja_vida', 'otro']) },
    { k: 'vigencia', t: 'Vigencia', ancho: 'medio', ayuda: 'Ej: 2026 o 2024-2027' },
    { k: 'descripcion', t: 'Descripción', tipo: 'area' },
    { k: 'archivo_url', t: 'Archivo', tipo: 'archivo' },
    { k: 'fecha_publicacion', t: 'Fecha de publicación', tipo: 'fecha', ancho: 'medio' },
  ]
  return (
    <Coleccion
      titulo="Transparencia" tabla="transparencia"
      descripcion="Declaración de bienes, conflictos de interés, asistencia e informes de gestión."
      campos={campos} cargar={() => api.transparencia(true)}
      fila={(r) => ({ principal: r.titulo, secundario: `${r.categoria.replace(/_/g, ' ')} · vigencia ${r.vigencia}` })}
      nuevoPorDefecto={{ categoria: 'informe_gestion' }}
    />
  )
}
