import { sql } from "../db";
import type { Recipes } from "../types/db.types";

export const recipeService = {
  getRecipesByCreatorId: async (creator_id: string): Promise<Recipes[]> => {
    return await sql<Recipes[]>`
    SELECT * FROM recipes WHERE creator_id = ${creator_id} AND removed_at IS NULL
    `;
  },

  postRecipes: async (
    creator_id: string,
    body: {
      title: string;
      subtitle: string | null;
      description: string | null;
      content: string;
    },
  ): Promise<Recipes> => {
    const [recipe] = await sql<Recipes[]>`
    INSERT INTO recipes (
      title,
      subtitle,
      description,
      content,
      creator_id
    )
    VALUES (
      ${body.title},
      ${body.subtitle},
      ${body.description},
      ${body.content},
      ${creator_id}
    )
    RETURNING *
    `;

    if (!recipe) {
      throw new Error("Failed to create resource"); 
    }

    return recipe;
  },

  getRecipeById: async (
    id: string,
    creator_id: string,
  ): Promise<Recipes | null> => {
    const results = await sql<
      Recipes[]
    >`SELECT * FROM recipes WHERE id = ${id} AND creator_id = ${creator_id} AND removed_at IS NULL`;
    return results[0] || null;
  },
};
