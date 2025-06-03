import React from "react";
import { Pressable, View } from "react-native";
import { SymbolView } from "expo-symbols";
import { router } from "expo-router";

interface StreakIconProps {
  day: number;
  year: number;
  month: number;
  isCompleted: boolean;
  isLocked: boolean;
}

const StreakIcon: React.FC<StreakIconProps> = ({
  day,
  year,
  month,
  isCompleted,
  isLocked,
}) => {
  const dateStr = new Date(year, month, day).toISOString().split("T")[0];

  const handlePress = () => {
    router.push(`/${dateStr}`);
  };

  if (isLocked) {
    return (
      <View

      style={{
        width: 30,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SymbolView
        tintColor={"#DFDFDF"}
        size={22}
        name={"xmark.circle.fill"}
      />
    </View>
    )
  }

  return (
    <Pressable
      onPress={handlePress}
      style={{
        width: 30,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SymbolView
        tintColor={isCompleted ? "black" : "#BFBFBF"}
        size={22}
        name={isCompleted ? "checkmark.circle.fill" : "circle.dotted"}
      />
    </Pressable>
  );
};

export default React.memo(StreakIcon);
