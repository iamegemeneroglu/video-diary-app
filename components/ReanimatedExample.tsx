import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";

export default function ReanimatedExample() {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withTiming(
      1.5,
      { duration: 1000, easing: Easing.out(Easing.exp) },
      () => {
        scale.value = withTiming(1, {
          duration: 1000,
          easing: Easing.out(Easing.exp),
        });
      }
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return <Animated.View style={[styles.box, animatedStyle]} />;
}

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: "#3B82F6",
    borderRadius: 10,
    alignSelf: "center",
    marginVertical: 20,
  },
});
