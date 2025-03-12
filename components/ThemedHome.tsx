import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ThemedFloatiButton() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/")}
      >
        <Ionicons name="home" size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    position: "absolute",
    right: 5,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  button: {
    width: 35,
    height: 120,
    borderRadius: 30,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
