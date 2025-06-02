import React, { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { SymbolView } from "expo-symbols";
import TouchableBounce from "@/components/ui/utils/touchable-bounce";
import {
  getUnlockedDateInfo,
} from "@/utils/dates-manager";
import { usePuzzleCountdown } from "@/hooks/use-puzzle-countdown";

type PuzzleDateProps = {
  id: string;
  isSelected: boolean;
  startDate: string | null;
  itemWidth: number;
  onPress: () => void;
  // isComplete: boolean;
};

const PuzzleDate: React.FC<PuzzleDateProps> = ({
  id,
  isSelected,
  startDate,
  itemWidth,
  onPress,
  // isComplete,
}) => {

  const puzzleId = Number(id);


  const { dayName, dayNumber, unlockDate } = getUnlockedDateInfo(
    startDate,
    puzzleId,
    true
  );
  const { countdown, isNextToUnlock } = usePuzzleCountdown(startDate, puzzleId, unlockDate);

  const isFuture = unlockDate && unlockDate > new Date();



  if (isNextToUnlock && countdown) {
    return (
      <View
        style={{
          opacity: 0.3,
          width: itemWidth,
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 24,
        }}
      >
        <View className = "justify-center items-center">
          <Text className="font-semibold text-[#666666]">Next in </Text>
          <Text className="font-bold text-xl text-[#666666]">{countdown}</Text>
        </View>

        <View style={{
            marginTop: 2,

            padding: 6,
            alignItems: "center",
            justifyContent: "center",
          }}>
          <SymbolView name={"clock"} tintColor={"#666666"} size={20} weight="bold"/>
        </View>
      </View>
    );
  }

  return (
    <TouchableBounce
      style={{
        width: itemWidth,
        alignItems: "center",
        justifyContent: "center",
        opacity: isSelected ? 1 : 0.75,
       
      }}
      onPress={isFuture ? undefined : onPress}
    >
      <View
        className={
          isSelected
            ? "bg-[#F2F2F2] rounded-2xl py-3 px-5 justify-center items-center"
            : "justify-center items-center  py-4 px-6 rounded-2xl "
        }
      >
        <Text className="font-semibold ">{dayName}</Text>
        <Text className="font-bold text-3xl">{dayNumber}</Text>

        <View
          style={{
         
            padding: 6,
            borderRadius: 100,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SymbolView
            name={"circle.dotted"}
            tintColor="black"
            size={20}
          />
        </View>
      </View>
    </TouchableBounce>
  );
};

export default PuzzleDate;
