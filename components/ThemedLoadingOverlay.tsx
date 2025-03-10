import React from "react";
import { View, ActivityIndicator, StyleSheet, ViewStyle } from "react-native";

interface ThemedLoadingOverlayProps {
  visible: boolean;
  style?: ViewStyle;
}

export default function ThemedLoadingOverlay({
  visible,
  style,
}: ThemedLoadingOverlayProps) {
  if (!visible) return null;
  return (
    <View style={[styles.overlay, style]}>
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
});
