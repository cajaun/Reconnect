import { View, Text, Pressable } from "react-native";
import { usePuzzle } from "@/context/puzzle-context";
import { useEffect, useMemo, useRef } from "react";
import { Word } from "@/types/puzzle";
import { difficultyToColor } from "@/types/difficulty";
import useShuffleAnimation from "@/hooks/use-shuffle-animation";
import { FadeIn } from "../utils/fade-in";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

type WordTileProps = {
  wordObject: Word;
  disabled?: boolean;
  progress: SharedValue<number>;
};

const WordTile = ({ wordObject, disabled, progress }: WordTileProps) => {
  const {
    shuffledWords,
    status,
    onWordClick,
    correctGuesses,
    categories,
    sortedSelectedWords,
  } = usePuzzle();

  const { difficulty, word } = wordObject;

  const location = shuffledWords.findIndex((w) => w.id === wordObject.id);

  const selected = sortedSelectedWords.some(
    (w) => w.word === wordObject.word && w.difficulty === wordObject.difficulty
  );

  const correct = correctGuesses.find(({ words }) =>
    words.includes(wordObject)
  );

  const { row, animatedStyle } = useShuffleAnimation(location);

  const rtextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0.6, 1], [0, 1]);
    const scale = interpolate(progress.value, [0.6, 1], [0.75, 1]);

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  // console.log(location, wordObject.word)

  if (correct) {
    if (location % 4 === 0) {
      const category = categories.find(
        ({ difficulty: categoryDifficulty }) =>
          categoryDifficulty === difficulty
      );

      const color = difficultyToColor[difficulty];
      return (
        <View
          className="absolute left-0 w-full h-1/4 p-1"
          style={{ top: `${row * 25}%` }}
        >
          <View
            className="flex-col h-full w-full items-center justify-center rounded-md p-2 "
            style={{ backgroundColor: color }}
          >
            <FadeIn>
              <Text className="text-xl font-bold uppercase text-black mx-auto">
                {category?.description}
              </Text>
              <Text className="mx-auto">
                {correct.words.map(({ word }) => word).join(", ")}
              </Text>
            </FadeIn>
          </View>
        </View>
      );
    }
    return null;
  }

  return (
    <Animated.View className="absolute h-1/4 w-1/4 p-1" style={animatedStyle}>
      <Pressable
        disabled={disabled}
        className={` h-full w-full rounded-lg font-bold transition-transform ease-in-out active:scale-90 ${
          selected ? " bg-[#BFBFBF] " : " bg-[#F2F2F2] "
        } ${selected && status === "pending" && `animate-bounce-up`} ${
          selected && status === "failure" && `animate-shake`
        }`}
        onPress={() => onWordClick(wordObject)}
      >
        <Text
          className={`text-center text-xl uppercase font-semibold my-auto flex-row ${
            selected ? "text-white" : "text-black"
          }`}
        >
          {word.charAt(0)}

          {disabled && progress.value >= 0.6 && (
            <Animated.Text style={rtextStyle}>{word.slice(1)}</Animated.Text>
          )}

          {!disabled && word.slice(1)}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

export default WordTile;
