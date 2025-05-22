import { useEffect } from "react";
import { useSharedValue, withTiming, useAnimatedStyle } from "react-native-reanimated";

type ShuffleAnimationParams = {
  row: number;
  col: number;
  duration?: number;
};

const useShuffleAnimation = ({ row, col, duration = 325 }: ShuffleAnimationParams) => {
  const animatedRow = useSharedValue(row);
  const animatedCol = useSharedValue(col);

  useEffect(() => {
    animatedRow.value = withTiming(row, { duration });
    animatedCol.value = withTiming(col, { duration });
  }, [row, col, duration]);

  const animatedStyle = useAnimatedStyle(() => ({
    top: `${animatedRow.value * 25}%`,
    left: `${animatedCol.value * 25}%`,
  }));

  return animatedStyle;
};

export default useShuffleAnimation;
