import React from "react";
import { Text, StyleSheet } from "react-native";

export default function ThemedHeader({ title }: { title: string }) {
  return <Text style={styles.header}>{title}</Text>;
}

const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 20,
  },
});
