import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import {  StyleSheet, useWindowDimensions, } from "react-native";

import { GameSheetMutableProgress } from "./shared-progress";

import { SheetContent } from "./sheet-content";
import { MiniPlayerHeight } from "./constants";

import { PuzzleContextProvider } from "@/context/puzzle-context";
import { useMemo, useState } from "react";
import { shuffle } from "@/utils/puzzle-utils";
import { allPuzzles } from "@/utils/puzzle-data";

type GameSheetProps = {
  puzzle: (typeof allPuzzles)[number]; // or Puzzle if you defined a type
};

export const GameSheet = ({ puzzle }: GameSheetProps) => {
  const { height: windowHeight } = useWindowDimensions();
  const progress = GameSheetMutableProgress;

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

      progress.value = withTiming(1, {
        duration: 200,
        easing: EasingsUtils.inOut,
      });
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

      // If fully expanded and user swipes up (i.e., negative translation), block it
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
      [MiniPlayerHeight, windowHeight]
    );

    return {
      height: sheetHeight,
      position: "absolute",
      top: (windowHeight - sheetHeight) / 2,
      left: interpolate(progress.value, [0, 1], [16, 0]),
      right: interpolate(progress.value, [0, 1], [16, 0]),
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
      borderRadius: interpolate(progress.value, [0, 0.9, 1], [28, 48, 0]),
      borderWidth: interpolate(
        progress.value,
        [0, 0.9, 1],
        [StyleSheet.hairlineWidth, StyleSheet.hairlineWidth, 0]
      ),
      shadowOpacity: interpolate(progress.value, [0, 1], [0.2, 0.5]),
      transform: [
        {
          scale: withTiming(isTapped.value ? 0.98 : 1, {
            easing: EasingsUtils.inOut,
          }),
        },
      ],
    };
  });

  const currentPuzzle = puzzle;
  const shuffledWords = useMemo(() => shuffle(puzzle.words), [puzzle.words]);

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
        <PuzzleContextProvider
          key={puzzle.id}
          puzzle={currentPuzzle}
          initialShuffle={shuffledWords}
        >
          <SheetContent
            key={puzzle.id}
            puzzleId={puzzle.id}
            progress={progress}
            title="Happiness does not wait"
            subtitle="Ólafur Arnalds"
            imageUrl="https://i3.ytimg.com/vi/BgO08T3E4LE/maxresdefault.jpg"
          />
        </PuzzleContextProvider>
      </Animated.View>
    </GestureDetector>
  );
};
