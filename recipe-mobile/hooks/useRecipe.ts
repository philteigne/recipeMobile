import { fetchApi } from "@/lib/api";
import { routes } from "@/lib/apiRoutes";
import { Recipe } from "@/types/db.types";
import { useEffect, useState } from "react";

export const useRecipe = (id: string) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipe = async () => {
    try {
      setLoading(true);
      const data = await fetchApi(routes.recipe(id));
      const recipe: Recipe = await data.json();
      setRecipe(recipe);
    } catch (err) {
      setError("Failed to load recipe");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  return { recipe, loading, error, refetch: fetchRecipe };
};