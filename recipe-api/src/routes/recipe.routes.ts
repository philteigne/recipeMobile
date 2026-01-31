import {
  getRecipesByCreatorIdController,
  getRecipeByIdController,
  postRecipesController,
} from "../controllers/recipe.controller";
import { wrap } from "../middleware/wrap";
import { withAuth } from "../middleware/withAuth";
import { withErrorHandling } from "../middleware/withErrorHandling";
import type { Handler } from "../types/global.types";

const api = (handler: Handler) => wrap(handler, withErrorHandling, withAuth);

export const recipeRoutes = {
  "/api/recipes": {
    GET: api(getRecipesByCreatorIdController),
    POST: api(postRecipesController),
  },
  "/api/recipes/:id": {
    GET: api(getRecipeByIdController),
  },
};
