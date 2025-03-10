import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import useVideoStore from "../src/store";
import ThemedContainer from "../components/ThemedContainer";
import ThemedHeader from "../components/ThemedHeader";
import ThemedCard from "../components/ThemedCard";
import ThemedTextButton from "../components/ThemedTextButton";
import ThemedText from "../components/ThemedText";

export default function HomeScreen() {
  const router = useRouter();
  const videos = useVideoStore((state) => state.videos);

  const renderItem = ({ item }: { item: any }) => (
    <ThemedCard
      title={item.name}
      description={item.description}
      onPress={() => router.push(`/details/${item.id}`)}
    />
  );

  return (
    <ThemedContainer>
      <ThemedHeader title="Cropped Videos" />
      {videos.length === 0 ? (
        <ThemedContainer style={styles.emptyContainer}>
          <ThemedText>No videos cropped yet.</ThemedText>
        </ThemedContainer>
      ) : (
        <FlatList
          data={videos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
      <ThemedTextButton
        title="Add New Video"
        onPress={() => router.push("/crop")}
      />
    </ThemedContainer>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "400",
    color: "#6B7280",
    textAlign: "center",
    marginTop: 40,
  },
});
