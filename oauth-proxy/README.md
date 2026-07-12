# Proxy de OAuth para Decap CMS

Este servidor no forma parte del sitio web en sí. Es una pieza pequeña,
independiente, que existe solo porque GitHub Pages (donde vive el sitio) es
hosting **estático** y no puede guardar el "client secret" de GitHub ni hacer
el intercambio de código por token que exige el login OAuth.

Se despliega por separado en Vercel (capa gratuita), como un proyecto aparte
dentro de este mismo repositorio (usando esta carpeta como "Root Directory").

## Variables de entorno necesarias (configurarlas en Vercel)

- `OAUTH_CLIENT_ID`: Client ID de la GitHub OAuth App.
- `OAUTH_CLIENT_SECRET`: Client Secret de la GitHub OAuth App.

## Endpoints

- `GET /api/auth` — redirige a GitHub para iniciar el login.
- `GET /api/callback` — recibe el código de GitHub, lo cambia por un token y
  se lo entrega a la ventana de Decap CMS.

Ver la guía completa de despliegue en el `README.md` de la raíz del proyecto.
