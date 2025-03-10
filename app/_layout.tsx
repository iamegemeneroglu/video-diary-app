import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { initDB } from "@/src/db"; // Şimdilik kullanmıyoruz

const queryClient = new QueryClient();

export default function Layout() {
  // useEffect(() => {
  //   initDB()
  //     .then(() => console.log("Database initialized"))
  //     .catch((err) => console.error("Database initialization failed:", err));
  // }, []);

  return (
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
    </QueryClientProvider>
  );
}
