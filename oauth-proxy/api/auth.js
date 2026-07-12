// Paso 1 del login OAuth: redirige al usuario a GitHub para que autorice la app.
// Decap CMS abre esta URL en una ventana emergente cuando el usuario hace clic
// en "Login with GitHub" dentro de /admin.

export default function handler(req, res) {
  const clientId = process.env.OAUTH_CLIENT_ID;

  if (!clientId) {
    res.status(500).send("Falta configurar la variable de entorno OAUTH_CLIENT_ID en Vercel.");
    return;
  }

  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const redirectUri = `${protocol}://${host}/api/callback`;

  const scope = req.query.scope || "repo,user";
  const state = Math.random().toString(36).slice(2);

  const authorizeUrl =
    "https://github.com/login/oauth/authorize?" +
    new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      scope,
      state,
    }).toString();

  res.writeHead(302, { Location: authorizeUrl });
  res.end();
}
