import type { Handler } from '../types/global.types';

export type Wrapper = (handler: Handler) => Handler;

/**
 * Compose wrappers around a handler.
 *
 * Order is left-to-right (outer to inner):
 * `wrap(h, a, b)` becomes `h(a(b))`.
 * First wrapper is outermost (runs first), last wrapper is innermost (runs last).
 *
 * This is convenient for route definitions:
 * `wrap(controller, withErrorHandling, withAuth, withSystemIdValidation)`
 * Executes: withErrorHandling → withAuth → withSystemIdValidation → controller
 */
export const wrap = (handler: Handler, ...wrappers: Wrapper[]): Handler =>
  wrappers.reduceRight((acc, w) => w(acc), handler);
