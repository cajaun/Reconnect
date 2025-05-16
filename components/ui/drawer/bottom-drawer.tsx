import React, { useEffect, useMemo, useRef } from "react";
import { View, TouchableOpacity, StyleSheet, Modal, Dimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
  useSharedValue,
  runOnJS,
  useAnimatedStyle,
  clamp,
  withSpring,
  useDerivedValue,
  Easing,
  LinearTransition,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HORIZONTAL_MARGIN = 16;
const PADDING = 24;
const BORDER_RADIUS = 28;
const MIN_DURATION = 120;
const MAX_DURATION = 280;

type BottomDrawerProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  view: string;
  contentMap: Record<string, React.ReactNode>;
};

const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function BottomDrawer({
  isOpen,
  setIsOpen,
  view,
  contentMap,
}: BottomDrawerProps) {
  const { bottom } = useSafeAreaInsets();
  const translateY = useSharedValue(0);
  const contentHeight = useSharedValue(0);
  const previousHeightRef = useRef(0);
const handleClose = () => {
  // Animate down first
  translateY.value = withSpring(500, {}, () => {
    // Delay the state change to allow animations to finish
    runOnJS(setIsOpen)(false);
    translateY.value = 0;
  });

  overlayOpacity.value = withTiming(0, {
    duration: 200,
    easing: customEasing,
  });
};



  const context = useSharedValue({ y: 0 });



  const panGesture = Gesture.Pan()
  .onStart(() => {
    context.value = { y: translateY.value };
  })
  .onUpdate((event) => {
    const nextY = event.translationY + context.value.y;
    translateY.value = Math.max(nextY, 0); // Only allow downward movement
  })
  .onEnd((event) => {
    const shouldClose =  translateY.value + event.velocityY / 60;

    if (shouldClose) {
      translateY.value = withSpring(500, {}, () => {
        runOnJS(setIsOpen)(false);
        translateY.value = 0; // Reset for next open
      });
    } else {
      translateY.value = withSpring(0); // Snap back into place
    }
  });


  const rDrawerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const opacityDuration = useDerivedValue(() => {
    if (previousHeightRef.current === 0) {
      previousHeightRef.current = contentHeight.value;
      return MIN_DURATION;
    }

    const heightDifference = Math.abs(
      contentHeight.value - previousHeightRef.current
    );
    previousHeightRef.current = contentHeight.value;

    return Math.min(
      Math.max((heightDifference / 500) * 1000, MIN_DURATION),
      MAX_DURATION
    );
  });

  const heightEasing = Easing.bezier(0.26, 1, 0.5, 1).factory();
  const contentEasing = Easing.bezier(0.26, 0.8, 0.25, 1).factory();

  const layoutAnimationConfig = useMemo(
    () => LinearTransition.duration(MAX_DURATION).easing(heightEasing),
    []
  );

  const content = useMemo(() => contentMap[view] || null, [view, contentMap]);

  const overlayOpacity = useSharedValue(0); // Start invisible

  const customEasing = Easing.bezier(0.165, 0.84, 0.44, 1);

  useEffect(() => {
    if (isOpen) {
      // Apply transition with the desired cubic-bezier easing
      overlayOpacity.value = withTiming(1, {
        duration: 200,
        easing: customEasing,
      });
    } else {
      overlayOpacity.value = withTiming(0, {
        duration: 200,
        easing: customEasing,
      });
    }
  }, [isOpen]);

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  if (!isOpen) {
    contentHeight.value = 0; 
    return null;
  }

  
  return (
    <Modal visible={isOpen} transparent={true} animationType="fade">
 
      <Animated.View style={[styles.overlay, overlayStyle]}>
        <TouchableOpacity style={StyleSheet.absoluteFill} onPress={handleClose} />
      </Animated.View>

      <GestureDetector gesture={panGesture}>
        {/* Slide in/out the drawer separately */}
        <Animated.View
          style={[styles.drawer, { bottom: bottom }, rDrawerStyle]}
          entering={SlideInDown.duration(150).easing(
            Easing.bezier(0.4, 0, 0.2, 1).factory()
          )}
          exiting={SlideOutDown.duration(150).easing(
            Easing.bezier(0.4, 0, 0.2, 1).factory()
          )}
          layout={layoutAnimationConfig}
          onLayout={(event) => {
            contentHeight.value = event.nativeEvent.layout.height;
          }}
        >
          <View style={styles.content}>
            <Animated.View
              entering={FadeIn.duration(opacityDuration.value).easing(
                contentEasing
              )}
              exiting={FadeOut.duration(opacityDuration.value).easing(
                contentEasing
              )}
              key={view} // Ensures animation when changing content
            >
              {content}
            </Animated.View>
          </View>
        </Animated.View>
      </GestureDetector>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  drawer: {
    position: "absolute",
    left: HORIZONTAL_MARGIN,
    right: HORIZONTAL_MARGIN,
    backgroundColor: "white",
    borderRadius: BORDER_RADIUS,
    overflow: "hidden",
  },
  content: {
    padding: PADDING,
  },
});
