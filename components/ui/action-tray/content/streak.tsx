import { usePuzzle } from "@/context/puzzle-context";
import { getStartDate } from "@/storage/puzzle-init";
import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, Dimensions } from "react-native";
import TrayHeader from "./tray-header";
import { getAllPuzzleData } from "@/storage/puzzle-data";
import { getFormattedDate } from "@/utils/dates-manager";
import { SwiperPagination } from "../../swiper/swiper-pagination";
import { Content } from "../../swiper/swiper-content";
import { Swiper } from "../../swiper/swiper";

export function streakMap(
  currentStreak: number,
  longestStreak: number,
  completedDatesSet: Set<string>
) {
  return {
    0: (
      <Streak
        currentStreak={currentStreak}
        longestStreak={longestStreak}
        completedDatesSet={completedDatesSet}
      />
    ),
  };
}

interface StreakProps {
  currentStreak: number;
  longestStreak: number;
  completedDatesSet: Set<string>;
}

const Streak: React.FC<StreakProps> = ({
  currentStreak,
  longestStreak,
  completedDatesSet,
}) => {
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

  
    const completedCount = days.reduce((count, day) => {
      const dateStr = getFormattedDate(new Date(year, month, day));
      return completedDatesSet.has(dateStr) ? count + 1 : count;
    }, 0);

    return (
      <View style={{ width: itemWidth }} className="gap-y-4">
        <View
          className="flex-row justify-between items-center"
          style={{ width: "100%", paddingHorizontal: 24 }}
        >
          <View className="flex-row gap-x-1">
            <Text style={{ color: "black" }} className="text-2xl font-bold">
              {new Date(year, month).toLocaleString("default", {
                month: "long",
              })}
            </Text>
            <Text
              style={{ color: "#BFBFBF" }}
              className="text-2xl font-bold ml-1"
            >
              {year}
            </Text>
          </View>

          <View style={{ paddingHorizontal: 24 }}>
            <Text className="font-bold text-black text-2xl">
              {completedCount}
              <Text style={{ color: "#BFBFBF" }}>/{days.length}</Text>
            </Text>
          </View>
        </View>

        <View
          className="flex-row flex-wrap"
          style={{
            width: itemWidth,
            paddingHorizontal: 32,
            gap: 6,
            rowGap: 4,
          }}
        >
          {days.map((day) => {
            const dateStr = getFormattedDate(new Date(year, month, day));
            const isStreakCompleted = completedDatesSet.has(dateStr);

            return (
              <Pressable
                key={day}
                onPress={() => router.push(`/${dateStr}`)}
                style={{
                  width: 30,
                  height: 30,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SymbolView
                  tintColor={isStreakCompleted ? "black" : "#BFBFBF"}
                  size={22}
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
      <TrayHeader title="Streak" icon="flame.fill" iconColor="#000000" />

      <View className="flex-row justify-between items-center px-24">
        <View className="items-center">
          <Text className="text-sm">Current</Text>
          <Text className="text-4xl font-bold">{currentStreak}</Text>
        </View>

        <View
          style={{
            width: 0.5,
            height: "40%",
            backgroundColor: "#DFDFDF",
          }}
        />

        <View className="items-center">
          <Text className="text-sm">Longest</Text>
          <Text className="text-4xl font-bold">{longestStreak}</Text>
        </View>
      </View>

      <View className="w-full items-center" style={{paddingHorizontal: 8}}>
        <View
          style={{
            height: 0.25,
            width: "90%",
            backgroundColor: "#DFDFDF",
          }}
        />
      </View>

      {months.length > 0 && (
        <Swiper content={months}>
          <Content width={width} renderItem={renderMonth} />
          <View className="pt-8 gap-y-2">
            <View className="items-center justify-center">
              <SwiperPagination />
            </View>
          </View>
        </Swiper>
      )}
    </View>
  );
};

export default Streak;
