import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface VideoItem {
  id: number;
  videoUri: string;
  name: string;
  description: string;
}

type VideoStore = {
  videos: VideoItem[];
  addVideo: (video: VideoItem) => void;
  updateVideo: (id: number, data: Partial<VideoItem>) => void;
};

const useVideoStore = create<VideoStore>()(
  persist(
    (set) => ({
      videos: [],
      addVideo: (video: VideoItem) =>
        set((state) => ({ videos: [...state.videos, video] })),
      updateVideo: (id: number, data: Partial<VideoItem>) =>
        set((state) => ({
          videos: state.videos.map((video) =>
            video.id === id ? { ...video, ...data } : video
          ),
        })),
    }),
    {
      name: "video-store",
      getStorage: () => AsyncStorage,
    }
  )
);

export default useVideoStore;
