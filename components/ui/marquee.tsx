import { View, Image, useWindowDimensions, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useFrameCallback,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import * as Haptic from "expo-haptics";
import { BlurView } from "expo-blur";

type MarqueeItemProps = {
  event: any;
  index: number;
  scroll: SharedValue<number>;
  containerWidth: number;
  itemWidth: number;
};
const MarqueeItem = ({
  event,
  index,
  scroll,
  containerWidth,
  itemWidth,
}: MarqueeItemProps) => {
  const { width: screenWidth } = useWindowDimensions();

  const shift = (containerWidth - screenWidth) / 2;

  const initialPosition = itemWidth * index - shift;

  const animatedStyle = useAnimatedStyle(() => {
    let position = (initialPosition - scroll.value) % containerWidth;

    if (position < -itemWidth) {
      position += containerWidth;
    } else if (position > containerWidth - itemWidth) {
      position -= containerWidth;
    }

    const rotation = interpolate(
      position,
      [-itemWidth, 0, screenWidth - itemWidth, screenWidth],
      [-1, 0, 1, 0]
    );

    const translateY = interpolate(
      position,
      [-itemWidth, 0, screenWidth - itemWidth, screenWidth],
      [3, 0, 3, 0]
    );

    return {
      left: position,
      transform: [{ rotateZ: `${rotation}deg` }, { translateY }],
    };
  });

  return (
    <Animated.View
      className="absolute h-full  p-2 shadow-md "
      style={[{ width: itemWidth, transformOrigin: "bottom" }, animatedStyle]}
    >
      <View
        className="h-full w-full rounded-3xl"
        style={{ backgroundColor: event.color }}
      >
        <View
          style={{
            borderRadius: 36, 
            overflow: "hidden", 
            alignSelf: "flex-start",
            maxWidth: "50%",
          }}
          className="top-4 left-4 "
        >
          <BlurView
            style={{
              padding: 4,
              paddingHorizontal: 10,
            }}
            tint="dark"
            intensity={50}
          >
            <Text className="text-white font-bold text-center">
              {event.type}
            </Text>
          </BlurView>
        </View>
      </View>

      {/* <Image source={event.image}  /> */}
    </Animated.View>
  );
};

const Marquee = ({
  events,
  onIndexChange,
}: {
  events: any[];
  onIndexChange?: (index: number) => void;
}) => {
  const { width: screenWidth } = useWindowDimensions();
  const itemWidth = screenWidth * 0.65;
  const containerWidth = events.length * itemWidth;
  const shift = (containerWidth - screenWidth) / 2;

  const scroll = useSharedValue(-shift);

  const scrollSpeed = useSharedValue(50);
  const isUserScrolling = useSharedValue(false);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (onIndexChange) {
      onIndexChange(activeIndex);
    }
  }, [activeIndex]);

  useAnimatedReaction(
    () => scroll.value,
    (value) => {
      const adjustedScroll = value + shift;
      const normalizedScroll =
        ((adjustedScroll % containerWidth) + containerWidth) % containerWidth;

      let newIndex = Math.round(normalizedScroll / itemWidth);
      newIndex = Math.max(0, Math.min(newIndex, events.length - 1));

      if (newIndex !== activeIndex) {
        runOnJS(setActiveIndex)(newIndex);

        if (isUserScrolling.value) {
          runOnJS(Haptic.impactAsync)(Haptic.ImpactFeedbackStyle.Medium);
        }
      }
    }
  );

  useFrameCallback((frameInfo) => {
    const deltaSeconds = (frameInfo.timeSincePreviousFrame ?? 0) / 1000;
    scroll.value = scroll.value + scrollSpeed.value * deltaSeconds;
  });

  const gesture = Gesture.Pan()
    .onBegin(() => {
      scrollSpeed.value = 0;
      isUserScrolling.value = true;
    })
    .onChange((event) => {
      // console.log("onChange", event.changeX);

      scroll.value = scroll.value - event.changeX;
    })

    .onFinalize((event) => {
      scrollSpeed.value = -event.velocityX;
      scrollSpeed.value = withTiming(50, {
        duration: 1000,
        easing: Easing.out(Easing.quad),
      });
      isUserScrolling.value = false;
    });
  return (
    <GestureDetector gesture={gesture}>
      <View className="h-full flex-row overflow-hidden" >
        {/* <Text className = "text-2xl text-white">{activeIndex}</Text> */}
        {events.map((event, index) => (
          <MarqueeItem
            key={event.id}
            event={event}
            index={index}
            scroll={scroll}
            containerWidth={containerWidth}
            itemWidth={itemWidth}
          />
        ))}
      </View>
    </GestureDetector>
  );
};

export default Marquee;
