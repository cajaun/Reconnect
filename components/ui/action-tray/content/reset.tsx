import DrawerButton from "@/components/ui/action-tray/content/drawer-button";
import { SymbolView } from "expo-symbols";
import React from "react";
import { View, Text, Pressable } from "react-native";
import TrayHeader from "./tray-header";

export function resetMap(
  openTray: (step: number, contentMap: Record<number, React.ReactNode>) => void,
  close: () => void,
  contentMap: Record<number, React.ReactNode>,
  handleReset: () => void
) {
  return {
    0: (
      <View className = "gap-y-6">
        <View className="justify-center items-center">
          <TrayHeader />

          <View className="gap-y-4 justify-center items-center">
            <SymbolView
               name="questionmark.circle"
              size={75}
              tintColor={"#BFBFBF"}
              weight="bold"
            />

            <Text className="text-2xl font-bold text-center ">Feeling stuck?</Text>

            <Text className="text-lg font-semibold text-center text-[#666666]"> If things aren't clicking, you can reset and give the puzzle another go.</Text>
          </View>
        </View>

        <View className="gap-y-3">
          <DrawerButton
            onPress={() => openTray(1, contentMap)}
            className="bg-black text-white justify-center items-center"
            textColor="white"
            icon="arrow.counterclockwise"
            iconColor="white"
            label="Start over"
          />

          <DrawerButton
            onPress={() => close()}
            className="bg-[#F2F2F2] text-white justify-center items-center"
            textColor="black"
            label="Keep playing"
          />
        </View>
      </View>
    ),
    1: (
      <View style={{ gap: 24 }}>
        <View className="justify-center items-center">
          <TrayHeader />

          <View className="gap-y-4 justify-center items-center">
            <SymbolView
           name="exclamationmark.triangle"
              size={75}
              tintColor={"#BFBFBF"}
            />

            <Text className="text-2xl font-bold text-center ">Are you sure?</Text>

            <Text className="text-lg font-semibold text-center text-[#666666]">
            If you start over, all your current progress will disappear, and you'll be solving this one from scratch.
            </Text>
          </View>
        </View>

        <View className="gap-y-3">
          <DrawerButton
        onPress={handleReset}
            className="bg-black text-white justify-center items-center"
            textColor="white"
            icon="checkmark"
            iconColor="white"
            label="Yes, start over"
            
          />

          <DrawerButton
            onPress={() => close()}
            className="bg-[#F2F2F2] text-white justify-center items-center"
            textColor="black"
            label="No, keep playing"
          />
        </View>
      </View>
    ),
  };
}
