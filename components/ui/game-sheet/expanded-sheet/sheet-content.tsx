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
    const top = interpolate(progress.value, [0, 1], [-BaseOffset + 50, 50]);
    const translateY = interpolate(progress.value, [0, 1], [0, -25]);
    const opacity = interpolate(progress.value, [0, 0.6], [1, 0]);
    return {
      top,
      fontSize: interpolate(progress.value, [0, 1], [30, 20]),
      marginTop: interpolate(progress.value, [0, 1], [0, -24]),
      transform: [{ translateY }],
      alignSelf: "center",
      opacity,
    };
  });

    const rKnobStyle = useAnimatedStyle(() => {
    const top = interpolate(progress.value, [0, 1], [-BaseOffset + 50, 50]);
    const translateY = interpolate(progress.value, [0, 1], [0, -25]);
  
    return {
      top,
      transform: [{ translateY }],
      alignSelf: "center",
      opacity: interpolate(progress.value, [0.6, 0.75], [0, 1]), 
    };
  });

  const rDateStyle = useAnimatedStyle(() => {
    const fontSize = interpolate(progress.value, [0, 1], [25, 20]);
    const top = interpolate(progress.value, [0, 0.95], [-BaseOffset + 90, safeTop - 30]);
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [ '#DFDFDF','#000000', ]
    );
  
    return {
      fontSize,
      top,
      alignSelf: 'center',
      opacity: interpolate(progress.value, [0, 0.95], [1, 1]),
      color, // Animated color
    };
  });

  const rBoardStyle = useAnimatedStyle(() => {
    const shouldShow = progress.value > 0.75;
    return {
      opacity: interpolate(progress.value, [0.75, 1], [0, 1]),
      transform: [{ scale: interpolate(progress.value, [0.75, 1], [0.8, 1]) }],
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
        [-BaseOffset + 90, safeTop - 40]
      ),
      left: 16, 
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
        [-BaseOffset + 90, safeTop - 40]
      ),
      right: 16, // Position it on the far right
      zIndex: 1002, // Ensure it's above the sheet and knob
    };
  });



  return (
    <Animated.View style={[rContainerStyle, styles.container]}>

<Animated.View
          style={[
            rKnobStyle,
            {
              top: safeTop + 8,
            },
            styles.knobContainer,
          ]}
        >
          <View style={styles.knob} />
        </Animated.View>

      <Animated.Text style={[rTopTextStyle, styles.topText]}>
        Thursday
      </Animated.Text>

      <Animated.Text style={[rDateStyle, styles.dateText]}>
        May 15
      </Animated.Text>

      {/* Left Button */}
      <Animated.View style={[rLeftButtonStyle]}>
        <PressableScale
          onPress={() => {
            progress.value = withTiming(0, {
              duration: 350,
              easing: EasingsUtils.inOut,
            });
          }}
          className="w-12 h-12 rounded-full items-center bg-[#DFDFDF] justify-center"
        >
          <SymbolView name="chevron.down" tintColor={"black"} weight="semibold"  />
        </PressableScale>
      </Animated.View>
      {/* Right Button */}
      <Animated.View style={[rRightButtonStyle]}>
        <PressableScale
          onPress={() => console.log("Left button is being pressed")}
          className="w-12 h-12 rounded-full items-center bg-[#DFDFDF] justify-center"
        >
          <SymbolView name="gearshape.fill" tintColor={"black"} />
        </PressableScale>
      </Animated.View>

      <Animated.View style={[rBoardStyle, styles.boardWrapper]}>
        <PuzzleContextProvider
          puzzle={currentPuzzle}
          initialShuffle={shuffledWords}
        >
          <PuzzleBoard />
        </PuzzleContextProvider>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start", // Ensure content starts at the top
  },
  topText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    position: "absolute",
    zIndex: 10,
    width: "100%",
  },
  dateText: {
    textAlign: "center",
    position: "absolute",
    zIndex: 9,
    width: "100%",
    fontWeight: "bold",
  },
  leftButton: {
    flex: 1,
    alignItems: "flex-start", // Align to the left
  },
  rightButton: {
    flex: 1,
    alignItems: "flex-end", // Align to the right
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#ddd",
    borderRadius: 20,
  },
  boardWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  knobContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    zIndex: 1001,
  },
  knob: {
    width: 48,
    height: 4,
    borderRadius: 36,
    backgroundColor: '#DFDFDF',
  },
});
