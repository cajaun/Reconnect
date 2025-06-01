import { Text, Pressable } from "react-native";
import { usePuzzle } from "@/context/puzzle-context";
import { Word } from "@/types/puzzle";
import useShuffleAnimation from "@/hooks/use-shuffle-animation";
import Animated, {
  Easing,
  interpolate,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import React from "react";

type WordTileProps = {
  wordObject: Word;
  row: number;
  col: number;
  disabled?: boolean;
  progress: SharedValue<number>;
};

const WordTile = ({
  wordObject,
  row,
  col,
  disabled,
  progress,
}: WordTileProps) => {

  const {
    status,
    onWordClick,
    sortedSelectedWords,
  } = usePuzzle();

  const { word } = wordObject;

  const selected = sortedSelectedWords.some(
    (w) => w.word === wordObject.word && w.difficulty === wordObject.difficulty
  );

  const shuffleStyle = useShuffleAnimation({ row, col });

  const flipState = useSharedValue(0);

  const EasingsUtils = {
    inOut: Easing.bezier(0.25, 0.1, 0.25, 1),
  };

  useAnimatedReaction(
    () => progress.value >= 0.6,
    (shouldFlip, prevShouldFlip) => {
      if (shouldFlip !== prevShouldFlip) {
        flipState.value = withTiming(shouldFlip ? 1 : 0, {
          duration: 300,
          easing: EasingsUtils.inOut,
        });
      }
    },
    []
  );
  

  const frontStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateY: `${interpolate(flipState.value, [0, 1], [0, 180])}deg`,
        },
      ],
      backfaceVisibility: "hidden",
      position: "absolute",
      height: "100%",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    };
  });

  const backStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateY: `${interpolate(flipState.value, [0, 1], [-180, 0])}deg`,
        },
      ],
      backfaceVisibility: "hidden",
      position: "absolute",
      height: "100%",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    };
  });

  return (
    <Animated.View
      className="absolute h-1/4 w-1/4 "
      style={[shuffleStyle, { perspective: 1000 } as any]}
    >
      <Animated.View style={[frontStyle, { padding: 4 }]}>
        <Pressable
          disabled={disabled}
          className={`h-full w-full rounded-lg transition-transform ease-in-out active:scale-90  bg-[#F2F2F2]`}
        >
          <Text className="text-center text-xl uppercase font-semibold text-black my-auto">
            {word.charAt(0)}
          </Text>
        </Pressable>
      </Animated.View>

      <Animated.View style={[backStyle, { padding: 4 }]}>
        <Pressable
          disabled={disabled}
          className={`h-full w-full rounded-lg transition-transform ease-in-out active:scale-90 ${
            selected ? "bg-[#BFBFBF]" : "bg-[#F2F2F2]"
          } ${selected && status === "pending" ? "animate-bounce-up" : ""} ${
            selected && status === "failure" ? "animate-shake" : ""
          }`}
          onPress={() => onWordClick(wordObject)}
        >
          <Text
            className={`text-center text-xl uppercase font-semibold  my-auto ${
              selected ? "text-white" : "text-black"
            }`}
          >
            {word}
          </Text>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
};

export default React.memo(WordTile);
