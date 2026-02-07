export type Library = {
  id: string;
  creatorId: string;
}

export type Recipe = {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  content: string;
  createdAt: string;
  removedAt: string | null;
  creatorId: string;
}

export type RecipeLibrary = {
  id: string;
  libraryId: string;
  recipeId: string;
}

export type RecipeTag = {
  id: string;
  recipeId: string;
  tagId: string;
}

export type Tag = {
  id: string;
  name: string;
  createdAt: string;
}

export type User = {
  id: string;
  email: string | null;
  phone: string | null;
  username: string;
  password: string;
  createdAt: string;
  removedAt: string | null;
}