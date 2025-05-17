import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import type { SharedValue } from "react-native-reanimated";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  runOnJS,
  withTiming,
  Easing,
  interpolateColor,
} from "react-native-reanimated";

import { MiniPlayerHeight } from "./constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMemo, useState } from "react";
import { allPuzzles } from "@/utils/puzzle-data";
import { shuffle } from "@/utils/puzzle-utils";
import { PuzzleContextProvider } from "@/context/puzzle-context";
import PuzzleBoard from "../../puzzle/puzzle-board";
import MockPuzzleBoard from "../../puzzle/mock-board";
import { SymbolView } from "expo-symbols";
import { PressableScale } from "../../utils/pressable-scale";
import MistakesTracker from "../../puzzle/mistakes";
import PuzzleControls from "../../puzzle/puzzle-controls";

type SheetContentProps = {
  progress: SharedValue<number>;
  title: string;
  subtitle: string;
  imageUrl: string;
};

const BaseOffset = (MiniPlayerHeight - 44) / 2;

export const SheetContent = ({
  progress,
  title,
  subtitle,
}: SheetContentProps) => {
  const puzzleId = "0";
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(
    parseInt(puzzleId)
  );

  const currentPuzzle = useMemo(
    () => allPuzzles[currentPuzzleIndex],
    [currentPuzzleIndex]
  );
  const shuffledWords = useMemo(
    () => shuffle(currentPuzzle.words),
    [currentPuzzle.words]
  );

  const [showBoard, setShowBoard] = useState(false);
  const safeTop = useSafeAreaInsets().top;

  // Derived value listener instead of progress.addListener
  useDerivedValue(() => {
    if (progress.value > 0.95 && !showBoard) {
      runOnJS(setShowBoard)(true);
    } else if (progress.value <= 0.95 && showBoard) {
      runOnJS(setShowBoard)(false);
    }
  }, [progress, showBoard]);

  const EasingsUtils = {
    inOut: Easing.bezier(0.25, 0.1, 0.25, 1),
  };

  const rContainerStyle = useAnimatedStyle(() => ({
    marginTop: interpolate(progress.value, [0, 1], [BaseOffset, 48]),
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
    const color = interpolateColor(
      progress.value,
      [0, 1],
      ["#BFBFBF", "#000000"]
    );

    return {
      fontSize,
      top,
      alignSelf: "center",
      opacity: interpolate(progress.value, [0, 0.95], [1, 1]),
      color, // Animated color
    };
  });

  const rBoardStyle = useAnimatedStyle(() => {
    const shouldShow = progress.value > 0.6;
    return {
      opacity: interpolate(progress.value, [0.6, 1], [0, 1]),
      transform: [{ scale: interpolate(progress.value, [0.6, 1], [0.75, 1]) }],
      display: shouldShow ? "flex" : "none",
    };
  });

  const rLeftButtonStyle = useAnimatedStyle(() => {
    const leftButtonOpacity = interpolate(progress.value, [0, 0.6], [0, 1]);
    const leftButtonTranslateX = interpolate(progress.value, [0, 1], [-2, 0]);
    return {
      opacity: leftButtonOpacity,
      transform: [
        { translateX: leftButtonTranslateX },
        { scale: interpolate(progress.value, [0.75, 1], [0.95, 1]) },
      ],
      position: "absolute",
      top: interpolate(
        progress.value,
        [0, 0.95],
        [-BaseOffset + 90, safeTop - 20]
      ),
      left: 16,
      right: 16,
      zIndex: 1002,
    };
  });

  const rRightButtonStyle = useAnimatedStyle(() => {
    const rightButtonOpacity = interpolate(progress.value, [0, 0.6], [0, 1]);
    const rightButtonTranslateX = interpolate(progress.value, [0, 1], [2, 0]);
    return {
      opacity: rightButtonOpacity,
      transform: [
        { translateX: rightButtonTranslateX },
        { scale: interpolate(progress.value, [0.75, 1], [0.95, 1]) },
      ],
      position: "absolute",
      top: interpolate(
        progress.value,
        [0, 0.95],
        [-BaseOffset + 90, safeTop - 20]
      ),
      right: 16, // Position it on the far right
      zIndex: 1002, // Ensure it's above the sheet and knob
    };
  });

  const rMistakeStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: interpolate(progress.value, [0.75, 1], [0.95, 1]) }],
      position: "absolute",
      top: interpolate(
        progress.value,
        [0, 0.95],
        [-BaseOffset + 120, safeTop - 4]
      ),
    };
  });

  const rControlsStyle = useAnimatedStyle(() => {
    const controlsOpacity = interpolate(progress.value, [0, 0.6], [0, 1]);

    return {
      opacity: controlsOpacity,
      transform: [{ scale: interpolate(progress.value, [0.75, 1], [0.95, 1]) }],
      position: "absolute",
      bottom: interpolate(
        progress.value,
        [0, 0.95],
        [-BaseOffset + 250, safeTop]
      ),
      left: 0,
      zIndex: 1002,
    };
  });

  return (
    <Animated.View
      style={[
        rContainerStyle,
        { flex: 1, width: "100%", justifyContent: "flex-start" },
      ]}
    >
      <Animated.View
        style={[
          rKnobStyle,
          {
            top: safeTop + 8,
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            zIndex: 1001,
          },
          ,
        ]}
      >
        <View
          style={{
            width: 56,
            height: 7,
            borderRadius: 36,
            backgroundColor: "#DFDFDF",
          }}
        />
      </Animated.View>

      <PuzzleContextProvider
        puzzle={currentPuzzle}
        initialShuffle={shuffledWords}
      >
        <Animated.Text
          style={[
            rTopTextStyle,
            {
              color: "black",
              fontWeight: "bold",
              textAlign: "center",
              position: "absolute",
              zIndex: 10,
              width: "100%",
            },
          ]}
        >
          Thursday
        </Animated.Text>

        <Animated.Text
          style={[
            rDateStyle,
            {
              textAlign: "center",
              position: "absolute",
              zIndex: 9,
              width: "100%",
              fontWeight: "bold",
            },
          ]}
        >
          May 15
        </Animated.Text>

        <Animated.View
          style={[
            rMistakeStyle,
            {
              position: "absolute",
              zIndex: 9,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <MistakesTracker />
        </Animated.View>

        <Animated.View style={[rLeftButtonStyle]}>
          <PressableScale
            onPress={() => {
              progress.value = withTiming(0, {
                duration: 350,
                easing: EasingsUtils.inOut,
              });
            }}
            className="w-16 h-16 rounded-full items-center bg-[#F2F2F2] justify-center "
          >
            <SymbolView
              name="chevron.down"
              tintColor={"black"}
              weight="bold"
              size={25}
            />
          </PressableScale>
        </Animated.View>

        <Animated.View style={[rRightButtonStyle]}>
          <PressableScale
            onPress={() => console.log("Left button is being pressed")}
            className="w-16 h-16 rounded-full items-center bg-[#F2F2F2] justify-center"
          >
            <SymbolView name="gearshape.fill" tintColor={"black"} weight="bold" size={25} />
          </PressableScale>
        </Animated.View>

        <Animated.View
          style={[
            rBoardStyle,
            {
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
            },
          ]}
        >
          <PuzzleBoard />
        </Animated.View>

        <Animated.View
          style={[
            rControlsStyle,
            {
              position: "absolute",
              zIndex: 9,
              width: "100%",
              alignItems: "center",
            },
          ]}
        >
          <PuzzleControls />
        </Animated.View>
      </PuzzleContextProvider>
    </Animated.View>
  );
};
