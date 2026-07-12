// Paso 2 del login OAuth: GitHub redirige aquí con un "code" temporal.
// Este endpoint lo cambia por un access_token (usando el client secret, que
// nunca debe quedar expuesto en el navegador) y se lo entrega a la ventana
// de Decap CMS que abrió el popup, mediante window.postMessage.

function renderMessagePage(status, content) {
  // Protocolo esperado por decap-cms-backend-github:
  // 1. El popup avisa "authorizing:github" a la ventana que lo abrió.
  // 2. La ventana principal responde (para confirmar el origin).
  // 3. El popup responde con "authorization:github:success:{...}" o
  //    "authorization:github:error:{...}".
  return `
<!DOCTYPE html>
<html>
  <body>
    <script>
      (function () {
        function receiveMessage(message) {
          window.opener.postMessage(
            'authorization:github:${status}:${JSON.stringify(content)}',
            message.origin
          );
          window.removeEventListener("message", receiveMessage, false);
        }
        window.addEventListener("message", receiveMessage, false);
        window.opener.postMessage("authorizing:github", "*");
      })();
    </script>
  </body>
</html>`;
}

export default async function handler(req, res) {
  const { code, error, error_description } = req.query;

  if (error) {
    res.setHeader("Content-Type", "text/html");
    res.status(200).send(
      renderMessagePage("error", { message: error_description || error })
    );
    return;
  }

  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    res.status(500).send(
      "Faltan configurar OAUTH_CLIENT_ID / OAUTH_CLIENT_SECRET en Vercel."
    );
    return;
  }

  try {
    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
        }),
      }
    );

    const data = await tokenResponse.json();

    if (data.error) {
      res.setHeader("Content-Type", "text/html");
      res.status(200).send(
        renderMessagePage("error", {
          message: data.error_description || data.error,
        })
      );
      return;
    }

    res.setHeader("Content-Type", "text/html");
    res.status(200).send(
      renderMessagePage("success", {
        token: data.access_token,
        provider: "github",
      })
    );
  } catch (err) {
    res.setHeader("Content-Type", "text/html");
    res.status(200).send(
      renderMessagePage("error", { message: "Error al obtener el token de GitHub." })
    );
  }
}
