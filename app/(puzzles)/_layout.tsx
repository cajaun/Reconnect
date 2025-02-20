import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";


const PuzzleLayout = () => {

  return (
    <Stack screenOptions={{
      headerShadowVisible: false,
    }}>
      <Stack.Screen
      name = "index"
      options={{
        title: "Puzzles",
        headerLargeTitle: true,
        headerTransparent: true,
        headerBlurEffect: "systemChromeMaterial",
        headerLargeTitleShadowVisible: false,
        headerShadowVisible: true,
        headerLargeStyle: {
          backgroundColor: "transparent",
        },
      }}
      />
         
    </Stack>
 
  );
};

export default PuzzleLayout;
