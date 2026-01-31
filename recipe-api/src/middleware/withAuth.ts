import type { Handler, Context } from "../types/global.types";

export const withAuth = (handler: Handler): Handler => {
  return async (req: Request, context: Context) => {
    // For now, we'll extract userId from a header (e.g., x-user-id)
    // In a real app, this would verify a JWT token
    const user_id = req.headers.get("x-user-id");

    if (!user_id) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Attach userId to context
    const newContext: Context = { ...context, user_id };

    return handler(req, newContext);
  };
};
