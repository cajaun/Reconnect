import DrawerButton from "@/components/ui/action-tray/content/drawer-button";
import { SymbolView } from "expo-symbols";
import React from "react";
import { View, Text, Pressable } from "react-native";
import TrayHeader from "./tray-header";
import { PressableScale } from "../../utils/pressable-scale";

export function settingsMap(
  openTray: (step: number, contentMap: Record<number, React.ReactNode>) => void,
  close: () => void,
  contentMap: Record<number, React.ReactNode>
) {
  return {
    0: (
      <View className="gap-y-6">
        <View className="justify-center items-center">
          <TrayHeader title="Settings"/>
        </View>

        <View className="gap-y-3">
          <DrawerButton
            onPress={() => openTray(1, contentMap)}
            className="bg-[#F2F2F2] text-white "
            textColor="black"
            label="App settings"
          />

          <DrawerButton
            onPress={() => close()}
            className="bg-[#F2F2F2] text-white "
            textColor="black"
            label="Game settings"
          />

          <DrawerButton
            onPress={() => close()}
            className="bg-[#F2F2F2] text-white "
            textColor="black"
            label="Notifications"
          />

          <DrawerButton
            onPress={() => close()}
            className="bg-[#F2F2F2] text-white "
            textColor="black"
            label="More"
          />
        </View>
      </View>
    ),
    1: (
      <View className="gap-y-6">
        <View className="justify-center items-center">
          <TrayHeader title="App Settings" back={true}     onPress={() => openTray(0, contentMap)}  />
        </View>


        <View className="gap-y-2">
          <View>
            <Text className="text-lg font-bold">Apperance</Text>
          </View>

          <View className="flex-row justify-between gap-x-4 w-full">
            <PressableScale className="bg-[#F2F2F2] flex-1 h-36 justify-between items-center px-5 rounded-2xl">
              <View className="flex-1 justify-center items-center">
                <SymbolView name="iphone" size={50} tintColor={"black"} />
              </View>
              <Text className="text-black text-lg font-semibold mb-4">
                System
              </Text>
            </PressableScale>

            <PressableScale className="bg-[#F2F2F2] flex-1 h-36 justify-between items-center px-5 rounded-2xl">
              <View className="flex-1 justify-center items-center">
                <SymbolView name="sun.max" size={50} tintColor={"black"} />
              </View>
              <Text className="text-black text-lg font-semibold mb-4">
                Light
              </Text>
            </PressableScale>

            <PressableScale className="bg-[#F2F2F2] flex-1 h-36 justify-between items-center px-5 rounded-2xl">
              <View className="flex-1 justify-center items-center">
                <SymbolView name="moon" size={50} tintColor={"black"} />
              </View>
              <Text className="text-black text-lg font-semibold mb-4">
                Dark
              </Text>
            </PressableScale>
          </View>
        </View>
      </View>
    ),
  };
}
