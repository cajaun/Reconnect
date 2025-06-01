import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  Dimensions,
  FlatList,
  InteractionManager,
  ListRenderItem,
} from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";
import { GameSheet } from "@/components/ui/game-sheet/game-sheet";
import { allPuzzles } from "@/data/puzzle-data";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PuzzleDate from "@/components/ui/puzzle/puzzle-date";
import { usePuzzleData } from "@/hooks/use-puzzle-data";
import { getUnlockedDateInfo } from "@/utils/dates-manager";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useLayoutAnimations } from "@/hooks/use-layout-animations";
import { PuzzleContextProvider} from "@/context/puzzle-context";
import { shuffle } from "@/utils/puzzle-utils";
import { useFormattedUnlockedPuzzles } from "@/hooks/use-formatted-unlocked-puzzles";
import HeaderControls from "@/components/header-controls";
import { useScrollToIndex } from "@/hooks/use-scroll-to-index";
import { useDebouncedNavigation } from "@/hooks/use-debounced-navigation";
import { PuzzleListItem } from "@/types/puzzle-list";

const PuzzleScreen = () => {
  const { id } = useLocalSearchParams();

  const progress = useSharedValue(0);

  const { listAnimatedStyle, rScreenStyle } = useLayoutAnimations(progress);

  const { bottom } = useSafeAreaInsets();

  const puzzleId = id ? Number(id) : allPuzzles[0]?.id;

  const puzzle = useMemo(
    () => allPuzzles.find((p) => p.id === puzzleId),
    [puzzleId]
  );

  const { unlockedPuzzles, startDate } = usePuzzleData();

  const { width } = Dimensions.get("window");

  const gap = 0;
  const visibleItems = 4;
  const itemWidth = (width - gap * (visibleItems - 1) - 64) / visibleItems;

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

  useScrollToIndex(flatListRef, formattedUnlockedPuzzles, puzzleId);

  const onNavigate = useDebouncedNavigation();

  const renderItem: ListRenderItem<PuzzleListItem> = useCallback(
    ({ item }) => {
      const isSelected = id === item.id;
      return (
        <PuzzleDate
          id={item.id}
          isSelected={isSelected}
          startDate={startDate}
          itemWidth={itemWidth}
          onPress={() => onNavigate(item.id)}
        />
      );
    },
    [id, itemWidth, startDate, onNavigate]
    
  );



  return (
    <PuzzleContextProvider puzzle={puzzle} initialShuffle={shuffledWords}>
      <View style={{ flex: 1 }}>
        <HeaderControls progress={progress} />

        <Animated.View
          style={[{ flex: 1, backgroundColor: "white" }, rScreenStyle]}
        >
          <GameSheet
            key={puzzleId}
            progress={progress}
            puzzle={puzzle}
            dayName={dayName}
            dayNumber={dayNumber}
            monthName={monthName}
          />
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
            initialNumToRender={10}
            data={formattedUnlockedPuzzles}
            renderItem={renderItem}
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
    </PuzzleContextProvider>
  );
};

export default PuzzleScreen;
