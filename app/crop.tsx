import React, { useState, useEffect } from "react";
import { Alert, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import VideoCropper from "../components/VideoCropper";
import { useCropVideo } from "../src/api";
import ThemedContainer from "../components/ThemedContainer";
import ThemedTextButton from "../components/ThemedTextButton";
import ThemedLoadingOverlay from "../components/ThemedLoadingOverlay";

export default function CropScreen() {
  const router = useRouter();
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { mutateAsync } = useCropVideo();

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Media library access is required.");
      }
    })();
  }, []);

  const pickVideo = async () => {
    try {
      setLoading(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["videos"],
        allowsEditing: false,
      });
      if (!result.canceled) {
        setVideoUri(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick video.");
    } finally {
      setLoading(false);
    }
  };

  const handleCrop = async (startTime: number, endTime: number) => {
    try {
      if (!videoUri) return;
      setLoading(true);
      const croppedUri = await mutateAsync({ videoUri, startTime, endTime });
      router.replace({
        pathname: "/metadata",
        params: { videoUri: croppedUri },
      });
    } catch (error) {
      Alert.alert("Cropping Error", "Failed to crop video.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedContainer style={styles.container}>
      {!videoUri ? (
        <ThemedTextButton title="Select Video" onPress={pickVideo} />
      ) : (
        <VideoCropper videoUri={videoUri} onCrop={handleCrop} />
      )}
      <ThemedLoadingOverlay visible={loading} />
    </ThemedContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
  },
});
