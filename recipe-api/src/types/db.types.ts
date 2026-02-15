import { z } from "zod";

/** ProseMirror document JSON (TipTap editor output) */
export const ProseMirrorDocSchema = z.object({
  type: z.literal('doc'),
  content: z.array(z.record(z.string(), z.any())),
});
export type ProseMirrorDoc = z.infer<typeof ProseMirrorDocSchema>;

export const LibrariesSchema = z.object({
  id: z.uuid(),
  creator_id: z.uuid(),
});
export type Libraries = z.infer<typeof LibrariesSchema>;

export const RecipesSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  content: ProseMirrorDocSchema,
  created_at: z.date(),
  removed_at: z.date().nullable(),
  creator_id: z.uuid(),
});
export type Recipes = z.infer<typeof RecipesSchema>

export const RecipesLibrariesSchema = z.object({
  id: z.uuid(),
  libraries_id: z.uuid(),
  recipe_id: z.uuid(),
});
export type RecipesLibraries = z.infer<typeof RecipesLibrariesSchema>


export const RecipesTagsSchema = z.object({
  id: z.uuid(),
  recipe_id: z.uuid(),
  tag_id: z.uuid(),
});
export type RecipesTags = z.infer<typeof RecipesTagsSchema>

export const TagsSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  created_at: z.date(),
});
export type Tags = z.infer<typeof TagsSchema>

export const UsersSchema = z.object({
  id: z.uuid(),
  username: z.string(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  password: z.string(),
  created_at: z.date(),
  removed_at: z.date().nullable(),
});
export type Users = z.infer<typeof UsersSchema>
