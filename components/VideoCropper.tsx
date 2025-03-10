import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Animated,
  Alert,
  ScrollView,
} from "react-native";
import { Video, AVPlaybackStatus, ResizeMode } from "expo-av";
import * as VideoThumbnails from "expo-video-thumbnails";

interface VideoCropperProps {
  videoUri: string;
  onCrop: (startTime: number, endTime: number) => void;
}

const segmentLength = 5;
const cropBoxWidth = 200; 
const thumbnailWidth = 80; 
const gap = 0; 

export default function VideoCropper({ videoUri, onCrop }: VideoCropperProps) {
  const [duration, setDuration] = useState(0);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [containerWidth, setContainerWidth] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [selectedStart, setSelectedStart] = useState(0);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);

  const videoRef = useRef<Video>(null);

  
  const contentWidth = thumbnails.length * (thumbnailWidth + gap);

  const handleLoad = (status: AVPlaybackStatus) => {
    if (
      "isLoaded" in status &&
      status.isLoaded &&
      typeof status.durationMillis === "number"
    ) {
      const totalSec = status.durationMillis / 1000;
      setDuration(totalSec);
      if (totalSec < segmentLength) {
        Alert.alert("Video Too Short", "Video must be longer than 5 seconds!");
      }
    } else {
      console.error(
        "Video not loaded properly or duration not available",
        status
      );
    }
  };

  const generateThumbnails = async () => {
    try {
      const FRAMES_COUNT = 20;
      const step = duration / FRAMES_COUNT;
      const thumbs: string[] = [];
      for (let i = 0; i < FRAMES_COUNT; i++) {
        const timeInMs = Math.floor(i * step * 1000);
        const { uri } = await VideoThumbnails.getThumbnailAsync(videoUri, {
          time: timeInMs,
        });
        thumbs.push(uri);
      }
      setThumbnails(thumbs);
    } catch (error) {
      console.log("Error generating thumbnails", error);
    }
  };

  useEffect(() => {
    if (duration > 0) {
      generateThumbnails();
    }
  }, [videoUri, duration]);

  useEffect(() => {
    const listener = scrollX.addListener(({ value }) => {
      const centerPosition = value + containerWidth / 2;
      const centerTime = (centerPosition / contentWidth) * duration;
      let newStart = centerTime - segmentLength / 2;
      if (newStart < 0) newStart = 0;
      if (newStart + segmentLength > duration)
        newStart = duration - segmentLength;
      setSelectedStart(newStart);
    });
    return () => {
      scrollX.removeListener(listener);
    };
  }, [containerWidth, contentWidth, duration]);

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded && status.positionMillis !== undefined) {
      setCurrentPlaybackTime(status.positionMillis / 1000);
    }
  };

  const markerPosition =
    currentPlaybackTime < selectedStart
      ? 0
      : currentPlaybackTime > selectedStart + segmentLength
      ? cropBoxWidth
      : ((currentPlaybackTime - selectedStart) / segmentLength) * cropBoxWidth;

  const handleCropPress = () => {
    onCrop(selectedStart, selectedStart + segmentLength);
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{ uri: videoUri }}
        style={styles.video}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        onLoad={handleLoad}
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
      />
      <View style={styles.timeInfo}>
        <Text style={styles.timeText}>Start: {selectedStart.toFixed(2)}s</Text>
        <Text style={styles.timeText}>
          End: {(selectedStart + segmentLength).toFixed(2)}s
        </Text>
      </View>
      <View
        style={styles.scrollContainer}
        onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
      >
        <Animated.ScrollView
          horizontal
          bounces={false}
          overScrollMode="never"
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: (containerWidth - cropBoxWidth) / 2,
          }}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
        >
          {thumbnails.map((thumb, idx) => (
            <Image key={idx} source={{ uri: thumb }} style={styles.thumbnail} />
          ))}
        </Animated.ScrollView>
        <View
          style={[styles.cropBox, { width: cropBoxWidth }]}
          pointerEvents="none"
        >
          <Animated.View
            style={[styles.whiteMarker, { left: markerPosition }]}
            pointerEvents="none"
          />
        </View>
      </View>
      <TouchableOpacity style={styles.cropButton} onPress={handleCropPress}>
        <Text style={styles.cropButtonText}>Crop Video</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  video: {
    width: "100%",
    height: "75%",
    backgroundColor: "black",
    borderRadius: 10,
  },
  timeInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  timeText: { fontSize: 16, color: "#333", fontWeight: "500" },
  scrollContainer: { height: 60, position: "relative" },
  thumbnail: {
    width: thumbnailWidth,
    height: 60,
    marginRight: gap,
    borderRadius: 5,
  },
  cropBox: {
    position: "absolute",
    top: 0,
    left: "50%",
    right: "50%",
    marginLeft: -cropBoxWidth / 2,
    height: 60,
    borderWidth: 3,
    borderStartWidth: 8,
    borderEndWidth: 8,
    borderColor: "#FFD700",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  whiteMarker: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: "white",
  },
  cropButton: {
    backgroundColor: "green",
    paddingVertical: 15,
    marginTop: 20,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  cropButtonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
  },
});
