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
  //
  // El texto visible de abajo es solo diagnóstico temporal: permite ver en
  // pantalla qué paso del handshake se completó, sin depender de que la
  // consola del navegador estuviera abierta a tiempo.
  return `
<!DOCTYPE html>
<html>
  <body style="font-family: monospace; padding: 20px; font-size: 14px; line-height: 1.6;">
    <div id="log">Cargando…</div>
    <script>
      (function () {
        var logEl = document.getElementById("log");
        function log(msg) {
          logEl.innerHTML += "<br>" + msg;
        }

        log("Script iniciado.");

        if (!window.opener) {
          log("ERROR: window.opener es null. Esta ventana no se abrió como popup vinculado a /admin (o el navegador rompió el vínculo). El login no puede completarse así.");
          return;
        }
        log("window.opener detectado correctamente.");

        function receiveMessage(message) {
          log("Mensaje recibido de vuelta desde /admin (origin: " + message.origin + "). Enviando token final...");
          try {
            window.opener.postMessage(
              'authorization:github:${status}:${JSON.stringify(content)}',
              message.origin
            );
            log("Token enviado. Puedes cerrar esta ventana.");
          } catch (e) {
            log("ERROR al enviar el token: " + e.message);
          }
          window.removeEventListener("message", receiveMessage, false);
        }
        window.addEventListener("message", receiveMessage, false);

        try {
          window.opener.postMessage("authorizing:github", "*");
          log("Aviso 'authorizing:github' enviado a /admin. Esperando respuesta...");
        } catch (e) {
          log("ERROR al avisar a /admin: " + e.message);
        }

        setTimeout(function () {
          log("(Han pasado 4 segundos sin respuesta de /admin, si no ves más líneas arriba el problema está en esa pestaña, no aquí.)");
        }, 4000);
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
