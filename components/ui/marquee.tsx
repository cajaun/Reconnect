import { View, Image, useWindowDimensions, Text } from "react-native";
import React, { PropsWithChildren, useEffect, useState } from "react";
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

type MarqueeItemProps = {
  index: number;
  scroll: SharedValue<number>;
  containerWidth: number;
  itemWidth: number;
};
const MarqueeItem = ({
  index,
  scroll,
  containerWidth,
  itemWidth,
  children
}: PropsWithChildren<MarqueeItemProps>) => {
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
      [ 0, screenWidth - itemWidth],
      [-1,  1]
    );

    const translateY = interpolate(
      position,
      [ 0, (screenWidth - itemWidth) / 2, screenWidth - itemWidth],
      [3, 0, 3]
    );

    return {
      left: position,
      transform: [{ rotateZ: `${rotation}deg` }, { translateY }],
    };
  });

  return (

    <Animated.View
      className="absolute h-full  p-2  "
      style={[{ width: itemWidth, transformOrigin: "bottom" }, animatedStyle]}
    >
      {children}


      {/* <Image source={event.image}  /> */}
    </Animated.View>

  );
};

const Marquee = ({
  items,
  onIndexChange,
  renderItem,
}: {
  items: any[];
  onIndexChange?: (index: number) => void;
  renderItem: ({item, index}: {item: any, index: number}) => React.ReactNode;
}) => {
  const { width: screenWidth } = useWindowDimensions();
  const itemWidth = screenWidth * 0.65;
  const containerWidth = items.length * itemWidth;
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
      newIndex = Math.max(0, Math.min(newIndex, items.length - 1));

      if (newIndex !== activeIndex) {
        runOnJS(setActiveIndex)(newIndex);

        if (isUserScrolling.value) {
          runOnJS(Haptic.impactAsync)(Haptic.ImpactFeedbackStyle.Soft);
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
        {items.map((item, index) => (
          <MarqueeItem
            key={item.id}
            index={index}
            scroll={scroll}
            containerWidth={containerWidth}
            itemWidth={itemWidth}
            
          >
            {renderItem({item, index})}
          </MarqueeItem>
        ))}
      </View>
    </GestureDetector>
  );
};

export default Marquee;
