import { useEffect } from "react";
import { Easing } from "react-native-reanimated";
import {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";

const TILE_SIZE = 25; // 25% of the container
const DURATION = 325;

const useShuffleAnimation = (location: number) => {
  const row = Math.floor(location / 4);
  const col = location % 4;

  const animatedTop = useSharedValue(row * TILE_SIZE);
  const animatedLeft = useSharedValue(col * TILE_SIZE);

  useEffect(() => {
    animatedTop.value = withTiming(row * TILE_SIZE, {
      duration: DURATION,
      easing: Easing.inOut(Easing.ease),
    });
    animatedLeft.value = withTiming(col * TILE_SIZE, {
      duration: DURATION,
      easing: Easing.inOut(Easing.ease),
    });
  }, [row, col]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: `${animatedTop.value}%`,
      left: `${animatedLeft.value}%`,
    };
  });

  return {
    row,
    animatedStyle,
  };
};

export default useShuffleAnimation;
