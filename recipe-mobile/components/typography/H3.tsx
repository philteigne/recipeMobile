import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function H3({ children }: { children: React.ReactNode }) {
  return <Text style={styles.h3}>{children}</Text>;
}

const styles = StyleSheet.create({
  h3: {
    fontSize: 16,
    fontWeight: 'normal',
  },
});
