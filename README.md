# Kevin Jiménez | Desde la diferencia construimos

Sitio público de rendición de cuentas para un concejal municipal en Colombia, construido sobre el
manual de marca de Kevin Jiménez, con panel interno de dos roles y base de datos en Supabase.

**Cada apartado es una subpágina con ruta propia** (`/votaciones`, `/proyectos-de-acuerdo`, …), no un
ancla dentro de la portada: se abre directo, se puede compartir por enlace y el navegador guarda el historial.

Construido con React 18 + TypeScript + Vite, Tailwind CSS, Framer Motion y lucide-react.

---

## 1. Poner a andar el proyecto

```bash
npm install
cp .env.example .env     # luego pega tus llaves de Supabase
npm run dev
```

Sin llaves de Supabase la página **igual funciona**: carga contenido de ejemplo para que veas
el diseño completo. En ese modo no se puede iniciar sesión ni guardar.

## 2. Conectar Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. Abre **SQL Editor → New query**, pega el contenido de `supabase/schema.sql` y ejecútalo.
   Crea tablas, políticas de seguridad (RLS), el bucket de archivos `medios` y el disparador
   que genera el perfil de cada usuario nuevo.
3. Ejecuta después `supabase/seed.sql` para cargar la configuración inicial y los módulos.
4. En **Project Settings → API** copia `Project URL` y `anon public key` al archivo `.env`:

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

5. Crea los usuarios en **Authentication → Users → Add user** (correo + contraseña).
   Cada uno nace con rol `comunicador`. Para volver administrador al primero:

```sql
update perfiles set rol = 'admin'
where id = (select id from auth.users where email = 'tucorreo@dominio.com');
```

6. Reinicia `npm run dev` y entra a `/admin`.

## 3. Los dos roles

| Puede… | Administrador | Comunicaciones |
|---|---|---|
| Encender y apagar secciones del sitio | Sí | No |
| Editar identidad, biografía, redes, video del hero | Sí | No |
| Crear usuarios y asignar roles | Sí | No |
| Crear y editar publicaciones, proyectos, votaciones, agenda | Sí | Sí |
| Publicar o dejar en borrador | Sí | Sí |
| Subir fotos, videos y documentos | Sí | Sí |
| Ver y tramitar el buzón ciudadano | Sí | Sí |
| Eliminar registros definitivamente | Sí | No |

Los permisos no viven solo en la interfaz: están aplicados en la base de datos con políticas RLS
(`es_admin()` y `es_equipo()`), así que un comunicador no puede alterar la configuración aunque
manipule el cliente.

## 4. Qué reporta el sitio

Secciones pensadas para las funciones reales de un concejo municipal (Ley 136 de 1994 y Ley 1712
de 2014 de transparencia):

- **Gestión en cifras** — asistencia a sesiones, proyectos, debates, recorridos.
- **Quién soy** — biografía, partido, despacho, horario de atención.
- **Proyectos de acuerdo** — número, objeto, rol (autor / coautor / ponente), estado del trámite
  y texto radicado en PDF.
- **Récord de votación** — sentido del voto con su justificación, incluidas abstenciones,
  ausencias e impedimentos declarados.
- **Control político** — debates, citaciones, proposiciones, funcionarios citados y compromisos.
- **Publicaciones** — noticias, columnas, comunicados e informes, con página propia por artículo.
- **Agenda pública** — sesiones, comisiones y asambleas veredales.
- **Archivo multimedia** — fotos y videos de la gestión.
- **Transparencia** — declaración de bienes y rentas, conflictos de interés, asistencia,
  informes de gestión y hoja de vida.
- **Escríbame** — PQRS con autorización de tratamiento de datos (Ley 1581 de 2012).
- **Boletín** — suscripción por correo.

Cada sección se apaga desde `/admin/sitio` sin borrar su contenido.

## 5. Subpáginas y rutas

| Ruta | Qué muestra |
|---|---|
| `/` | Portada: video, cifras, atajos, últimos votos, publicaciones y agenda |
| `/quien-soy` | Biografía y los tres pilares de marca (Kev · Comunidad · Territorio) |
| `/proyectos-de-acuerdo` | Proyectos con filtro por tema |
| `/votaciones` | Récord de votación con filtro por sentido del voto |
| `/control-politico` | Debates, citaciones y proposiciones |
| `/publicaciones` y `/publicacion/:slug` | Listado y artículo completo |
| `/agenda` | Actividades públicas |
| `/multimedia` | Galería |
| `/transparencia` | Documentos agrupados por categoría |
| `/escribame` | Formulario de PQRS |
| `/pagina-1` y `/pagina-2` | **Subpáginas libres**, vacías y listas para conectar |
| `/politica-de-datos` | Tratamiento de datos personales |

Las dos páginas libres vienen apagadas. Para usarlas: escribe su contenido en
**Panel → Páginas libres**, y enciéndelas en **Panel → Configuración del sitio** (casillas
«Visible» y «En el menú»). El título que les pongas es el que aparece en el menú.

Desde Configuración del sitio también puedes **renombrar cualquier sección**: el nombre se refleja
en el menú, en el pie y en la cabecera de su subpágina. Si apagas una sección, su ruta deja de
responder y muestra la página 404.

## 6. Estructura

```
src/
  components/   Cáscara del sitio, navegación, logo, cabecera de subpágina, pie
  pages/        Una subpágina por apartado + portada, artículo y 404
  admin/        Panel: login, layout, CRUD genérico, configuración, usuarios, buzón, páginas libres
  context/      Sesión y roles (AuthContext), configuración viva del sitio (SitioContext)
  lib/          Cliente Supabase, capa de datos, tipos, mapa de rutas, contenido de ejemplo
supabase/
  schema.sql    Tablas, RLS, storage
  seed.sql      Datos iniciales
```

## 8. Marca y diseño

Paleta tomada del manual (`tailwind.config.js`):

| Token | Hex | Uso |
|---|---|---|
| `morado` | `#3E3185` | color base, cabeceras, barra de navegación |
| `moradoprofundo` | `#241A5E` | pie de página y degradados |
| `amarillo` | `#F1B809` | acento principal, botones, enlaces activos |
| `naranja` | `#E27815` | segundo acento, enlaces y estados |
| `verde` | `#28949B` | resultados y confirmaciones |
| `hueso` / `grafito` | `#F6F5FA` / `#2A2733` | fondo y texto |

Tipografías: **El Messiri** para titulares (está en el manual y en Google Fonts) y **Outfit** como
sustituto web de *Clover Display*, que no tiene versión web libre. Si tienes las licencias de
*Clover Display* y *Androgyne*, pon los archivos en `public/fuentes/`, declara los `@font-face` al
inicio de `src/index.css` y cambia el nombre en `fontFamily.sans` y `fontFamily.display`.

El imagotipo está recreado en SVG en `src/components/Logo.tsx` y `public/marca.svg`; reemplázalos
por los archivos oficiales del diseñador cuando los tengas. Los usos inadecuados del manual
(alterar colores, distorsionar, cambiar la tipografía) aplican igual aquí.

El video de fondo de la portada se cambia desde el panel, en Configuración del sitio. Usa un MP4
corto y comprimido (menos de 5 MB) subido al bucket `medios`.

## 9. Publicar

```bash
npm run build      # genera dist/
```

`dist/` se sube tal cual a Vercel, Netlify o Cloudflare Pages. Recuerda declarar las dos
variables de entorno en el panel del proveedor y activar el *fallback* a `index.html`
para que funcionen las rutas de React Router.

## 10. Antes de salir al aire

- Reemplaza el contenido de ejemplo por información real y verificable.
- Aclara en el pie que es un sitio del despacho, no el sitio oficial del municipio.
- Revisa que la política de datos tenga el correo real de contacto.
- Reemplaza el logo recreado en SVG por los archivos oficiales del manual.
- Si vas a mostrar votaciones, publícalas completas: publicar solo las favorables destruye la
  credibilidad del ejercicio.
