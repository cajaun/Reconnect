import React from "react";
import { View, Text } from "react-native";
import Animated from "react-native-reanimated";
import { SymbolView } from "expo-symbols";
import { PressableScale } from "./ui/utils/pressable-scale";
import Streak, { streakMap } from "./ui/action-tray/content/streak";
import { useActionTray } from "@/context/action-tray-context";
import { useLayoutAnimations } from "@/hooks/use-layout-animations";
import { SharedValue } from "react-native-reanimated/lib/typescript/commonTypes";
import { usePuzzle } from "@/context/puzzle-context";
import { settingsMap } from "./ui/action-tray/content/settings";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type HeaderControlsProps = {
  progress: SharedValue<number>;
};

const HeaderControls: React.FC<HeaderControlsProps> = ({ progress }) => {
  const { headerAnimatedStyle } = useLayoutAnimations(progress);
  const {top} = useSafeAreaInsets()
  const { openTray, closeTray } = useActionTray();

  const { currentStreak, longestStreak, completedDatesSet } = usePuzzle();
  // console.log(completedDatesSet);
  const contentMapStreak = React.useMemo(() => {
    return {
      0: (
        <Streak
          currentStreak={currentStreak}
          longestStreak={longestStreak}
          completedDatesSet={completedDatesSet}
        />
      ),
    };
  }, [openTray, closeTray, currentStreak, longestStreak]);

  const contentMapSettings = React.useMemo(() => {
    let map: Record<number, React.ReactNode> = {};
    map = settingsMap((step) => openTray(step, map), closeTray, map);
    return map;
  }, [openTray, closeTray]);

  return (
    <Animated.View
      style={[
        {
          paddingHorizontal: 26,
          position: "absolute",
          top: -top + 8,
          left: 0,
          right: 0,
          zIndex: 1,
        },
        headerAnimatedStyle,
      ]}
    >
      <View className="flex-row justify-between">
        <View className="flex-row gap-x-4">
          <PressableScale
            onPress={() => openTray(0, contentMapStreak)}
            className="bg-[#F2F2F2] w-[52px] h-[52px] rounded-full flex-row gap-x-2 items-center justify-center  "
          >
            <SymbolView name="flame.fill" tintColor={"black"} size={23} />
            <Text className="text-black text-xl font-bold">
              {" "}
              {currentStreak}
            </Text>
          </PressableScale>

          <PressableScale className="bg-[#F2F2F2] w-[52px] h-[52px]  flex-row gap-x-2 items-center justify-center rounded-full">
            <SymbolView name="trophy.fill" tintColor={"black"} size={23} />
          </PressableScale>
        </View>

        <View className="flex-row gap-x-4">
          <PressableScale className="bg-[#F2F2F2] w-[52px] h-[52px]  rounded-full  items-center justify-center">
            <View>

          
            <SymbolView name="chart.bar.fill" tintColor={"black"} size={23} />
            </View>
          </PressableScale>

          <PressableScale
            onPress={() => openTray(0, contentMapSettings)}
            className="bg-[#F2F2F2] w-[52px] h-[52px]  rounded-full items-center justify-center"
          >
            <SymbolView name="gearshape.fill" tintColor={"black"} size={23} />
          </PressableScale>
        </View>
      </View>
    </Animated.View>
  );
};

export default HeaderControls;
