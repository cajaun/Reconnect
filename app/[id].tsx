import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Dimensions, FlatList, Pressable, InteractionManager } from "react-native";
import Animated from "react-native-reanimated";
import { GameSheet } from "@/components/ui/game-sheet/game-sheet";
import { GameSheetMutableProgress } from "@/components/ui/game-sheet/shared-progress";
import { allPuzzles } from "@/data/puzzle-data";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SymbolView } from "expo-symbols";
import { PressableScale } from "@/components/ui/utils/pressable-scale";
import PuzzleDate from "@/components/ui/puzzle/puzzle-date";
import { usePuzzleData } from "@/hooks/use-puzzle-data";
import { getUnlockedDateInfo } from "@/utils/dates-manager";
import { useEffect, useMemo, useRef } from "react";
import { useLayoutAnimations } from "@/hooks/use-layout-animations";
import { PuzzleContextProvider } from "@/context/puzzle-context";
import { shuffle } from "@/utils/puzzle-utils";
import { useFormattedUnlockedPuzzles } from "@/hooks/use-formatted-unlocked-puzzles";

const PuzzleScreen = () => {
  const { id } = useLocalSearchParams();
  const progress = GameSheetMutableProgress;
  const { listAnimatedStyle, headerAnimatedStyle, rScreenStyle } =
    useLayoutAnimations(progress);
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();
  const puzzleId = id ? Number(id) : allPuzzles[0]?.id;
  const puzzle = useMemo(
    () => allPuzzles.find((p) => p.id === puzzleId),
    [puzzleId]
  );
  const { unlockedPuzzles, startDate } = usePuzzleData();
  const { width } = Dimensions.get("window");
  const gap = 8;
  const visibleItems = 4;
  const itemWidth = (width - gap * (visibleItems - 1) - 32) / visibleItems;
  const flatListRef = useRef<FlatList>(null);
  const { dayName, dayNumber, monthName } = useMemo(
    () => getUnlockedDateInfo(startDate, puzzleId, false),
    [startDate, puzzleId]
  );

  if (!puzzle) {
    return <Text>Puzzle not found</Text>;
  }

  const shuffledWords = useMemo(() => shuffle(puzzle.words), [puzzle.words]);

  const formattedUnlockedPuzzles = useFormattedUnlockedPuzzles(unlockedPuzzles);

  useEffect(() => {
    const index = formattedUnlockedPuzzles.findIndex((p) => p.id === String(puzzleId));
    if (index !== -1) {
      InteractionManager.runAfterInteractions(() => {
        flatListRef.current?.scrollToIndex({ index, animated: true });
      });
    }
  }, [puzzleId, formattedUnlockedPuzzles]);

  return (
    <View style={{ flex: 1 }}>
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
              onPress={() => console.log("Streak button is being pressed")}
              className="bg-[#F2F2F2] p-3 rounded-full"
            >
              <SymbolView name="flame.fill" tintColor={"black"} size={25} />
            </PressableScale>

            <PressableScale className="bg-[#F2F2F2] p-3 rounded-full">
              <SymbolView name="trophy.fill" tintColor={"black"} size={25} />
            </PressableScale>
          </View>

          <View className="flex-row gap-x-8">
            <PressableScale className="bg-[#F2F2F2] p-3 rounded-full">
              <SymbolView name="chart.bar.fill" tintColor={"black"} size={25} />
            </PressableScale>

            <PressableScale className="bg-[#F2F2F2] p-3 rounded-full">
              <SymbolView name="gearshape.fill" tintColor={"black"} size={25} />
            </PressableScale>
          </View>
        </View>
      </Animated.View>

      <Animated.View
        style={[{ flex: 1, backgroundColor: "white" }, rScreenStyle]}
      >
        <PuzzleContextProvider puzzle={puzzle} initialShuffle={shuffledWords}>
          <GameSheet
            puzzle={puzzle}
            dayName={dayName}
            dayNumber={dayNumber}
            monthName={monthName}
          />
        </PuzzleContextProvider>
      </Animated.View>

      <Animated.View
        style={[
          {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            paddingBottom: bottom + 10,
          },
          listAnimatedStyle,
        ]}
      >
        <FlatList
          ref={flatListRef}
          data={formattedUnlockedPuzzles}
          renderItem={({ item }) => {
            const isSelected = id === item.id;
            return (
              <PuzzleDate
                id={item.id}
                isSelected={isSelected}
                startDate={startDate}
                itemWidth={itemWidth}
                onPress={() => router.push(`/${item.id}`)}
              />
            );
          }}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled={false}
          snapToInterval={itemWidth + gap}
          decelerationRate="fast"
          snapToAlignment="center"
          contentContainerStyle={{
            paddingLeft: (width - itemWidth) / 2,
            paddingRight: 16,
          }}
          ItemSeparatorComponent={() => <View style={{ width: gap }} />}
          getItemLayout={(data, index) => ({
            length: itemWidth + gap,
            offset: (itemWidth + gap) * index,
            index,
          })}
        />
      </Animated.View>
    </View>
  );
};

export default PuzzleScreen;
