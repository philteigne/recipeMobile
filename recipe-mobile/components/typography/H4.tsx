import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function H4({ children }: { children: React.ReactNode }) {
  return <Text style={styles.h4}>{children}</Text>;
}

const styles = StyleSheet.create({
  h4: {
    fontSize: 14,
    fontWeight: 'normal',
  },
});
