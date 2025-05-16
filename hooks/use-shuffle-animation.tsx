import { useRef, useEffect } from "react";
import { Animated, Easing } from "react-native";

const TILE_SIZE = 25; // 25% of the container
const DURATION = 325; // Matches 0.5s CSS transition

const useShuffleAnimation = (location: number) => {
  const row = Math.floor(location / 4);
  const col = location % 4;

  const animatedTop = useRef(new Animated.Value(row * TILE_SIZE)).current;
  const animatedLeft = useRef(new Animated.Value(col * TILE_SIZE)).current;

  useEffect(() => {
    // Stop any ongoing animations before starting a new one
    animatedTop.stopAnimation();
    animatedLeft.stopAnimation();

    Animated.parallel([
      Animated.timing(animatedTop, {
        toValue: row * TILE_SIZE,
        duration: DURATION,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }),
      Animated.timing(animatedLeft, {
        toValue: col * TILE_SIZE,
        duration: DURATION,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }),
    ]).start();
  }, [row, col]);

  return {
    row,
    animatedStyle: {
      top: animatedTop.interpolate({ inputRange: [0, 100], outputRange: ["0%", "100%"] }),
      left: animatedLeft.interpolate({ inputRange: [0, 100], outputRange: ["0%", "100%"] }),
    },
  };
};

export default useShuffleAnimation;
