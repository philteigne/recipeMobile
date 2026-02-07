export const routes = {
  recipes: "/api/recipes",
  recipe: (id: string) => `/api/recipes/${id}`,
} as const;