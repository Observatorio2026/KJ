/** Mapa unico de secciones: cada una es una subpagina con su propia ruta. */
export interface Entrada { clave: string; ruta: string; titulo: string; bajada: string }

export const SECCIONES: Entrada[] = [
  { clave: 'perfil', ruta: '/quien-soy', titulo: 'Quién soy',
    bajada: 'De dónde vengo, con quién trabajo y qué defiendo en el recinto.' },
  { clave: 'proyectos', ruta: '/proyectos-de-acuerdo', titulo: 'Proyectos de acuerdo',
    bajada: 'Cada iniciativa presentada o ponenciada, con su objeto, su estado de trámite y el texto radicado.' },
  { clave: 'votaciones', ruta: '/votaciones', titulo: 'Récord de votación',
    bajada: 'El sentido de cada voto y la razón detrás. Las abstenciones, ausencias e impedimentos también se explican.' },
  { clave: 'control', ruta: '/control-politico', titulo: 'Control político',
    bajada: 'Debates, citaciones y proposiciones, con los funcionarios citados y el compromiso al que se llegó.' },
  { clave: 'publicaciones', ruta: '/publicaciones', titulo: 'Publicaciones',
    bajada: 'Noticias, columnas, comunicados e informes del despacho.' },
  { clave: 'agenda', ruta: '/agenda', titulo: 'Agenda pública',
    bajada: 'Dónde va a estar el despacho. Las sesiones y las asambleas comunales son abiertas.' },
  { clave: 'multimedia', ruta: '/multimedia', titulo: 'Archivo multimedia',
    bajada: 'Fotos, videos y audios de la gestión en el territorio.' },
  { clave: 'transparencia', ruta: '/transparencia', titulo: 'Transparencia',
    bajada: 'Declaración de bienes, conflictos de interés, asistencia e informes de gestión.' },
  { clave: 'pqrs', ruta: '/escribame', titulo: 'Escríbame',
    bajada: 'Peticiones, quejas, reclamos y denuncias. Todo queda radicado con fecha.' },
  { clave: 'pagina_libre_1', ruta: '/pagina-1', titulo: 'Página libre 1',
    bajada: 'Espacio disponible para el contenido que necesites agregar.' },
  { clave: 'pagina_libre_2', ruta: '/pagina-2', titulo: 'Página libre 2',
    bajada: 'Espacio disponible para el contenido que necesites agregar.' },
]

export const porClave = (c: string) => SECCIONES.find((s) => s.clave === c)
