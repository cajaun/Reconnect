import React from "react";
import { View, Text } from "react-native";
import { SymbolView } from "expo-symbols";
import TouchableBounce from "@/components/ui/utils/touchable-bounce";
import { calculateUnlockDate, getUnlockedDateInfo } from "@/utils/dates-manager";

type PuzzleDateProps = {
  id: string;
  isSelected: boolean;
  startDate: string | null;
  itemWidth: number;
  onPress: () => void;
};

const PuzzleDate: React.FC<PuzzleDateProps> = ({
  id,
  isSelected,
  startDate,
  itemWidth,
  onPress,
}) => {
  const { dayName, dayNumber} = getUnlockedDateInfo(startDate, Number(id), true );

  return (
    <TouchableBounce
      style={{
        width: itemWidth,
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={onPress}
    >
      <View
        className={
          isSelected
            ? "bg-[#F2F2F2] rounded-2xl py-4 px-6 justify-center items-center"
            : "justify-center items-center"
        }
      >
        <Text className="font-semibold text-[#666666]">{dayName}</Text>
        <Text className="font-bold text-3xl">{dayNumber}</Text>

        <View
          style={{
            marginTop: 8,
            backgroundColor: "#F2F2F2",
            padding: 6,
            borderRadius: 100,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SymbolView
            name={isSelected ? "checkmark.circle.fill" : "circle.dotted"}
            tintColor="black"
            size={20}
          />
        </View>
      </View>
    </TouchableBounce>
  );
};

export default PuzzleDate;
