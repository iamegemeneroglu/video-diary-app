import React, { useEffect } from "react";
import { View, ImageBackground, StyleSheet, Text } from "react-native";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function SplashScreenComponent() {
  useEffect(() => {
    async function hideSplash() {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await SplashScreen.hideAsync();
    }
    hideSplash();
  }, []);

  return (
    <ImageBackground
      source={require("../assets/images/splash-icon.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <Text style={styles.title}>Uygulama İsmi</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
});
