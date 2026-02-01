import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function H2({ children }: { children: React.ReactNode }) {
  return <Text style={styles.h2}>{children}</Text>;
}

const styles = StyleSheet.create({
  h2: {
    fontSize: 20,
    fontWeight: 'semibold',
  },
});
