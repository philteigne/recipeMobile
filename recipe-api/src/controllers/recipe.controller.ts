import { recipeService } from "../services/recipe.service";
import { RecipesSchema } from "../types/db.types";
import type { Handler } from "../types/global.types";

export const getRecipesByCreatorIdController: Handler = async (
  request,
  context,
) => {
  const creator_id = context.user_id;
  const recipes = await recipeService.getRecipesByCreatorId(creator_id);
  return Response.json(recipes);
};

export const postRecipesController: Handler = async (request, context) => {
  console.log(request)
  const payload = await request.json();
  const validation = RecipesSchema.omit({
    id: true,
    created_at: true,
    removed_at: true,
    creator_id: true,
  }).safeParse(payload);

  if (!validation.success) {
    return Response.json({ error: validation.error.format() }, { status: 400 });
  }

  const recipe = await recipeService.postRecipes(context.user_id, validation.data);
  return Response.json(recipe, { status: 201 });
};

export const getRecipeByIdController: Handler = async (request, context) => {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return new Response("Bad Request", { status: 400 });
  }

  const recipe = await recipeService.getRecipeById(id, context.user_id);
  if (!recipe) {
    return new Response("Not Found", { status: 404 });
  }
  return Response.json(recipe);
};
