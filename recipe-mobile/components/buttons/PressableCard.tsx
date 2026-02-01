import { Pressable, StyleSheet, ViewStyle } from "react-native";
import React from "react";
import { Spacing, Colors } from "@/consts/theme";

export default function PressableCard({
  children,
  solid = false,
  style,
  onPress,
} : {
  children: React.ReactNode
  solid?: boolean
  style?: ViewStyle
  onPress?: () => void
}) {
  return (
    <Pressable style={[
      styles.card,
      solid && styles.solid,
      style
    ]} onPress={onPress}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 'auto',
    padding: Spacing.xs,
    borderRadius: Spacing.sm,
    backgroundColor: 'transparent',
  },
  solid: {
    padding: Spacing.md,
    backgroundColor: Colors.background,
  }
});