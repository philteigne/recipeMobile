import { recipeRoutes } from "./routes/recipe.routes";
import type { Context } from "./types/global.types";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-user-id",
  "Access-Control-Max-Age": "86400",
};

const withCors = (res: Response) =>
  new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers: { ...Object.fromEntries(res.headers), ...CORS },
  });

type RouteHandler = (req: Request, context: Context) => Response | Promise<Response>;

const routes: Record<string, Record<string, RouteHandler>> = {
  "/": { GET: () => new Response("Bun!") },
  ...recipeRoutes,
};

function getHandler(pathname: string, method: string): RouteHandler | null {
  const exact = routes[pathname]?.[method];
  if (exact) return exact;
  if (pathname.startsWith("/api/recipes/") && pathname !== "/api/recipes") {
    return routes["/api/recipes/:id"]?.[method] ?? null;
  }
  return null;
}

const context: Context = { user_id: "" };

const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const { pathname } = new URL(req.url);
    const method = req.method;

    if (method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });

    const handler = getHandler(pathname, method);
    const res = handler
      ? await handler(req, context)
      : new Response("Not Found", { status: 404 });
    return withCors(res);
  },
});

console.log(`Listening on ${server.url}`);
