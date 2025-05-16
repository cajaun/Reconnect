import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { ExpandedSheetMutableProgress } from '../shared-progress';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { ExpandedSheet } from '../expanded-sheet';
import { Palette } from '../palette';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ExpandablePlayer = () => {
  const { top: safeTop } = useSafeAreaInsets();
  const progress = ExpandedSheetMutableProgress;

  const rScreenStyle = useAnimatedStyle(() => {
    return {
      borderRadius: interpolate(progress.value, [0, 1], [0, 48]),
      borderCurve: 'continuous',

    };
  });

  return (
    <View style={styles.screenWrapper}>

  
<Animated.View
        style={[
          styles.container,
      
          rScreenStyle,
        ]}>
        <ExpandedSheet/>
      </Animated.View>
      </View>
  )
}

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 32,
    fontWeight: '600',
  },
});

export default ExpandablePlayer