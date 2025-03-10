import React from "react";
import { StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Video, ResizeMode } from "expo-av";
import useVideoStore from "../../src/store";
import ThemedContainer from "../../components/ThemedContainer";
import ThemedText from "../../components/ThemedText";
import ThemedTextButton from "../../components/ThemedTextButton";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const video = useVideoStore((state) =>
    state.videos.find((vid) => vid.id.toString() === id)
  );

  if (!video) {
    return (
      <ThemedContainer style={styles.centered}>
        <ThemedText style={styles.notFoundText}>Video not found.</ThemedText>
      </ThemedContainer>
    );
  }

  return (
    <ThemedContainer style={styles.container}>
      <Video
        source={{ uri: video.videoUri }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        style={styles.video}
      />
      <ThemedText style={styles.title}>{video.name}</ThemedText>
      <ThemedText style={styles.description}>{video.description}</ThemedText>
      <ThemedTextButton
        title="Edit Video"
        onPress={() => router.push(`/edit/${video.id}`)}
        style={styles.button}
      />
    </ThemedContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundText: {
    fontSize: 18,
    color: "#6B7280",
  },
  video: {
    width: "100%",
    height: "75%",
    borderRadius: 10,
    backgroundColor: "black",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginVertical: 15,
    color: "#1F2937",
  },
  description: {
    fontSize: 16,
    color: "#4B5563",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#3B82F6",
    marginTop: "auto",
  },
});
