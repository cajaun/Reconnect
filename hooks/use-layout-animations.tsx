import { interpolate, useAnimatedStyle } from "react-native-reanimated";

export function useLayoutAnimations(progress: { value: number }) {
  const listAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(progress.value, [0, 0.65], [0, 100]);
    const opacity = interpolate(progress.value, [0, 0.5, 1], [1, 0.2, 0]);

    return {
      transform: [{ translateY }],
      opacity,
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(progress.value, [0.75, 0], [0, 100]);
    const opacity = interpolate(progress.value, [0, 0.5, 1], [1, 0.2, 0]);

    return {
      transform: [{ translateY }],
      opacity,
    };
  });


  const rScreenStyle = useAnimatedStyle(() => ({
    borderRadius: interpolate(progress.value, [0, 1], [0, 48]),
    borderCurve: "continuous",

  }));

  return { listAnimatedStyle, headerAnimatedStyle, rScreenStyle };
}
