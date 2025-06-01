import { usePuzzle } from "@/context/puzzle-context";
import { getStartDate } from "@/storage/puzzle-init";
import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, Dimensions } from "react-native";
import TrayHeader from "./tray-header";
import { getAllPuzzleData } from "@/storage/puzzle-data";
import { getFormattedDate } from "@/utils/dates-manager";

export function streakMap(currentStreak: number, longestStreak: number, completedDatesSet: Set<string>) {
  return {
    0: <Streak currentStreak={currentStreak} longestStreak={longestStreak} completedDatesSet={completedDatesSet} />,
  };
}

interface StreakProps {
  currentStreak: number;
  longestStreak: number;
  completedDatesSet: Set<string>;
}

const Streak: React.FC<StreakProps> = ({ currentStreak, longestStreak, completedDatesSet }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [months, setMonths] = useState<
    { year: number; month: number; days: number[] }[]
  >([]);
  // console.log(completedDatesSet)
  const { width } = Dimensions.get("window");
  const itemWidth = width * 1;

  useEffect(() => {
    const fetchData = async () => {
      const dateStr = await getStartDate();
      if (!dateStr) return;
  
      const utcDate = new Date(dateStr);
  

      const localStartDate = new Date(
        utcDate.getUTCFullYear(),
        utcDate.getUTCMonth(),
        utcDate.getUTCDate()
      );
  
      setStartDate(localStartDate);
  
      const current = new Date();
      const monthsInRange = [];
      const tempDate = new Date(localStartDate);
  
      while (
        tempDate.getFullYear() < current.getFullYear() ||
        (tempDate.getFullYear() === current.getFullYear() &&
          tempDate.getMonth() <= current.getMonth())
      ) {
        const isFirstMonth =
          tempDate.getFullYear() === localStartDate.getFullYear() &&
          tempDate.getMonth() === localStartDate.getMonth();
        const startDay = isFirstMonth ? localStartDate.getDate() : 1;
  
        const daysInMonth = new Date(
          tempDate.getFullYear(),
          tempDate.getMonth() + 1,
          0
        ).getDate();
  
        monthsInRange.push({
          year: tempDate.getFullYear(),
          month: tempDate.getMonth(),
          days: Array.from({ length: daysInMonth }, (_, i) => i + 1).slice(
            startDay - 1
          ),
        });
  
        tempDate.setMonth(tempDate.getMonth() + 1);
        tempDate.setDate(1);
      }
  
      setMonths(monthsInRange);
    };
  
    fetchData();
  }, []);
  

  const renderMonth = ({
    item,
  }: {
    item: { year: number; month: number; days: number[] };
    index: number;
  }) => {
    const { year, month, days } = item;

    return (
      <View style={{ width: itemWidth }} className="">
        <View className="flex-row justify-between">
          <Text className="text-2xl font-bold">
            {new Date(year, month).toLocaleString("default", { month: "long" })}{" "}
            {year}
          </Text>
        </View>
        <View
          className="flex-row flex-wrap gap-2 mt-4"
          style={{ width: "85%" }}
        >
          {days.map((day) => {
            const dateStr = getFormattedDate(new Date(year, month, day));
            // console.log("Rendered date:", dateStr, completedDatesSet.has(dateStr));
            const isStreakCompleted = completedDatesSet.has(dateStr);

            return (
              <Pressable key={day} onPress={() => router.push(`/${dateStr}`)}>
                <SymbolView
                  tintColor={isStreakCompleted ? "black" : "#666666"}
                  size={25}
                  name={
                    isStreakCompleted
                      ? "checkmark.circle.fill"
                      : "circle.dotted"
                  }
                />
              </Pressable>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View className="gap-y-8">
      <TrayHeader title="Streak" icon="flame.fill" iconColor="#BFBFBF" />
      <View className="flex-row justify-between items-center px-16">
        <View className="items-center">
          <Text className="text-sm">Current</Text>
          <Text className="text-3xl font-bold">{currentStreak}</Text>
        </View>
        <View className="items-center">
          <Text className="text-sm">Longest</Text>
          <Text className="text-3xl font-bold">{longestStreak}</Text>
        </View>
      </View>

      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#DFDFDF",
        }}
      />

      <FlatList
        data={months}
        keyExtractor={(item) => `${item.year}-${item.month}`}
        renderItem={renderMonth}
        contentContainerStyle={{ paddingBottom: 20 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled={false}
        snapToInterval={itemWidth}
        decelerationRate="fast"
        snapToAlignment="start"
        disableIntervalMomentum={true}
      />
    </View>
  );
};

export default Streak;
