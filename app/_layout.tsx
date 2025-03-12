import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemedBottomMenu from "../components/ThemedHome";

const queryClient = new QueryClient();

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="index" options={{ title: "Cropped Videos" }} />
          <Stack.Screen name="crop" options={{ title: "Crop Video" }} />
          <Stack.Screen name="metadata" options={{ title: "Add Metadata" }} />
          <Stack.Screen
            name="details/[id]"
            options={{ title: "Video Details" }}
          />
          <Stack.Screen name="edit/[id]" options={{ title: "Edit Video" }} />
        </Stack>
        <ThemedBottomMenu />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
