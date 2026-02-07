import { fetchApi } from "@/lib/api";
import { routes } from "@/lib/apiRoutes";
import { buildUrl } from "@/lib/buildUrl";
import { Recipe } from "@/types/db.types";
import { useEffect, useState } from "react";

type RecipeParams = {
};

export const useRecipes = (params?: RecipeParams) => {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const data = await fetchApi(buildUrl(routes.recipes, params));
      const recipes: Recipe[] = await data.json();
      setRecipes(recipes);
    } catch (err) {
      setError("Failed to load recipes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [params]);

  return { recipes, loading, error, refetch: fetchRecipes };
};