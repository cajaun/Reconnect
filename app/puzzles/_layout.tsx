import { View, Text, TouchableOpacity, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { SymbolView } from "expo-symbols";



const PuzzleLayout = () => {

  return (


    <Stack
      screenOptions={{
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{
          title:"Puzzles",
          headerLargeTitle: false,
          headerTransparent: true,
          headerBlurEffect: "systemChromeMaterial",
          headerLargeTitleShadowVisible: false,
          headerShadowVisible: true,
          headerLargeStyle: {
            backgroundColor: "transparent",
          },
          // header: () => <CustomHeader />,
        }}
      />
    </Stack>
    

 
  );
};

export default PuzzleLayout;
