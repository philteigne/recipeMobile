export type HttpErrorOptions = {
  statusCode: number;
  code: string;
  message: string;
  details?: unknown;
  cause?: unknown;
};

export class HttpError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details?: unknown;

  constructor(opts: HttpErrorOptions) {
    super(opts.message);
    this.name = 'HttpError';
    this.statusCode = opts.statusCode;
    this.code = opts.code;
    this.details = opts.details;
    // Bun supports Error.cause at runtime; keep it for debugging
    // without changing the response shape.
    (this as any).cause = opts.cause;
  }
}

export function isHttpError(err: unknown): err is HttpError {
  return (
    !!err &&
    typeof err === 'object' &&
    'statusCode' in err &&
    'code' in err &&
    'message' in err
  );
}
