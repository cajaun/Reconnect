import {
  View,
  Text,
  Pressable,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SymbolView, SFSymbol } from "expo-symbols";
import { PressableScale } from "@/components/ui/utils/pressable-scale";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOut,
  FadeOutDown,
  SlideInUp,
} from "react-native-reanimated";
import Marquee from "@/components/ui/marquee";
import { router } from "expo-router";
import { useNavigationState } from "@react-navigation/native";
import * as Haptic from "expo-haptics"


const events = [
  { id: 1, color: "#567CF7", type: "Classical" },
  { id: 2, color: "#A9AA00",  type: "Timed" },
  { id: 3, color: "#DB42D3",  type: "Reverse" },
  { id: 4, color: "#F39A1D",  type: "Variant" },
  { id: 5, color: "#F2212C",  type: "Casual" },
  { id: 6, color: "#FE4054",  type: "Wildcard" },
  { id: 7, color: "#3FB6F2",  type: "Survival" },
];

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Welcome = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePlay = () => {
    Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Medium);
    router.push("/(puzzles)")
  }

  return (
    <View className="flex-1 items-center w-full bg-yellow-950">
      <Animated.View
        key={events[activeIndex].id}
        // source={events[activeIndex].image}
        className="absolute left-0 top-0 w-full h-full"
        style={{ backgroundColor: events[activeIndex].color }}
        // resizeMode="cover"
        entering={FadeIn.duration(1000)}
        exiting={FadeOut.duration(1000)}
      />

      <View className="absolute left-0 top-0 w-full h-full bg-black/70" />

      <BlurView intensity={70} className="absolute w-full h-full">
        <SafeAreaView edges={["bottom"]} className="flex-1">
          <Animated.View
            className="h-1/2 w-full mt-20 "
            entering={SlideInUp.springify().mass(1).damping(30)}
          >
            <Marquee events={events} onIndexChange={setActiveIndex} />
          </Animated.View>

          <View className="flex-1 justify-end gap-4 p-4 ">
            <Animated.Text
              entering={FadeInUp.duration(1000).delay(500)}
              className="text-center text-lg font-bold text-white/60"
            >
              Welcome to
            </Animated.Text>

            <Animated.Text
              entering={FadeIn.duration(500).delay(800)}
              className="text-center text-6xl font-bold text-white"
            >
              Connections
            </Animated.Text>

            <Animated.Text
              entering={FadeInUp.springify().mass(1).damping(30).delay(500)}
              className="text-center text-lg font-medium text-white/60"
            >
              A puzzle game that challenges your mind with unique and exciting
              ways to play. Sharpen your skills, explore new strategies, and
              enjoy endless fun!
            </Animated.Text>

            <AnimatedPressable
              entering={FadeInUp.springify().mass(1).damping(30).delay(500)}
            >
              <PressableScale
                onPress={handlePlay}
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
                <SymbolView
                  name="play.circle.fill"
                  type="hierarchical"
                  tintColor="black"
                  size={26}
                />
              </PressableScale>
            </AnimatedPressable>
          </View>
        </SafeAreaView>
      </BlurView>
    </View>
  );
};

export default Welcome;
