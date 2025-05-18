import { interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated";
import { interpolateColor } from "react-native-reanimated";

type UsePuzzleAnimationsProps = {
  progress: SharedValue<number>
  BaseOffset: number;
  safeTop: number;
};

export const usePuzzleAnimations = ({
  progress,
  BaseOffset,
  safeTop,
}: UsePuzzleAnimationsProps) => {
  
  const rContainerStyle = useAnimatedStyle(() => ({
    marginTop: interpolate(progress.value, [0, 1], [BaseOffset, 48]),
  }));

  const rKnobStyle = useAnimatedStyle(() => {
    const top = interpolate(progress.value, [0, 1], [-BaseOffset + 50, 40]);
    const translateY = interpolate(progress.value, [0, 1], [0, -25]);
    return {
      top,
      transform: [{ translateY }],
      alignSelf: "center",
      opacity: interpolate(progress.value, [0.6, 0.75], [0, 1]),
    };
  });

  const rDateStyle = useAnimatedStyle(() => {
    const fontSize = interpolate(progress.value, [0, 1], [25, 19]);
    const top = interpolate(
      progress.value,
      [0, 0.95],
      [-BaseOffset + 90, safeTop - 17]
    );
    const color = interpolateColor(progress.value, [0, 1], ["#BFBFBF", "#000000"]);

    return {
      fontSize,
      top,
      alignSelf: "center",
      opacity: interpolate(progress.value, [0, 0.95], [1, 1]),
      color,
    };
  });

  const rLeftButtonStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.6], [0, 1]),
    transform: [
      { translateX: interpolate(progress.value, [0, 1], [-2, 0]) },
      { scale: interpolate(progress.value, [0.75, 1], [0.95, 1]) },
    ],
    position: "absolute",
    top: interpolate(progress.value, [0, 0.95], [-BaseOffset + 90, safeTop - 20]),
    left: 16,
    zIndex: 1002,
  }));

  const rRightButtonStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.6], [0, 1]),
    transform: [
      { translateX: interpolate(progress.value, [0, 1], [2, 0]) },
      { scale: interpolate(progress.value, [0.75, 1], [0.95, 1]) },
    ],
    position: "absolute",
    top: interpolate(progress.value, [0, 0.95], [-BaseOffset + 90, safeTop - 20]),
    right: 16,
    zIndex: 1002,
  }));

  const rMistakeStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(progress.value, [0.75, 1], [0.95, 1]) }],
    position: "absolute",
    top: interpolate(progress.value, [0, 0.95], [-BaseOffset + 120, safeTop - 4]),
  }));

  const rTopTextStyle = useAnimatedStyle(() => {
    const top = interpolate(progress.value, [0, 1], [-BaseOffset + 50, 40]);
    const translateY = interpolate(progress.value, [0, 1], [0, -25]);
    const opacity = interpolate(progress.value, [0, 0.6], [1, 0]);
    return {
      top,
      fontSize: interpolate(progress.value, [0, 1], [30, 3]),
      marginTop: interpolate(progress.value, [0, 1], [0, -24]),
      transform: [{ translateY }],
      alignSelf: "center",
      opacity,
    };
  });

  const rControlsStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0.6, 1], [0, 1]),
    transform: [{ scale: interpolate(progress.value, [0.6, 1], [0.95, 1]) }],
    position: "absolute",
    bottom: interpolate(progress.value, [0.6, 1], [-BaseOffset + 265, safeTop]),
    left: 0,
    zIndex: 1002,
  }));

  const rBoardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(progress.value, [0, 1], [0.7, 1]) }],
    bottom: interpolate(progress.value, [0, 1], [BaseOffset - 165, 0]),
  }));

  return {
    rContainerStyle,
    rKnobStyle,
    rDateStyle,
    rLeftButtonStyle,
    rRightButtonStyle,
    rMistakeStyle,
    rTopTextStyle,
    rControlsStyle,
    rBoardStyle,
  };
};
