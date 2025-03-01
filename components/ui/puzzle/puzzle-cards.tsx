import React, { useState } from "react";
import { View, FlatList, Text, Pressable } from "react-native";
import { SymbolView, SFSymbol } from "expo-symbols";
import { FadeIn } from "../utils/fade-in";
import { BodyScrollView, useBottomTabOverflow } from "../utils/body-scroll-view";
import { router } from "expo-router";
import * as Haptic from "expo-haptics";
import { ScrollView } from "react-native";
import TouchableBounce from "../utils/touchable-bounce";


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
    icon: "timer.circle.fill",
    size: 60,
  },
  {
    id: "2",
    name: "Reverse",
    bgColor: "#02A898",
    colors: ["#01655B", "#17CCB9"],
    icon: "arrow.clockwise.circle.fill",
    size: 60,
  },
  {
    id: "3",
    name: "Variant",
    bgColor: "#01A0F9",
    colors: ["#3FB6F2", "#0283DD"],
    icon: "dice.fill",
    size: 50,
  },
  {
    id: "4",
    name: "Casual",
    bgColor: "#D8AB00",
    colors: [ "#997501", "#B88C00",],
    icon: "leaf.circle.fill",
    size: 60,
  },
  {
    id: "5",
    name: "Wildcard",
    bgColor: "#FE5900",
    colors: ["#9D2200", "#FFB56A"],
    icon: "suit.spade.fill",
    size: 70,
  },
  {
    id: "6",
    name: "Survival",
    bgColor: "#01A0D2",
    colors: ["#2EBAD8", "#016587"],
    icon: "flame.fill",
    size: 70,
  }
];



const PuzzleCard = () => {

  const paddingBottom = useBottomTabOverflow();


  return (
<View >



<FadeIn  >
  <FlatList
    contentInsetAdjustmentBehavior="automatic"

    data={categories}
    keyExtractor={(item, index) => index.toString()}
    numColumns={2}
    renderItem={({ item }) => (
      <TouchableBounce
        onPress={() => categoryHandler(item.id, item.name)}
        style={{ width: "50%"}}
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
          <SymbolView
            name="ellipsis.circle.fill"
            type="hierarchical"
            size={30}
            style={{ position: "absolute", top: 8, right: 12 }}
            tintColor="white"
           
          />
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
    contentContainerStyle={{ padding: 8}}


  />
</FadeIn>
</View>
  );
};

export default PuzzleCard;
