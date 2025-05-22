import { StyleSheet, Text, View } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import Animated, {
  useDerivedValue,
  runOnJS,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { MiniPlayerHeight } from "./constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";

import PuzzleBoard from "../puzzle/puzzle-board";
import { SymbolView } from "expo-symbols";
import { PressableScale } from "../utils/pressable-scale";
import MistakesTracker from "../puzzle/mistakes";
import PuzzleControls from "../puzzle/puzzle-controls";
import { usePuzzleAnimations } from "@/hooks/use-puzzle-animations";

type SheetContentProps = {
  progress: SharedValue<number>;
  puzzleId: number;
  dayName: string;                   
  dayNumber: number | null;  
  monthName: string; 
};

const BaseOffset = (MiniPlayerHeight - 44) / 2;

export const SheetContent = ({
  progress,
  puzzleId,
  dayName,
  dayNumber,
  monthName,
}: SheetContentProps) => {
  const [isInteractive, setIsInteractive] = useState(false);

  useDerivedValue(() => {
    const active = progress.value > 0.95;
    runOnJS(setIsInteractive)(active);
    return active;
  });

  const { top: safeTop, } = useSafeAreaInsets();

  const EasingsUtils = {
    inOut: Easing.bezier(0.25, 0.1, 0.25, 1),
  };

  const {
    rContainerStyle,
    rKnobStyle,
    rDateStyle,
    rLeftButtonStyle,
    rRightButtonStyle,
    rMistakeStyle,
    rTopTextStyle,
    rControlsStyle,
    rBoardStyle,
    rPlayButtonStyle,
  } = usePuzzleAnimations({ progress, BaseOffset, safeTop });

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
        {dayName}
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
       {monthName} {dayNumber}
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
          onPress={() => console.log("Right button is being pressed")}
          className="w-16 h-16 rounded-full items-center bg-[#F2F2F2] justify-center"
        >
          <SymbolView
            name="gearshape.fill"
            tintColor={"black"}
            weight="bold"
            size={25}
          />
        </PressableScale>
      </Animated.View>

      <Animated.View
        style={[
          rBoardStyle,
          {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          },
        ]}
      >
        <PuzzleBoard
       
          interactive={isInteractive}
          progress={progress}
        />

        {!isInteractive && (
          <Animated.View
            style={[
              rPlayButtonStyle,
              {
                ...StyleSheet.absoluteFillObject,
                zIndex: 10,
                alignItems: "center",
                justifyContent: "center",
               
              },
            ]}
          >
            <PressableScale className="px-9 py-5 rounded-full bg-white flex-row gap-x-4 items-center" style={{}}>
              <SymbolView name="play.fill" tintColor={"black"} size={25} weight="bold"  />
              <Text className="text-black font-bold text-3xl">Play</Text>
            </PressableScale>
          </Animated.View>
        )}
        
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
    </Animated.View>
  );
};
