/** ProseMirror document JSON (TipTap editor output) */
export type ProseMirrorDoc = {
  type: 'doc';
  content: Record<string, any>[];
};
