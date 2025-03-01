import {
  View,
  Text,
  Pressable,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
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
import * as Haptic from "expo-haptics";

const events = [
  {
    id: 1,
    color: "#567CF7",
    name: "Classical",
    description: "Timeless Challenges",
    tag: "Legacy",
    image: require("@/assets/images/1.jpg"),
    icon: "book.fill",
  },
  {
    id: 2,
    color: "#A9AA00",
    name: "Timed",
    description: "Race Against Time",
    tag: "Countdown",
    image: require("@/assets/images/2.jpg"),
    icon: "timer.circle.fill",
  },
  {
    id: 3,
    color: "#DB42D3",
    name: "Reverse",
    description: "Turn Things Around",
    tag: "Reversal",
    image: require("@/assets/images/3.jpg"),
    icon: "arrow.clockwise.circle.fill",
  },
  {
    id: 4,
    color: "#F39A1D",
    name: "Variant",
    description: "Unique Twists",
    tag: "Random",
    image: require("@/assets/images/4.jpg"),
    icon: "dice.fill",
  },
  {
    id: 5,
    color: "#F2212C",
    name: "Casual",
    description: "Relax and Play",
    tag: "Chill",
    image: require("@/assets/images/5.jpg"),
    icon: "leaf.fill",
  },
  {
    id: 6,
    color: "#FE4054",
    name: "Wildcard",
    description: "Unexpected Surprises",
    tag: "Surprise",
    image: require("@/assets/images/5.jpg"),
    icon: "suit.spade.fill",
  },
  {
    id: 7,
    color: "#3FB6F2",
    name: "Survival",
    description: "Endurance Mode",
    tag: "Endurance",
    image: require("@/assets/images/5.jpg"),
    icon: "flame.fill",
  },
];

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Welcome = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePlay = () => {
    Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Medium);
    router.push("/puzzles");
  };

  return (
    <View className="flex-1 items-center w-full bg-yellow-950">
      <Animated.View
        key={events[activeIndex].id}
        // source={events[activeIndex].image}
        className="absolute left-0 top-0 w-full h-full"
        style={{ backgroundColor: events[activeIndex].color }}
        // resizeMode="cover"
        // entering={FadeIn.duration(1000)}
        // exiting={FadeOut.duration(1000)}
      />

      <View className="absolute left-0 top-0 w-full h-full bg-black/70 " />

      <BlurView intensity={70} className="absolute w-full h-full">
        <SafeAreaView edges={["bottom"]} className="flex-1">
          <Animated.View
            className="h-1/2 w-full mt-20 "
            // entering={SlideInUp.springify().mass(1).damping(30)}
          >
            <Marquee
              items={events}
              onIndexChange={setActiveIndex}
              renderItem={({ item }) => (
                <View
                  className="h-full w-full rounded-3xl flex-1 justify-between"
                  style={{ backgroundColor: item.color }}
                >
                  <View
                    style={{
                      borderRadius: 36,
                      overflow: "hidden",
                      alignSelf: "flex-start",
                      maxWidth: "80%",
                    }}
                    className="top-4 left-4"
                  >
                    <BlurView
                      style={{
                        flexDirection: "row",
                        gap: 4,
                        marginVertical: "auto",
                        padding: 4,
                        paddingHorizontal: 10,
                      }}
                      tint="dark"
                      intensity={40}
                    >
                      <SymbolView
                          name={item.icon}
                          tintColor="white"
                          size={20}
                        />
                      <Text className="text-white font-bold text-center my-auto">
                        {item.tag}
                      </Text>
                      <View>
                        
                      </View>
                    </BlurView>
                  </View>

                  <View className="">
                    <View
                      className="justify-end h-36"
                      style={{
                        borderBottomLeftRadius: 24,
                        borderBottomRightRadius: 24,
                        overflow: "hidden",
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          borderRadius: 24,
                          justifyContent: "center",
                        }}
                      >
                        <Text className="text-white font-bold text-center text-3xl">
                          {item.name}
                        </Text>
                        <Text className="text-center text-lg font-medium text-white/60 mt-2">
                          {item.description}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            />
          </Animated.View>

          <View className="flex-1 justify-end gap-4 p-4 ">
            <Animated.Text
              // entering={FadeInUp.springify().mass(1).damping(30).delay(500)}
              className="text-center text-xl font-bold text-white/60"
            >
              Welcome to
            </Animated.Text>

            <Animated.Text
              // entering={FadeIn.duration(500).delay(500)}
              className="text-center text-6xl font-bold text-white"
            >
              Connections
            </Animated.Text>

            <Animated.Text
              // entering={FadeInUp.springify().mass(1).damping(30).delay(500)}
              className="text-center text-lg font-medium text-white/60"
            >
              A puzzle game that challenges your mind with unique and exciting
              ways to play. Sharpen your skills, explore new strategies, and
              enjoy endless fun!
            </Animated.Text>

            <AnimatedPressable
            // entering={FadeInUp.springify().mass(1).damping(30).delay(500)}
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
                  marginHorizontal: "auto",
                  width: "95%",
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
                  Play Now
                </Text>
                {/* <SymbolView
                  name="play.circle.fill"
                  name="monochrome"
                  tintColor="black"
                  size={20}
                /> */}
              </PressableScale>
            </AnimatedPressable>
          </View>
        </SafeAreaView>
      </BlurView>
    </View>
  );
};

export default Welcome;
