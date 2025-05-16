import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';



import { ExpandedSheetMutableProgress } from '../shared-progress';

import { SheetContent } from './sheet-content';
import { MiniPlayerHeight } from './constants';

import { Palette } from '../palette';
import { SymbolView } from 'expo-symbols';

export const ExpandedSheet = () => {
  const { height: windowHeight} = useWindowDimensions();
  const progress = ExpandedSheetMutableProgress;

  const isTapped = useSharedValue(false);
  const progressThreshold = 0.8;
  const safeTop = useSafeAreaInsets().top;
 const EasingsUtils = {
  
    inOut: Easing.bezier(0.25, 0.1, 0.25, 1),
  };
  const tapGesture = Gesture.Tap()
    .onBegin(() => {
      if (progress.value >= progressThreshold) {
        return;
      }
      isTapped.value = true;
    })
    .onTouchesUp(() => {
      if (progress.value >= progressThreshold) {
        return;
      }

      progress.value = withTiming(1, {
        duration: 250,
        easing: EasingsUtils.inOut,
      });
    })
    .onFinalize(() => {
      isTapped.value = false;
    });

  const panEnabled = useSharedValue(false);
  const panGesture = Gesture.Pan()
    .onBegin(() => {
      if (progress.value === 0) return;
      panEnabled.value = true;
    })
    .onUpdate(event => {
      if (!panEnabled.value) return;
    
      const newProgress = interpolate(
        event.translationY,
        [0, windowHeight],
        [1, 0]
      );
    
      // If fully expanded and user swipes up (i.e., negative translation), block it
      if (progress.value >= 1 && event.translationY < 0) return;
    
      progress.value = newProgress;
    })
    .onFinalize(() => {
      if (!panEnabled.value) return;
      panEnabled.value = false;
      progress.value = withTiming(progress.value > progressThreshold ? 1 : 0, {
        duration: 350,
        easing: EasingsUtils.inOut,
      });
    });

    const rSheetStyle = useAnimatedStyle(() => {
      const sheetHeight = interpolate(
        progress.value,
        [0, 1],
        [MiniPlayerHeight, windowHeight]
      );
      // console.log(sheetHeight)
    
      return {
        height: sheetHeight,
        position: 'absolute',
        top: (windowHeight - sheetHeight) / 2,
        left: interpolate(progress.value, [0, 1], [16, 0]),
        right: interpolate(progress.value, [0, 1], [16, 0]),
        backgroundColor: interpolateColor(
          progress.value,
          [0, 1],
          ["white", 'white']
        ),
        borderColor: interpolateColor(
          progress.value,
          [0, 0.9, 1],
          ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.1)', 'transparent']
        ),
        borderRadius: interpolate(progress.value, [0, 0.9, 1], [24, 48, 0]),
        borderWidth: interpolate(
          progress.value,
          [0, 0.9, 1],
          [StyleSheet.hairlineWidth, StyleSheet.hairlineWidth, 0]
        ),
        shadowOpacity: interpolate(progress.value, [0, 1], [0.2, 0.5]),
        transform: [
          {
            scale: withTiming(isTapped.value ? 0.98 : 1, {
              easing: EasingsUtils.inOut,
            }),
          },
        ],
      };
    });

    const BaseOffset = (MiniPlayerHeight - 44) / 2;




  const gestures = Gesture.Simultaneous(tapGesture, panGesture);

  return (
    <GestureDetector gesture={gestures}>
      <Animated.View style={[rSheetStyle, styles.container]}>



 


        <SheetContent
          progress={progress}
          title="Happiness does not wait"
          subtitle="Ólafur Arnalds"
          imageUrl="https://i3.ytimg.com/vi/BgO08T3E4LE/maxresdefault.jpg"
        />
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  knob: {
    width: 98,
    height: 6,
    borderRadius: 36,
    backgroundColor: 'red',
  },
  container: {
    position: 'absolute',
    borderCurve: 'continuous',
    zIndex: 1000,
    shadowColor: Palette.card,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
  },
  knobContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    zIndex: 1001,
  }
});
