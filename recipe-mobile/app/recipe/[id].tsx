import React from "react";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, ScrollView, View, StyleSheet } from "react-native";
import ScreenView from "@/components/layout/ScreenView";
import H1 from "@/components/typography/H1";
import H3 from "@/components/typography/H3";
import RecipeContent from "@/components/viewer/RecipeContent";
import { useRecipe } from "@/hooks/useRecipe";
import { Spacing } from "@/consts/theme";

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { recipe, loading, error } = useRecipe(id);

  if (loading) {
    return (
      <ScreenView>
        <ActivityIndicator style={{ marginTop: Spacing.xl }} />
      </ScreenView>
    );
  }

  if (error || !recipe) {
    return (
      <ScreenView>
        <H3>{error ?? "Recipe not found"}</H3>
      </ScreenView>
    );
  }

  return (
    <ScreenView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <H1>{recipe.title}</H1>
        </View>

        <View style={styles.content}>
          <RecipeContent content={recipe.content} />
        </View>
      </ScrollView>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: Spacing.xs,
    marginBottom: Spacing.lg,
  },
  content: {
    paddingBottom: Spacing.xxl,
  },
});
