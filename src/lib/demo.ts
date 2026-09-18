import type { Ajustes, Modulo, Publicacion, ProyectoAcuerdo, Votacion, ControlPolitico, EventoAgenda, Indicador, Multimedia, DocumentoTransparencia, PaginaLibre } from './types'

export const ajustesDemo: Ajustes = {
  id: 1,
  concejal_nombre: 'Kevin Jiménez',
  cargo: 'Concejal',
  municipio: 'La Ceja del Tambo',
  departamento: 'Antioquia',
  periodo: '2024 – 2027',
  partido: 'Movimiento cívico municipal',
  lema: 'Desde la diferencia construimos',
  bio_corta: 'Concejal de La Ceja del Tambo. Trabajo en control político al gasto público, agua y ordenamiento del suelo rural.',
  bio_larga:
    'Nací y crecí en La Ceja. Antes de llegar al concejo acompañé durante años a juntas de acción comunal urbanas y veredales, y de ahí traigo la forma de trabajar: primero se escucha en el territorio, después se redacta.\n\nMi trabajo se concentra en tres frentes: la protección de las cuencas que abastecen el acueducto, el control al gasto de contratación directa y la actualización del POT rural con participación real de las veredas.\n\nCreo que la diferencia no divide: conecta. Por eso este sitio publica el voto completo, incluso cuando es incómodo.',
  foto_url: '',
  video_hero_url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4',
  email_contacto: 'despacho@kevinjimenez.co',
  telefono: '+57 604 553 0000',
  direccion_despacho: 'Carrera 21 # 19-50, Casa de la Cultura, piso 2',
  horario_atencion: 'Lunes a jueves, 8:00 a.m. – 12:00 m.',
  redes: {
    instagram: 'https://instagram.com/kevinjimenezjm',
    facebook: 'https://facebook.com/',
    x: 'https://x.com/',
    youtube: 'https://youtube.com/',
    whatsapp: 'https://wa.me/573000000000',
  },
}

export const modulosDemo: Modulo[] = [
  { clave: 'gestion', ruta: '/', nombre: 'Gestión en cifras', descripcion: 'Bloque de contadores en la portada.', activo: true, orden: 1, en_menu: false },
  { clave: 'perfil', ruta: '/quien-soy', nombre: 'Quién soy', descripcion: 'Biografía, partido y datos del despacho.', activo: true, orden: 2, en_menu: true },
  { clave: 'proyectos', ruta: '/proyectos-de-acuerdo', nombre: 'Proyectos de acuerdo', descripcion: 'Iniciativas radicadas, ponencias y estado del trámite.', activo: true, orden: 3, en_menu: true },
  { clave: 'votaciones', ruta: '/votaciones', nombre: 'Votaciones', descripcion: 'Cómo votó cada asunto y por qué.', activo: true, orden: 4, en_menu: true },
  { clave: 'control', ruta: '/control-politico', nombre: 'Control político', descripcion: 'Debates, citaciones y proposiciones.', activo: true, orden: 5, en_menu: true },
  { clave: 'publicaciones', ruta: '/publicaciones', nombre: 'Publicaciones', descripcion: 'Noticias, columnas, comunicados e informes.', activo: true, orden: 6, en_menu: true },
  { clave: 'agenda', ruta: '/agenda', nombre: 'Agenda', descripcion: 'Sesiones, comisiones y recorridos.', activo: true, orden: 7, en_menu: true },
  { clave: 'multimedia', ruta: '/multimedia', nombre: 'Multimedia', descripcion: 'Fotos y videos de la gestión.', activo: true, orden: 8, en_menu: false },
  { clave: 'transparencia', ruta: '/transparencia', nombre: 'Transparencia', descripcion: 'Declaración de bienes, impedimentos e informes.', activo: true, orden: 9, en_menu: true },
  { clave: 'pqrs', ruta: '/escribame', nombre: 'Escríbame', descripcion: 'Formulario de peticiones ciudadanas.', activo: true, orden: 10, en_menu: true },
  { clave: 'suscripcion', ruta: '/', nombre: 'Boletín', descripcion: 'Captura de correos en el pie de página.', activo: true, orden: 11, en_menu: false },
  { clave: 'pagina_libre_1', ruta: '/pagina-1', nombre: 'Página libre 1', descripcion: 'Subpágina vacía lista para conectar contenido nuevo.', activo: false, orden: 12, en_menu: false },
  { clave: 'pagina_libre_2', ruta: '/pagina-2', nombre: 'Página libre 2', descripcion: 'Subpágina vacía lista para conectar contenido nuevo.', activo: false, orden: 13, en_menu: false },
]

export const indicadoresDemo: Indicador[] = [
  { id: '1', etiqueta: 'Asistencia a sesiones', valor: 98, sufijo: '%', detalle: '47 de 48 sesiones del periodo', orden: 1 },
  { id: '2', etiqueta: 'Proyectos de acuerdo', valor: 9, sufijo: '', detalle: '5 como autora, 4 como ponente', orden: 2 },
  { id: '3', etiqueta: 'Debates de control', valor: 12, sufijo: '', detalle: 'Agua, contratación y movilidad', orden: 3 },
  { id: '4', etiqueta: 'Recorridos veredales', valor: 34, sufijo: '', detalle: 'En las 18 veredas del municipio', orden: 4 },
]

export const proyectosDemo: ProyectoAcuerdo[] = [
  { id: '1', numero: '012 de 2025', titulo: 'Política pública de protección de nacimientos de agua', objeto: 'Crear el inventario municipal de nacimientos y destinar el 1% de los ingresos corrientes a su compra y restauración.', tema: 'Ambiente', rol: 'autor', estado: 'aprobado', fecha_radicacion: '2025-03-04', fecha_ultimo_tramite: '2025-06-18', coautores: ['Juan D. Gómez'], documento_url: '#', estado_publicacion: 'publicado' },
  { id: '2', numero: '019 de 2025', titulo: 'Presupuesto participativo veredal', objeto: 'Asignar un porcentaje del presupuesto de inversión a proyectos priorizados por las JAC en asamblea.', tema: 'Participación', rol: 'autor', estado: 'segundo_debate', fecha_radicacion: '2025-08-12', fecha_ultimo_tramite: '2025-09-02', coautores: [], documento_url: '#', estado_publicacion: 'publicado' },
  { id: '3', numero: '004 de 2026', titulo: 'Transparencia en contratación directa', objeto: 'Obligar a publicar en un tablero abierto todo contrato de mínima cuantía con su supervisor y avance.', tema: 'Anticorrupción', rol: 'ponente', estado: 'primer_debate', fecha_radicacion: '2026-02-10', fecha_ultimo_tramite: '2026-03-01', coautores: ['Bancada Cívica'], documento_url: '#', estado_publicacion: 'publicado' },
  { id: '4', numero: '027 de 2025', titulo: 'Exención predial para predios en conservación', objeto: 'Descuento del impuesto predial a predios con cobertura boscosa certificada.', tema: 'Ambiente', rol: 'coautor', estado: 'archivado', fecha_radicacion: '2025-10-01', fecha_ultimo_tramite: '2025-12-15', coautores: ['Ana M. Ruiz'], documento_url: '#', estado_publicacion: 'publicado' },
]

export const votacionesDemo: Votacion[] = [
  { id: '1', fecha: '2026-03-01', sesion: 'Sesión ordinaria 08', tipo_sesion: 'ordinaria', asunto: 'Ponencia positiva al proyecto 004 de 2026 (contratación abierta)', proyecto_numero: '004 de 2026', voto: 'si', justificacion: 'La publicación obligatoria del tablero de contratos no genera costo fiscal y cierra el principal vacío de información del municipio.', resultado: 'aprobado', acta_url: '#', estado_publicacion: 'publicado' },
  { id: '2', fecha: '2026-02-17', sesion: 'Sesión ordinaria 05', tipo_sesion: 'ordinaria', asunto: 'Autorización de vigencias futuras para el contrato de alumbrado', proyecto_numero: null, voto: 'no', justificacion: 'Comprometer ocho años de recaudo sin estudio de mercado actualizado limita a las próximas administraciones.', resultado: 'aprobado', acta_url: '#', estado_publicacion: 'publicado' },
  { id: '3', fecha: '2025-12-09', sesion: 'Sesión ordinaria 42', tipo_sesion: 'ordinaria', asunto: 'Presupuesto general de rentas y gastos 2026', proyecto_numero: '031 de 2025', voto: 'abstencion', justificacion: 'Voté en abstención porque el rubro de mantenimiento vial rural bajó 22% sin explicación técnica en la exposición de motivos.', resultado: 'aprobado', acta_url: '#', estado_publicacion: 'publicado' },
  { id: '4', fecha: '2025-11-11', sesion: 'Sesión ordinaria 36', tipo_sesion: 'ordinaria', asunto: 'Modificación del uso del suelo en el polígono La Playa', proyecto_numero: '028 de 2025', voto: 'impedido', justificacion: 'Declaré impedimento por parentesco de segundo grado con un propietario del polígono. El concejo lo aceptó.', resultado: 'aplazado', acta_url: '#', estado_publicacion: 'publicado' },
]

export const controlDemo: ControlPolitico[] = [
  { id: '1', fecha: '2026-04-22', tipo: 'debate', tema: 'Pérdidas de agua no contabilizada en el acueducto municipal', descripcion: 'Debate sobre el 38% de agua que se pierde antes de llegar al usuario y el plan de reposición de redes.', citados: ['Gerente de Servicios Públicos', 'Secretario de Planeación'], resultado: 'La administración se comprometió a entregar el plan de reposición con cronograma antes de julio.', documento_url: '#', estado_publicacion: 'publicado' },
  { id: '2', fecha: '2026-02-05', tipo: 'citacion', tema: 'Ejecución del contrato de recolección de residuos', descripcion: 'Citación al supervisor del contrato por quejas reiteradas en la zona rural alta.', citados: ['Secretario de Medio Ambiente'], resultado: 'Se ajustaron dos rutas veredales y se habilitó un punto de reporte ciudadano.', documento_url: '#', estado_publicacion: 'publicado' },
  { id: '3', fecha: '2025-09-30', tipo: 'proposicion', tema: 'Publicación mensual de la ejecución presupuestal', descripcion: 'Proposición aprobada para que la Secretaría de Hacienda publique la ejecución en datos abiertos.', citados: [], resultado: 'Aprobada por unanimidad. En cumplimiento desde noviembre de 2025.', documento_url: '#', estado_publicacion: 'publicado' },
]

export const publicacionesDemo: Publicacion[] = [
  { id: '1', tipo: 'informe', titulo: 'Informe de gestión 2025: lo que hicimos y lo que quedó pendiente', slug: 'informe-gestion-2025', resumen: 'Un balance de 48 sesiones, 9 proyectos de acuerdo y 12 debates de control político, con las metas que no alcanzamos.', contenido: 'Este informe recoge el trabajo del despacho durante 2025.\n\nAvanzamos en la política de protección de nacimientos y en la publicación mensual de la ejecución presupuestal. Quedó pendiente la actualización del POT rural, que seguirá siendo la prioridad de 2026.', portada_url: '', autor: 'Equipo de comunicaciones', etiquetas: ['rendición de cuentas', 'informe'], destacado: true, estado: 'publicado', publicado_at: '2026-01-28' },
  { id: '2', tipo: 'columna', titulo: 'El agua no se defiende con discursos, se defiende con predios', slug: 'el-agua-no-se-defiende-con-discursos', resumen: 'Por qué comprar tierra en la parte alta de la cuenca es más barato que potabilizar agua turbia diez años después.', contenido: 'Cada vez que hay un aguacero fuerte, el acueducto suspende el servicio por turbiedad. No es mala suerte: es el resultado de treinta años de potreros en la parte alta.', portada_url: '', autor: 'Mariana Restrepo Álvarez', etiquetas: ['agua', 'ambiente'], destacado: true, estado: 'publicado', publicado_at: '2026-03-12' },
  { id: '3', tipo: 'noticia', titulo: 'Aprobado en segundo debate el presupuesto participativo veredal', slug: 'aprobado-presupuesto-participativo', resumen: 'Las 18 veredas podrán priorizar en asamblea una parte del presupuesto de inversión a partir de 2027.', contenido: 'El proyecto fue aprobado con 11 votos a favor y 2 en contra.', portada_url: '', autor: 'Equipo de comunicaciones', etiquetas: ['participación', 'veredas'], destacado: false, estado: 'publicado', publicado_at: '2026-09-02' },
  { id: '4', tipo: 'comunicado', titulo: 'Declaración de impedimento en el polígono La Playa', slug: 'declaracion-impedimento-la-playa', resumen: 'Explicación pública del impedimento declarado y aceptado por la plenaria.', contenido: 'Por transparencia publico el texto completo del impedimento radicado ante la mesa directiva.', portada_url: '', autor: 'Despacho', etiquetas: ['transparencia'], destacado: false, estado: 'publicado', publicado_at: '2025-11-12' },
]

export const agendaDemo: EventoAgenda[] = [
  { id: '1', titulo: 'Sesión ordinaria — segundo debate proyecto 019', descripcion: 'Discusión del presupuesto participativo veredal.', fecha_inicio: '2026-09-24', hora: '08:00', lugar: 'Recinto del Concejo', tipo: 'sesion_plenaria', publico: true, estado_publicacion: 'publicado' },
  { id: '2', titulo: 'Asamblea con JAC de la vereda San Nicolás', descripcion: 'Socialización del plan de reposición de redes de acueducto.', fecha_inicio: '2026-09-27', hora: '15:00', lugar: 'Caseta comunal San Nicolás', tipo: 'comunidad', publico: true, estado_publicacion: 'publicado' },
  { id: '3', titulo: 'Rendición de cuentas semestral', descripcion: 'Presentación abierta del balance de gestión.', fecha_inicio: '2026-10-15', hora: '18:00', lugar: 'Casa de la Cultura', tipo: 'rendicion_cuentas', publico: true, estado_publicacion: 'publicado' },
]

export const multimediaDemo: Multimedia[] = [
  { id: '1', tipo: 'foto', titulo: 'Recorrido por la bocatoma del acueducto', url: '', miniatura_url: '', fecha: '2026-04-20', estado_publicacion: 'publicado' },
  { id: '2', tipo: 'video', titulo: 'Debate de control político: agua no contabilizada', url: '', miniatura_url: '', fecha: '2026-04-22', estado_publicacion: 'publicado' },
  { id: '3', tipo: 'foto', titulo: 'Asamblea veredal en El Tambo', url: '', miniatura_url: '', fecha: '2026-05-11', estado_publicacion: 'publicado' },
]

export const transparenciaDemo: DocumentoTransparencia[] = [
  { id: '1', categoria: 'declaracion_bienes', titulo: 'Declaración de bienes y rentas 2026', descripcion: 'Formato SIGEP diligenciado y radicado.', archivo_url: '#', vigencia: '2026', fecha_publicacion: '2026-03-30', estado_publicacion: 'publicado' },
  { id: '2', categoria: 'conflicto_intereses', titulo: 'Registro de conflictos de interés', descripcion: 'Declaraciones de impedimento presentadas ante la mesa directiva.', archivo_url: '#', vigencia: '2024-2027', fecha_publicacion: '2026-01-15', estado_publicacion: 'publicado' },
  { id: '3', categoria: 'asistencia', titulo: 'Registro de asistencia a sesiones', descripcion: 'Consolidado por sesión, con soportes de las ausencias justificadas.', archivo_url: '#', vigencia: '2025', fecha_publicacion: '2026-01-20', estado_publicacion: 'publicado' },
  { id: '4', categoria: 'informe_gestion', titulo: 'Informe de gestión 2025', descripcion: 'Documento completo en PDF.', archivo_url: '#', vigencia: '2025', fecha_publicacion: '2026-01-28', estado_publicacion: 'publicado' },
  { id: '5', categoria: 'hoja_vida', titulo: 'Hoja de vida y declaración de cumplimiento', descripcion: 'Formato de la Función Pública.', archivo_url: '#', vigencia: '2024-2027', fecha_publicacion: '2024-01-10', estado_publicacion: 'publicado' },
]

export const modulosDemoMap = () => Object.fromEntries(modulosDemo.map((m) => [m.clave, m]))

export const paginasLibresDemo: PaginaLibre[] = [
  {
    clave: 'pagina_libre_1', titulo: 'Página libre 1',
    bajada: 'Enciéndela en el panel, cámbiale el nombre y escribe lo que necesites.',
    contenido: 'Esta subpágina está lista para conectarse. Sirve, por ejemplo, para una campaña puntual, un programa de gobierno, un equipo de trabajo o un micrositio de rendición de cuentas.\n\nSepara los párrafos con una línea en blanco. El título que escribas aquí es el que aparece en el menú.',
    imagen_url: '', estado_publicacion: 'borrador',
  },
  {
    clave: 'pagina_libre_2', titulo: 'Página libre 2',
    bajada: 'Segundo espacio disponible, con el mismo funcionamiento.',
    contenido: 'Misma lógica que la página libre 1: enciéndela desde Configuración del sitio y edita su contenido desde Páginas libres.',
    imagen_url: '', estado_publicacion: 'borrador',
  },
]
