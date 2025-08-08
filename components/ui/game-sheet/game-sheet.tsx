import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { StyleSheet, useWindowDimensions } from "react-native";
import * as Haptics from 'expo-haptics';
import { SheetContent } from "./sheet-content";
import { GameSheetHeight } from "./constants";

import { allPuzzles } from "@/data/puzzle-data";

type GameSheetProps = {
  puzzle: (typeof allPuzzles)[number];
  progress: SharedValue<number>;
  dayName: string;
  dayNumber: number | null;
  monthName: string;
};

export const GameSheet = ({
  puzzle,
  progress,
  dayName,
  dayNumber,
  monthName,
}: GameSheetProps) => {
  const { height: windowHeight } = useWindowDimensions();

  const isTapped = useSharedValue(false);
  const progressThreshold = 0.8;
  const EasingsUtils = {
    inOut: Easing.bezier(0.25, 0.1, 0.25, 1),
  };
  const tapGesture = Gesture.Tap()
    .onBegin(() => {
      if (progress.value >= progressThreshold) {
        return;
      }
      isTapped.value = true;
    })
    .onTouchesUp(() => {
      if (progress.value >= progressThreshold) {
        return;
      }
 
      progress.value = withSpring( 1, {
        stiffness: 1000,  // ⬆️ High stiffness = faster acceleration
        damping: 60,      // ⬆️ Moderate damping = avoids excessive bounce
        mass: 1,          // ⚖️ Lower mass = faster movement      
      })
      
    })
    .onFinalize(() => {
      isTapped.value = false;
    });

  const panEnabled = useSharedValue(false);
  const panGesture = Gesture.Pan()
    .onBegin(() => {
      if (progress.value === 0) return;
      panEnabled.value = true;
    })
    .onUpdate((event) => {
      if (!panEnabled.value) return;

      const newProgress = interpolate(
        event.translationY,
        [0, windowHeight],
        [1, 0]
      );


      if (progress.value >= 1 && event.translationY < 0) return;

      progress.value = newProgress;
    })
    .onFinalize(() => {
      if (!panEnabled.value) return;
      panEnabled.value = false;
      progress.value = withTiming(progress.value > progressThreshold ? 1 : 0, {
        duration: 350,
        easing: EasingsUtils.inOut,
      });
    });

  const rSheetStyle = useAnimatedStyle(() => {
    const sheetHeight = interpolate(
      progress.value,
      [0, 1],
      [GameSheetHeight, windowHeight]
    );

    return {
      height: sheetHeight,
      position: "absolute",
      top: (windowHeight - sheetHeight) / 2,
     
      left: interpolate(progress.value, [0, 1], [26, 0]),
      right: interpolate(progress.value, [0, 1], [26, 0]),
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        ["white", "white"]
      ),
      borderColor: interpolateColor(
        progress.value,
        [0, 0.9, 1],
        ["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.1)", "transparent"]
      ),
      borderRadius: interpolate(progress.value, [0, 0.9, 1], [30, 48, 0]),
      borderWidth: interpolate(
        progress.value,
        [0, 0.9, 1],
        [StyleSheet.hairlineWidth, StyleSheet.hairlineWidth, 0]
      ),
      shadowOpacity: interpolate(progress.value, [0, 1], [0.2, 0.5]),
      transform: [
        {
          scale: withSpring(isTapped.value ? 0.98 : 1, {
            stiffness: 750, // lower for slower motion
            damping: 75,    // higher for less bounce
            restSpeedThreshold: 0.01, 
            restDisplacementThreshold: 0.01,
          }),
        },
      ],
    };
  });

  const gestures = Gesture.Simultaneous(tapGesture, panGesture);

  return (
    <GestureDetector gesture={gestures}>
      <Animated.View
        style={[
          rSheetStyle,
          {
            position: "absolute",
            borderCurve: "continuous",
            zIndex: 1000,
            shadowColor: "#222222",
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 16,
            borderWidth: StyleSheet.hairlineWidth,
          },
        ]}
      >
        <SheetContent
          key={puzzle.id}
          progress={progress}
          puzzleId={puzzle.id}
          dayName={dayName}
          dayNumber={dayNumber}
          monthName={monthName}
        />
      </Animated.View>
    </GestureDetector>
  );
};
