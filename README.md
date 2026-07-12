# Bermúdez Mosquera Abogados & Consultores — Sitio web

Sitio corporativo construido con **Next.js (React)** en modo de exportación estática, con **Decap CMS** como panel administrativo para editar textos e imágenes sin tocar código. Pensado para desplegarse en **GitHub Pages**.

## Stack

- Next.js 14 (Pages Router, `output: "export"`)
- React 18 + Tailwind CSS (paleta negro grafito / dorado metálico, tomada del logo)
- Contenido en Markdown/JSON dentro de `content/`, editable vía Decap CMS (`/admin`)
- Formulario de contacto (Formspree u otro proveedor, ver abajo)

## 1. Requisitos previos

Necesitas **Node.js 18 o superior** instalado. Verifica con:

```bash
node -v
npm -v
```

Si no lo tienes, instálalo desde https://nodejs.org (o con `nvm install --lts`).

## 2. Instalación

```bash
npm install
```

## 3. Desarrollo local

```bash
npm run dev
```

Abre http://localhost:3000

## 4. Editar contenido con Decap CMS (modo local)

Como el proyecto todavía no tiene un repositorio remoto, el CMS funciona en modo **local_backend**: guarda los cambios directamente en los archivos de `content/` en tu disco.

En una terminal:

```bash
npm run cms
```

En otra terminal (o al mismo tiempo):

```bash
npm run dev
```

Y abre http://localhost:3000/admin — ahí Karito y su esposo pueden editar títulos, párrafos, áreas de práctica, casos de éxito, artículos del blog y preguntas frecuentes con una interfaz visual, sin tocar código. Los cambios quedan guardados como archivos; luego se deben confirmar con git (`git add` + `git commit`) para que queden en el historial.

## 5. Formulario de contacto → correo karito_0516@hotmail.com

Como GitHub Pages es hosting **estático** (no puede ejecutar backend), el envío del formulario se resuelve con un servicio externo gratuito. Recomendado: **Formspree**.

1. Crear una cuenta gratuita en https://formspree.io con el correo `karito_0516@hotmail.com`.
2. Crear un formulario nuevo y copiar el endpoint (ej: `https://formspree.io/f/xxxxxxx`).
3. Configurar la variable de entorno `NEXT_PUBLIC_FORM_ENDPOINT` con ese valor (en `.env.local` para desarrollo, y como *secret* `FORM_ENDPOINT` en GitHub Actions para producción).

Mientras esa variable no esté configurada, el formulario funciona en modo de respaldo: abre el cliente de correo del usuario con un mensaje prellenado dirigido a `karito_0516@hotmail.com`.

## 6. Despliegue en GitHub Pages

1. Crear el repositorio en GitHub y hacer push de este proyecto a la rama `main`.
2. En GitHub: **Settings → Pages → Source: GitHub Actions**.
3. (Opcional) Agregar el secret `FORM_ENDPOINT` en **Settings → Secrets and variables → Actions**.
4. Cada push a `main` ejecuta `.github/workflows/deploy.yml`, que compila el sitio (`next build` → carpeta `out/`) y lo publica automáticamente.

El workflow ya calcula `NEXT_PUBLIC_BASE_PATH` y `NEXT_PUBLIC_SITE_URL` a partir del nombre del repositorio, así que no hay que tocarlo salvo que se use un dominio propio (ver punto 8).

## 7. Decap CMS en producción (edición desde bermudezmosquera.com/admin)

GitHub Pages es hosting estático: no puede guardar el "client secret" de
GitHub ni hacer el intercambio OAuth de código por token. Por eso, además
del sitio, este repo incluye `oauth-proxy/`: un pequeño servidor que sí hace
ese intercambio, pensado para desplegarse por separado en Vercel (gratis).

Pasos para activarlo (una sola vez):

1. **Crear la GitHub OAuth App**: GitHub → Settings (de tu usuario) →
   Developer settings → OAuth Apps → New OAuth App.
   - Homepage URL: `https://bermudezmosquera.com`
   - Authorization callback URL: `https://<tu-proyecto>.vercel.app/api/callback`
     (el nombre exacto del proyecto lo defines al desplegar en el paso 2;
     puedes editar esta URL en la OAuth App después si cambia).
   - Guarda el **Client ID** y genera un **Client Secret**.
2. **Desplegar `oauth-proxy/` en Vercel**:
   - Crear cuenta en https://vercel.com (gratis, con GitHub).
   - "Add New… → Project" → importar este repositorio.
   - En "Root Directory" seleccionar `oauth-proxy`.
   - En "Environment Variables" agregar `OAUTH_CLIENT_ID` y
     `OAUTH_CLIENT_SECRET` con los valores del paso 1.
   - Desplegar. Vercel te da una URL como `https://bermudez-mosquera-oauth.vercel.app`.
   - Si la callback URL de la OAuth App no coincide con la URL final, edítala
     en GitHub para que sea `https://<esa-url>/api/callback`.
3. **Actualizar `public/admin/config.yml`**: reemplazar `<URL-DEL-PROXY-EN-VERCEL>`
   por `https://<esa-url>/api` (con `/api` al final).
4. Hacer commit y push. Ya se podrá iniciar sesión con GitHub en
   `https://bermudezmosquera.com/admin` (solo funcionará para cuentas de
   GitHub con permiso de escritura sobre este repositorio).

`local_backend: true` no afecta producción; solo se activa cuando el sitio
corre en `localhost`, así que la edición local (sección 4) sigue funcionando
igual.

## 8. Dominio propio y analítica (cuando estén disponibles)

- **Dominio propio:** agregar un archivo `public/CNAME` con el dominio, y ajustar `NEXT_PUBLIC_SITE_URL`.
- **Google Analytics / Meta Pixel / Search Console:** aún no están conectados porque no se cuenta con los IDs. Cuando los tengan, se agregan como variables de entorno y un componente de analítica en `pages/_app.js`.

## 9. Estructura del contenido

```
content/
  site/            → Textos generales (inicio, quiénes somos, FAQ, contacto, datos de la firma)
  practice-areas/  → Áreas de práctica (una nota Markdown por área)
  case-studies/    → Casos de éxito (anonimizados)
  blog/            → Artículos del blog jurídico
```

Todo el contenido actual es **de ejemplo/inventado**, coherente con el negocio, listo para ser reemplazado por contenido real desde el panel de Decap CMS.

## 10. Imagen de marca

El logo oficial está en `public/images/logo.jpg` (copiado desde `recursos/`, carpeta que se excluye del repositorio vía `.gitignore` por contener material de trabajo interno, no del sitio).

## 11. Redes sociales y WhatsApp

Configurados en `content/site/settings.json`:
- Instagram: https://www.instagram.com/bermudezmosquera.legal
- WhatsApp: +57 333 643 2674 (botón flotante en todo el sitio + enlaces en Contacto y Footer)
- Facebook / LinkedIn / TikTok / YouTube: campos listos, vacíos hasta que la firma cree esas cuentas.
