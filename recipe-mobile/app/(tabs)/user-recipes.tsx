import React from "react";
import H1 from "@/components/typography/H1";
import ScreenView from "@/components/layout/ScreenView";
import { ActivityIndicator, ScrollView } from "react-native";
import PressableCard from "@/components/buttons/PressableCard";
import H2 from "@/components/typography/H2";
import H3 from "@/components/typography/H3";
import { useRecipes } from "@/hooks/useRecipes";
import { useRouter } from "expo-router";

export default function UserRecipesScreen() {
  const { recipes, loading, error } = useRecipes();
  const router = useRouter();

  return (
    <ScreenView>
      <H1>User Recipes Screen</H1>

      {loading && <ActivityIndicator />}
      {error && <H3>{error}</H3>}

      <ScrollView>
        {recipes?.map((recipe) => (
          <PressableCard
            key={recipe.id}
            solid
            onPress={() => router.push(`/recipe/${recipe.id}`)}
          >
            <H2>{recipe.title}</H2>
            <H3>{recipe.subtitle}</H3>
          </PressableCard>
        ))}
      </ScrollView>
    </ScreenView>
  );
}
