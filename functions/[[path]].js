
export async function onRequest(context) {
  const { request, env } = context;

  const origin = await env.ORIGIN_KV.get("origin");

  if (!origin) {
    return new Response("Sharkord origin is missing from KV.", {
      status: 503,
    });
  }

  let upstream;

  try {
    upstream = new URL(origin);
  } catch {
    return new Response("Invalid origin URL.", { status: 502 });
  }

  if (
    upstream.protocol !== "https:" ||
    !upstream.hostname.endsWith(".trycloudflare.com")
  ) {
    return new Response("Invalid tunnel origin.", { status: 502 });
  }

  const incoming = new URL(request.url);
  upstream.pathname = incoming.pathname;
  upstream.search = incoming.search;

  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.set("x-forwarded-host", incoming.host);
  headers.set("x-forwarded-proto", "https");

  const origin = request.headers.get("origin");
  if (origin) {
    if (origin !== incoming.origin) {
      return new Response("Cross-origin requests are not accepted.", { status: 403 });
    }
    headers.set("origin", upstream.origin);
  }

  
  if (request.headers.get("Upgrade")?.toLowerCase() === "websocket") {
    try {
      const wsUrl = new URL(upstream);
      wsUrl.protocol = "https:";

      const wsHeaders = new Headers();
      wsHeaders.set("Upgrade", "websocket");

      const response = await fetch(wsUrl, {
        method: "GET",
        headers: wsHeaders,
      });

      if (!response.webSocket) {
        console.error(
          "Upstream WebSocket handshake failed:",
          response.status,
          await response.text().catch(() => ""),
        );

        return new Response("Upstream WebSocket handshake failed.", {
          status: 502,
        });
      }

      // Cloudflare has established the upstream WebSocket.
      // Return that WebSocket as the response connection.
      return new Response(null, {
        status: 101,
        webSocket: response.webSocket,
      });
    } catch (error) {
      console.error("WebSocket proxy error:", error);

      return new Response("WebSocket proxy failed.", {
        status: 502,
      });
    }
  }


  try {
    const response = await fetch(
      new Request(upstream, {
        method: request.method,
        headers,
        body:
          request.method === "GET" || request.method === "HEAD"
            ? undefined
            : request.body,
        redirect: "manual",
      }),
    );

    const outputHeaders = new Headers(response.headers);
    const location = outputHeaders.get("location");

    if (location) {
      try {
        const redirectUrl = new URL(location, upstream);

        if (redirectUrl.hostname === upstream.hostname) {
          redirectUrl.protocol = incoming.protocol;
          redirectUrl.host = incoming.host;
          outputHeaders.set("location", redirectUrl.toString());
        }
      } catch {
        // Keep unparseable Location headers unchanged.
      }
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: outputHeaders,
    });
  } catch {
    return new Response("Could not reach Sharkord.", { status: 502 });
  }
}
