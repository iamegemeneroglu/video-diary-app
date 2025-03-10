import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import useVideoStore from "../src/store";
import { z } from "zod";

const metadataSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});

export default function MetadataScreen() {
  const router = useRouter();
  const { videoUri } = useLocalSearchParams<{ videoUri: string }>();
  const addVideo = useVideoStore((state) => state.addVideo);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    try {
      metadataSchema.parse({ name, description });
      const newVideo = {
        id: Date.now(),
        videoUri,
        name,
        description,
      };
      addVideo(newVideo);
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Validation Error", error.errors[0].message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Video Metadata</Text>
      <Text>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter name"
      />
      <Text>Description:</Text>
      <TextInput
        style={[styles.input, { height: 75, textAlignVertical: "top" }]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Video</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#007aff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});
