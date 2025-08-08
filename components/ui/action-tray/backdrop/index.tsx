import React from "react";
import Animated, {
  SharedValue,
  useAnimatedProps,
  useAnimatedStyle,
} from "react-native-reanimated";
import { StyleSheet } from "react-native";

type BackdropProps = {
  onTap: () => void;
  isActive: SharedValue<boolean>;
  progress: SharedValue<number>;
};

const Backdrop: React.FC<BackdropProps> = React.memo(
  ({ isActive, onTap, progress }) => {
    const rBackdropStyle = useAnimatedStyle(() => {
      return {
        backgroundColor: `rgba(0, 0, 0, ${0.2 * progress.value})`,
      };
    }, [progress]);

    const rBackdropProps = useAnimatedProps(() => {
      return {
        pointerEvents: progress.value > 0 ? "auto" : "none",
      } as any;
    }, []);

    return (
      <Animated.View
        onTouchStart={onTap}
        animatedProps={rBackdropProps}
        style={[
          StyleSheet.absoluteFillObject, // fills screen
          rBackdropStyle,                // dynamically controlled alpha
        ]}
      />
    );
  }
);

export { Backdrop };
