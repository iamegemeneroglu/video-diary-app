import React from "react";
import { Text, StyleSheet, TextProps } from "react-native";

export default function ThemedText({ children, style, ...props }: TextProps) {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: "#111827",
    lineHeight: 24,
    letterSpacing: 0.5,
    fontFamily: "System",
  },
});
