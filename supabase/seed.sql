-- Datos iniciales. Ejecutar despues de schema.sql.
-- Ajusta los valores a tu municipio antes de correrlo.

insert into ajustes (id, concejal_nombre, cargo, municipio, departamento, periodo, partido, lema,
  bio_corta, bio_larga, email_contacto, telefono, direccion_despacho, horario_atencion, video_hero_url, redes)
values (1,
  'Kevin Jimenez', 'Concejal', 'La Ceja del Tambo', 'Antioquia', '2024 – 2027',
  'Movimiento o partido', 'Desde la diferencia construimos',
  'Breve descripcion de la gestion, en una o dos frases.',
  E'Primer parrafo de la biografia.\n\nSegundo parrafo de la biografia.',
  'despacho@correo.gov.co', '+57 604 000 0000',
  'Direccion del despacho', 'Lunes a jueves, 8:00 a.m. - 12:00 m.',
  '', '{"instagram":"","facebook":"","x":"","youtube":"","whatsapp":""}'::jsonb)
on conflict (id) do nothing;

insert into modulos (clave, ruta, nombre, descripcion, activo, en_menu, orden) values
  ('gestion','/','Gestion en cifras','Bloque de contadores en la portada.',true,false,1),
  ('perfil','/quien-soy','Quien soy','Biografia, partido y datos del despacho.',true,true,2),
  ('proyectos','/proyectos-de-acuerdo','Proyectos de acuerdo','Iniciativas radicadas y ponencias.',true,true,3),
  ('votaciones','/votaciones','Votaciones','Como voto cada asunto y por que.',true,true,4),
  ('control','/control-politico','Control politico','Debates, citaciones y proposiciones.',true,true,5),
  ('publicaciones','/publicaciones','Publicaciones','Noticias, columnas, comunicados e informes.',true,true,6),
  ('agenda','/agenda','Agenda','Sesiones, comisiones y recorridos.',true,true,7),
  ('multimedia','/multimedia','Multimedia','Fotos y videos de la gestion.',true,false,8),
  ('transparencia','/transparencia','Transparencia','Declaracion de bienes, impedimentos e informes.',true,true,9),
  ('pqrs','/escribame','Escribame','Formulario de peticiones ciudadanas.',true,true,10),
  ('suscripcion','/','Boletin','Captura de correos en el pie de pagina.',true,false,11),
  ('pagina_libre_1','/pagina-1','Pagina libre 1','Subpagina vacia lista para conectar.',false,false,12),
  ('pagina_libre_2','/pagina-2','Pagina libre 2','Subpagina vacia lista para conectar.',false,false,13)
on conflict (clave) do nothing;

insert into paginas_libres (clave, titulo, bajada, contenido, estado_publicacion) values
  ('pagina_libre_1','Pagina libre 1','Espacio disponible para contenido nuevo.','Edita esta pagina desde el panel interno, en Paginas libres.','borrador'),
  ('pagina_libre_2','Pagina libre 2','Espacio disponible para contenido nuevo.','Edita esta pagina desde el panel interno, en Paginas libres.','borrador')
on conflict (clave) do nothing;

insert into indicadores (etiqueta, valor, sufijo, detalle, orden) values
  ('Asistencia a sesiones', 0, '%', 'Actualizar cada periodo de sesiones', 1),
  ('Proyectos de acuerdo', 0, '', 'Como autor y como ponente', 2),
  ('Debates de control', 0, '', 'Temas priorizados', 3),
  ('Recorridos veredales', 0, '', 'Presencia en el territorio', 4)
on conflict do nothing;

-- Convertir a administrador al usuario que ya creaste en Authentication:
-- update perfiles set rol = 'admin' where id = (select id from auth.users where email = 'tucorreo@dominio.com');
