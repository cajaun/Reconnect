import { useRef, useEffect } from "react";
import { Animated } from "react-native";

const useShuffleAnimation = (location: number) => {
  const row = Math.floor(location / 4);
  const col = location % 4;

  const animatedTop = useRef(new Animated.Value(row * 25)).current;
  const animatedLeft = useRef(new Animated.Value(col * 25)).current;

  useEffect(() => {
    Animated.timing(animatedTop, {
      toValue: row * 25,
      duration: 400,
      useNativeDriver: false,
    }).start();

    Animated.timing(animatedLeft, {
      toValue: col * 25,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [row, col]);

  return {
    row: row,
    animatedStyle: {
      top: animatedTop.interpolate({ inputRange: [0, 100], outputRange: ["0%", "100%"] }),
      left: animatedLeft.interpolate({ inputRange: [0, 100], outputRange: ["0%", "100%"] }),
    },
  };
};

export default useShuffleAnimation;
