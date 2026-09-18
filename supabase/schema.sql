-- ============================================================
-- CONCEJO DIGITAL — esquema completo para Supabase
-- Ejecutar en: Supabase > SQL Editor > New query > Run
-- ============================================================

create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- 1. PERFILES Y ROLES
-- ------------------------------------------------------------
create table if not exists perfiles (
  id uuid primary key references auth.users on delete cascade,
  nombre text not null default 'Sin nombre',
  rol text not null default 'comunicador' check (rol in ('admin','comunicador')),
  activo boolean not null default true,
  creado_at timestamptz default now()
);

-- Cada usuario nuevo de Authentication obtiene perfil automaticamente.
create or replace function crear_perfil()
returns trigger language plpgsql security definer as $$
begin
  insert into perfiles (id, nombre, rol)
  values (new.id, coalesce(new.raw_user_meta_data->>'nombre', split_part(new.email,'@',1)), 'comunicador')
  on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists al_crear_usuario on auth.users;
create trigger al_crear_usuario after insert on auth.users
  for each row execute function crear_perfil();

-- Helpers de rol (security definer evita recursion en las policies)
create or replace function es_admin() returns boolean
language sql security definer stable as $$
  select exists (select 1 from perfiles where id = auth.uid() and rol = 'admin' and activo);
$$;

create or replace function es_equipo() returns boolean
language sql security definer stable as $$
  select exists (select 1 from perfiles where id = auth.uid() and activo);
$$;

-- ------------------------------------------------------------
-- 2. CONFIGURACION DEL SITIO
-- ------------------------------------------------------------
create table if not exists ajustes (
  id int primary key default 1,
  concejal_nombre text, cargo text default 'Concejal', municipio text, departamento text,
  periodo text, partido text, lema text, bio_corta text, bio_larga text,
  foto_url text, video_hero_url text, email_contacto text, telefono text,
  direccion_despacho text, horario_atencion text,
  redes jsonb default '{}'::jsonb,
  actualizado_at timestamptz default now(),
  constraint una_sola_fila check (id = 1)
);

create table if not exists modulos (
  clave text primary key,
  nombre text not null,
  ruta text,
  descripcion text,
  activo boolean not null default true,
  en_menu boolean not null default true,
  orden int not null default 0
);

-- ------------------------------------------------------------
-- 3. CONTENIDO
-- ------------------------------------------------------------
create table if not exists paginas_libres (
  clave text primary key check (clave in ('pagina_libre_1','pagina_libre_2')),
  titulo text not null default 'Página libre',
  bajada text, contenido text, imagen_url text,
  estado_publicacion text default 'borrador' check (estado_publicacion in ('borrador','revision','publicado'))
);

create table if not exists indicadores (
  id uuid primary key default gen_random_uuid(),
  etiqueta text not null, valor numeric not null default 0, sufijo text default '',
  detalle text, orden int default 0
);

create table if not exists publicaciones (
  id uuid primary key default gen_random_uuid(),
  tipo text default 'noticia' check (tipo in ('noticia','articulo','columna','comunicado','informe')),
  titulo text not null, slug text unique not null, resumen text, contenido text,
  portada_url text, autor text, etiquetas text[] default '{}', destacado boolean default false,
  estado text default 'borrador' check (estado in ('borrador','revision','publicado')),
  publicado_at date default current_date,
  creado_por uuid references perfiles(id), creado_at timestamptz default now()
);

create table if not exists proyectos_acuerdo (
  id uuid primary key default gen_random_uuid(),
  numero text not null, titulo text not null, objeto text, tema text,
  rol text default 'autor' check (rol in ('autor','coautor','ponente')),
  estado text default 'radicado' check (estado in ('radicado','primer_debate','segundo_debate','aprobado','sancionado','objetado','archivado')),
  fecha_radicacion date, fecha_ultimo_tramite date,
  coautores text[] default '{}', documento_url text,
  estado_publicacion text default 'borrador' check (estado_publicacion in ('borrador','revision','publicado'))
);

create table if not exists votaciones (
  id uuid primary key default gen_random_uuid(),
  fecha date not null, sesion text, tipo_sesion text default 'ordinaria' check (tipo_sesion in ('ordinaria','extraordinaria')),
  asunto text not null, proyecto_numero text,
  voto text not null check (voto in ('si','no','abstencion','ausente','impedido')),
  justificacion text,
  resultado text default 'aprobado' check (resultado in ('aprobado','negado','aplazado')),
  acta_url text,
  estado_publicacion text default 'borrador' check (estado_publicacion in ('borrador','revision','publicado'))
);

create table if not exists control_politico (
  id uuid primary key default gen_random_uuid(),
  fecha date not null,
  tipo text default 'debate' check (tipo in ('debate','citacion','proposicion','derecho_peticion','invitacion')),
  tema text not null, descripcion text, citados text[] default '{}', resultado text, documento_url text,
  estado_publicacion text default 'borrador' check (estado_publicacion in ('borrador','revision','publicado'))
);

create table if not exists agenda (
  id uuid primary key default gen_random_uuid(),
  titulo text not null, descripcion text, fecha_inicio date not null, hora text, lugar text,
  tipo text default 'sesion_plenaria' check (tipo in ('sesion_plenaria','comision','comunidad','visita_territorio','rendicion_cuentas')),
  publico boolean default true,
  estado_publicacion text default 'borrador' check (estado_publicacion in ('borrador','revision','publicado'))
);

create table if not exists multimedia (
  id uuid primary key default gen_random_uuid(),
  tipo text default 'foto' check (tipo in ('foto','video','audio')),
  titulo text, url text, miniatura_url text, fecha date default current_date,
  estado_publicacion text default 'borrador' check (estado_publicacion in ('borrador','revision','publicado'))
);

create table if not exists transparencia (
  id uuid primary key default gen_random_uuid(),
  categoria text default 'otro' check (categoria in ('declaracion_bienes','conflicto_intereses','rendicion_cuentas','informe_gestion','asistencia','hoja_vida','otro')),
  titulo text not null, descripcion text, archivo_url text, vigencia text,
  fecha_publicacion date default current_date,
  estado_publicacion text default 'borrador' check (estado_publicacion in ('borrador','revision','publicado'))
);

create table if not exists pqrs (
  id uuid primary key default gen_random_uuid(),
  nombre text not null, email text not null, telefono text, barrio_vereda text,
  tipo text default 'peticion' check (tipo in ('peticion','queja','reclamo','sugerencia','denuncia','felicitacion')),
  mensaje text not null,
  estado text default 'nuevo' check (estado in ('nuevo','en_tramite','cerrado')),
  created_at timestamptz default now()
);

create table if not exists suscriptores (
  id uuid primary key default gen_random_uuid(),
  email text unique not null, acepta_datos boolean default true, created_at timestamptz default now()
);

-- ------------------------------------------------------------
-- 4. SEGURIDAD POR FILAS (RLS)
-- ------------------------------------------------------------
alter table perfiles enable row level security;
alter table ajustes enable row level security;
alter table modulos enable row level security;
alter table indicadores enable row level security;
alter table paginas_libres enable row level security;
alter table publicaciones enable row level security;
alter table proyectos_acuerdo enable row level security;
alter table votaciones enable row level security;
alter table control_politico enable row level security;
alter table agenda enable row level security;
alter table multimedia enable row level security;
alter table transparencia enable row level security;
alter table pqrs enable row level security;
alter table suscriptores enable row level security;

-- Perfiles: cada quien ve el suyo; el admin ve y edita todos.
drop policy if exists perfil_propio on perfiles;
create policy perfil_propio on perfiles for select using (id = auth.uid() or es_admin());
drop policy if exists perfil_admin on perfiles;
create policy perfil_admin on perfiles for all using (es_admin()) with check (es_admin());

-- Ajustes y modulos: lectura publica, escritura solo del administrador.
drop policy if exists ajustes_lectura on ajustes;
create policy ajustes_lectura on ajustes for select using (true);
drop policy if exists ajustes_admin on ajustes;
create policy ajustes_admin on ajustes for all using (es_admin()) with check (es_admin());

drop policy if exists modulos_lectura on modulos;
create policy modulos_lectura on modulos for select using (true);
drop policy if exists modulos_admin on modulos;
create policy modulos_admin on modulos for all using (es_admin()) with check (es_admin());

drop policy if exists indicadores_lectura on indicadores;
create policy indicadores_lectura on indicadores for select using (true);
drop policy if exists indicadores_equipo on indicadores;
create policy indicadores_equipo on indicadores for all using (es_equipo()) with check (es_equipo());

-- Contenido: el publico solo ve lo publicado; el equipo ve y edita todo.
do $$
declare t text;
begin
  foreach t in array array['proyectos_acuerdo','votaciones','control_politico','agenda','multimedia','transparencia']
  loop
    execute format('drop policy if exists %I_publico on %I', t, t);
    execute format('create policy %I_publico on %I for select using (estado_publicacion = ''publicado'' or es_equipo())', t, t);
    execute format('drop policy if exists %I_equipo on %I', t, t);
    execute format('create policy %I_equipo on %I for all using (es_equipo()) with check (es_equipo())', t, t);
  end loop;
end $$;

drop policy if exists publicaciones_publico on publicaciones;
create policy publicaciones_publico on publicaciones for select using (estado = 'publicado' or es_equipo());
drop policy if exists publicaciones_equipo on publicaciones;
create policy publicaciones_equipo on publicaciones for all using (es_equipo()) with check (es_equipo());

-- PQRS: cualquiera radica, solo el equipo lee y actualiza.
drop policy if exists pqrs_insertar on pqrs;
create policy pqrs_insertar on pqrs for insert with check (true);
drop policy if exists pqrs_equipo on pqrs;
create policy pqrs_equipo on pqrs for select using (es_equipo());
drop policy if exists pqrs_actualizar on pqrs;
create policy pqrs_actualizar on pqrs for update using (es_equipo()) with check (es_equipo());

drop policy if exists suscriptores_insertar on suscriptores;
create policy suscriptores_insertar on suscriptores for insert with check (true);
drop policy if exists suscriptores_equipo on suscriptores;
create policy suscriptores_equipo on suscriptores for select using (es_equipo());

-- Borrado de contenido reservado al administrador.
do $$
declare t text;
begin
  foreach t in array array['publicaciones','proyectos_acuerdo','votaciones','control_politico','agenda','multimedia','transparencia','indicadores']
  loop
    execute format('drop policy if exists %I_borrar on %I', t, t);
    execute format('create policy %I_borrar on %I for delete using (es_admin())', t, t);
  end loop;
end $$;

drop policy if exists paginas_publico on paginas_libres;
create policy paginas_publico on paginas_libres for select using (estado_publicacion = 'publicado' or es_equipo());
drop policy if exists paginas_equipo on paginas_libres;
create policy paginas_equipo on paginas_libres for all using (es_equipo()) with check (es_equipo());

-- ------------------------------------------------------------
-- 5. ALMACENAMIENTO DE ARCHIVOS
-- ------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('medios', 'medios', true) on conflict (id) do nothing;

drop policy if exists medios_lectura on storage.objects;
create policy medios_lectura on storage.objects for select using (bucket_id = 'medios');
drop policy if exists medios_subida on storage.objects;
create policy medios_subida on storage.objects for insert to authenticated with check (bucket_id = 'medios' and es_equipo());
drop policy if exists medios_borrado on storage.objects;
create policy medios_borrado on storage.objects for delete to authenticated using (bucket_id = 'medios' and es_admin());
