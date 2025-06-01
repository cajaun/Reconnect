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

type HeaderControlsProps = {
  progress: SharedValue<number>;
};

const HeaderControls: React.FC<HeaderControlsProps> = ({ progress }) => {
  const { headerAnimatedStyle } = useLayoutAnimations(progress);

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
          paddingHorizontal: 24,
          position: "absolute",
          top: -20,
          left: 0,
          right: 0,
          zIndex: 1,
        },
        headerAnimatedStyle,
      ]}
    >
      <View className="flex-row justify-between">
        <View className="flex-row gap-x-8">
          <PressableScale
            onPress={() => openTray(0, contentMapStreak)}
            className="bg-[#F2F2F2] py-2 px-4 rounded-full flex-row gap-x-2 items-center justify-center"
          >
            <SymbolView name="flame.fill" tintColor={"black"} size={20} />
            <Text className="text-black text-xl font-bold">
              {" "}
              {currentStreak}
            </Text>
          </PressableScale>

          <PressableScale className="bg-[#F2F2F2] py-2 px-4 flex-row gap-x-2 items-center justify-center rounded-full">
            <SymbolView name="trophy.fill" tintColor={"black"} size={20} />
          </PressableScale>
        </View>

        <View className="flex-row gap-x-8">
          <PressableScale className="bg-[#F2F2F2] p-3 rounded-full">
            <SymbolView name="chart.bar.fill" tintColor={"black"} size={20} />
          </PressableScale>

          <PressableScale
            onPress={() => openTray(0, contentMapSettings)}
            className="bg-[#F2F2F2] p-3 rounded-full"
          >
            <SymbolView name="gearshape.fill" tintColor={"black"} size={20} />
          </PressableScale>
        </View>
      </View>
    </Animated.View>
  );
};

export default HeaderControls;
