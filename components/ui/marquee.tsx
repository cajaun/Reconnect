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

import * as Haptic from "expo-haptics"
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
    const position =
      ((initialPosition - scroll.value) % containerWidth) + shift;

    const rotation = interpolate(
      position,
      [0, screenWidth - itemWidth],
      [-1, 1]
    );

    const translateY = interpolate(
      position,
      [0, screenWidth - itemWidth / 2, screenWidth - itemWidth],
      [3, 0, 3]
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
    borderRadius: 36, // Apply the rounded corners here
    overflow: 'hidden', // Ensures the child respects the parent’s border radius
    alignSelf: 'flex-start',
    maxWidth: '50%',

    
  }}
  className="top-4 left-4 "
>
  <BlurView
    style={{
      padding: 4,
      paddingHorizontal: 10,
    }}
    tint="dark" // "dark", "light", or "default"
    intensity={50} // Adjust the intensity
  >
    <Text className="text-white font-bold text-center">{event.type}</Text>
  </BlurView>
</View>


</View>

      {/* <Image source={event.image}  /> */}
    </Animated.View>
  );
};

const Marquee = ({ events, onIndexChange }: { events: any[]; onIndexChange?: (index: number) => void }) => {
  const scroll = useSharedValue(0);

  const scrollSpeed = useSharedValue(50);

  const { width: screenWidth } = useWindowDimensions();

  const [activeIndex, setActiveIndex] = useState(0);

  const itemWidth = screenWidth * 0.65;

  const containerWidth = events.length * itemWidth;

  useEffect(() => {
    if (onIndexChange) {
      onIndexChange(activeIndex)
    }

  }, [activeIndex])


  useAnimatedReaction(
    () => scroll.value,
    (value) => {
      const normalizedScroll = (value + containerWidth) % containerWidth;
      const newIndex = Math.floor(
        (normalizedScroll + (screenWidth - itemWidth) / 2) / itemWidth
      );
      runOnJS(setActiveIndex)(newIndex % events.length);
    }
  );

  useFrameCallback((frameInfo) => {
    const deltaSeconds = (frameInfo.timeSincePreviousFrame ?? 0) / 1000;
    scroll.value = scroll.value + scrollSpeed.value * deltaSeconds;
  });

  const gesture = Gesture.Pan()
    .onBegin(() => {
      scrollSpeed.value = 0;
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
    });
  return (
    <GestureDetector gesture={gesture}>
      <View className="h-full flex-row">
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
