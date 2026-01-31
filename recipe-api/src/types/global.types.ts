export interface Context {
  user_id: string;
}

export type Handler = (
  req: Request,
  context: Context,
) => Response | Promise<Response>;
