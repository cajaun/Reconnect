import { useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Dimensions, FlatList, Pressable } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { GameSheet } from "@/components/ui/game-sheet/game-sheet";
import { GameSheetMutableProgress } from "@/components/ui/game-sheet/shared-progress";
import { allPuzzles } from "@/utils/puzzle-data";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SymbolView } from "expo-symbols";
import { PressableScale } from "@/components/ui/utils/pressable-scale";

const Puzzle = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { bottom, top } = useSafeAreaInsets();

  const puzzleId = id ? Number(id) : allPuzzles[0]?.id;

  if (!puzzleId || !allPuzzles.length) {
    return <Text>Loading puzzles...</Text>;
  }

  const puzzle = allPuzzles.find((p) => p.id === puzzleId);

  const progress = GameSheetMutableProgress;

  const rScreenStyle = useAnimatedStyle(() => ({
    borderRadius: interpolate(progress.value, [0, 1], [0, 48]),
    borderCurve: "continuous",
  }));

  const { width } = Dimensions.get("window");
  const gap = 8;
  const visibleItems = 4;
  const itemWidth = (width - gap * (visibleItems - 1) - 32) / visibleItems;

  const renderItem = ({ item }: { item: { id: string } }) => (
    <PressableScale
      style={{
        width: itemWidth,
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={() => router.push(`/${item.id}`)}
    >
      <Text className="font-semibold text-[#666666]">Sat</Text>
      <Text className="font-bold text-3xl">17</Text>

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
        <SymbolView name="circle.dotted" tintColor="black" size={20} />
      </View>
    </PressableScale>
  );

  useEffect(() => {
    if (!id) {
      router.push(`/${allPuzzles[0]?.id}`);
    }
  }, [id, router]);

  if (!puzzle) {
    return <Text>Puzzle not found</Text>;
  }

  const listAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(progress.value, [0, 0.65], [0, 100]);
    const opacity = interpolate(progress.value, [0, 0.5, 1], [1, 0.2, 0]);

    return {
      transform: [{ translateY }],
      opacity,
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(progress.value, [0.75, 0], [0, 100]);
    const opacity = interpolate(progress.value, [0, 0.5, 1], [1, 0.2, 0]);

    return {
      transform: [{ translateY }],
      opacity,
    };
  });

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={[
          {
            paddingHorizontal: 16,
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
        <GameSheet puzzle={puzzle} />
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
          data={allPuzzles.map((puzzle) => ({
            ...puzzle,
            id: String(puzzle.id),
          }))}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled={false}
          snapToInterval={itemWidth + gap * 2}
          decelerationRate="fast"
          snapToAlignment="center"
          contentContainerStyle={{
            paddingLeft: (width - itemWidth) / 2,
            paddingRight: 16,
          }}
          ItemSeparatorComponent={() => <View style={{ width: gap }} />}
        />
      </Animated.View>
    </View>
  );
};

export default Puzzle;
