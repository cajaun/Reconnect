import React from "react";
import Animated, {
  Easing,
  SharedValue,
  useAnimatedProps,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { StyleSheet } from "react-native";

type BackdropProps = {
  onTap: () => void;
  isActive: SharedValue<boolean>;
};

const Backdrop: React.FC<BackdropProps> = React.memo(({ isActive, onTap }) => {
  const rBackdropStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isActive.value ? 1 : 0, {
        duration: 350,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
      }),
    };
  }, [isActive]);

  const rBackdropProps = useAnimatedProps(() => {
    return {
      pointerEvents: isActive.value ? "auto" : "none",
    } as any;
  }, []);

  return (
    <Animated.View
      onTouchStart={onTap}
      animatedProps={rBackdropProps}
      style={[
        {
          ...StyleSheet.absoluteFillObject,
          backgroundColor: "rgba(0,0,0,0.2)",
        },
        rBackdropStyle,
      ]}
    />
  );
});

export { Backdrop };
