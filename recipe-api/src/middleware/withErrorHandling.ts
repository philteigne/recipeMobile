import type { Handler } from "../types/global.types";
import { isHttpError } from "./errors";

export type ErrorResponseBody = {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

export const withErrorHandling =
  (handler: Handler): Handler =>
  async (request, context) => {
    try {
      return await handler(request, context);
    } catch (err) {
      const status = isHttpError(err) ? err.statusCode : 500;
      const code = isHttpError(err) ? err.code : "internal_error";
      const message = isHttpError(err) ? err.message : "Internal Server Error";
      const details = isHttpError(err) ? err.details : undefined;

      // Avoid leaking internals by default; keep console for dev visibility.
      console.error("[pantry-api] request failed", { url: request.url, err });

      const body: ErrorResponseBody = {
        error: { code, message, details },
      };

      return Response.json(body, { status });
    }
  };
