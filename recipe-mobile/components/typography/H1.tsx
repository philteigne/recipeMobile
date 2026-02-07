import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function H1({ children }: { children: React.ReactNode }) {
  return <Text style={styles.h1}>{children}</Text>;
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
