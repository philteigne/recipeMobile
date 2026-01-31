import { recipeRoutes } from "./routes/recipe.routes";
import type { Context } from "./types/global.types";

const server = Bun.serve({
  port: 3000,
  routes: {
    "/": () => new Response("Bun!"),
    ...Object.fromEntries(
      Object.entries(recipeRoutes).map(([path, methods]) => [
        path,
        Object.fromEntries(
          Object.entries(methods).map(([method, handler]) => [
            method,
            (req: Request) => {
              const context: Context = { user_id: "" }; // Initial empty context
              return (handler as any)(req, context);
            },
          ]),
        ),
      ]),
    ),
  },
});

console.log(`Listening on ${server.url}`);
