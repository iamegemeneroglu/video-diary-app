import React, { useState, useEffect } from "react";
import { TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import useVideoStore, { VideoItem } from "../../src/store";
import { z } from "zod";
import ThemedContainer from "../../components/ThemedContainer";
import ThemedText from "../../components/ThemedText";
import ThemedTextButton from "../../components/ThemedTextButton";

const metadataSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});

export default function EditScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const video = useVideoStore((state) =>
    state.videos.find((vid: VideoItem) => vid.id.toString() === id)
  );
  const updateVideo = useVideoStore((state) => state.updateVideo);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (video) {
      setName(video.name);
      setDescription(video.description);
    }
  }, [video]);

  const handleUpdate = () => {
    try {
      metadataSchema.parse({ name, description });
      if (video) {
        updateVideo(video.id, { name, description });
        router.replace(`/details/${video.id}`);
      }
    } catch (error: any) {
      Alert.alert("Validation Error", error.errors[0].message);
    }
  };

  if (!video) {
    return (
      <ThemedContainer style={styles.centered}>
        <ThemedText style={styles.notFoundText}>Video not found.</ThemedText>
      </ThemedContainer>
    );
  }

  return (
    <ThemedContainer>
      <ThemedText style={styles.header}>Edit Video Metadata</ThemedText>
      <ThemedText style={styles.label}>Name:</ThemedText>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter name"
        placeholderTextColor="#9CA3AF"
      />
      <ThemedText style={styles.label}>Description:</ThemedText>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        placeholderTextColor="#9CA3AF"
        multiline
      />
      <ThemedTextButton
        title="Update Video"
        onPress={handleUpdate}
        style={styles.button}
      />
    </ThemedContainer>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundText: {
    fontSize: 18,
    color: "#6B7280",
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    color: "#1F2937",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4B5563",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    color: "#111827",
  },
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#3B82F6",
    marginTop: "auto",
  },
});
