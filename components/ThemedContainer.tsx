import React from "react";
import { View, StyleSheet, ViewProps } from "react-native";

export default function ThemedContainer({
  children,
  style,
  ...rest
}: ViewProps) {
  return (
    <View style={[styles.container, style]} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6", 
    padding: 20,
  },
});
