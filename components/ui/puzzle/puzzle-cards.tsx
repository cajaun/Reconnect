import React, { useState } from "react";
import { View, FlatList, Text, Pressable } from "react-native";
import { SymbolView, SFSymbol } from "expo-symbols";
import { FadeIn } from "../utils/fade-in";
import {
  BodyScrollView,
  useBottomTabOverflow,
} from "../utils/body-scroll-view";
import { router } from "expo-router";
import * as Haptic from "expo-haptics";
import { ScrollView } from "react-native";
import TouchableBounce from "../utils/touchable-bounce";
import DefaultDrawerView from "../drawer/drawer-views/settings/settings-view";

type Category = {
  id: string;
  name: string;
  bgColor: string;
  colors: string[];
  icon: SFSymbol;
  size: number;
};

const categoryHandler = (itemId: string, itemName: string) => {
  Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Medium);
  router.push(`/puzzles/${itemId}`);
};

const categories: Category[] = [
  {
    id: "0",
    name: "Classical",
    bgColor: "#027BFD",
    colors: ["#004CC4", "#2787F7"],
    icon: "book.pages.fill",
    size: 65,
  },
  {
    id: "1",
    name: "Timed",
    bgColor: "#4848FF",
    colors: ["#567CF7", "#1D0D9A"],
    icon: "map.fill",
    size: 60,
  },
  {
    id: "2",
    name: "Casual",
    bgColor: "#02A898",
    colors: ["#01655B", "#17CCB9"],
    icon: "play.rectangle.fill",
    size: 60,
  },
];

type PuzzleCardProps = {
  handleOpenDrawer: () => void;
};

const PuzzleCard: React.FC<PuzzleCardProps> = ({ handleOpenDrawer }) => {
  const paddingBottom = useBottomTabOverflow();

  return (
    <View>
        <FlatList
          contentInsetAdjustmentBehavior="automatic"
          data={categories}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableBounce
              onPress={() => categoryHandler(item.id, item.name)}
              style={{ width: "50%" }}
            >
              <View
                key={item.name}
                className={` rounded-2xl justify-center pl-4 relative overflow-hidden`}
                style={{
                  marginBottom: 10,
                  marginHorizontal: 5,
                  flex: 1,
                  backgroundColor: item.bgColor,
                  height: 125,
                }}
              >
                <Pressable onPress={handleOpenDrawer}>
                  <SymbolView
                    name="ellipsis.circle.fill"
                    type="hierarchical"
                    size={30}
                    style={{ position: "absolute", bottom: 20, right: 12 }}
                    tintColor="white"
                  />
                </Pressable>

                <SymbolView
                  name={item.icon}
                  type="palette"
                  size={item.size}
                  style={{ position: "absolute", top: 16, left: 16 }}
                  colors={item.colors}
                />

                <Text
                  className="text-white text-lg font-bold"
                  style={{
                    position: "absolute",
                    bottom: 8,
                    left: 12,
                    right: 0,
                  }}
                >
                  {item.name}
                </Text>
              </View>
            </TouchableBounce>
          )}
          contentContainerStyle={{ padding: 8 }}
        />
    </View>
  );
};

export default PuzzleCard;
