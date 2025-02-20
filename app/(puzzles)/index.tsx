import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { PressableScale } from "@/components/ui/utils/pressable-scale";
import { BodyScrollView } from "@/components/ui/utils/body-scroll-view";

const PuzzleScreen = () => {
  return (
    <BodyScrollView>
      <PressableScale
        onPress={() => router.push("/[id]")}
        style={{
          height: 50,
          display: "flex",
          flexDirection: "row",
          gap: 6,
          backgroundColor: "#FFF",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
          marginVertical: 16,
          width: "100%",
          borderRadius: 50,
          borderCurve: "continuous",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Play
        </Text>
      </PressableScale>
    </BodyScrollView>
  );
};

export default PuzzleScreen;
