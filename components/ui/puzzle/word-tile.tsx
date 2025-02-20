import { View, Text, Pressable, Animated } from "react-native";
import { usePuzzle } from "@/context/puzzle-context";
import { useEffect, useMemo, useRef } from "react";
import { Word } from "@/types/puzzle";
import useShuffleAnimation from "@/hooks/use-shuffle-animation";

type WordTileProps = {
  wordObject: Word;
};

const WordTile = ({ wordObject }: WordTileProps) => {
  const { shuffledWords, status, onWordClick, correctGuesses, categories, sortedSelectedWords } = usePuzzle();
  const { difficulty, word } = wordObject;

  const location = useMemo(() => shuffledWords.indexOf(wordObject), [shuffledWords, wordObject]);
  const idxInSelected = sortedSelectedWords.indexOf(wordObject);
  const selected = idxInSelected !== -1;
  const correct = correctGuesses.some(({ words }) => words.includes(wordObject));

  const { animatedStyle } = useShuffleAnimation(location);

  if (correct) {
    return null;
  }

  return (
    <Animated.View className="absolute h-1/4 w-1/4 p-1" style={animatedStyle}>
      <Pressable
        className={`h-full w-full rounded-md font-bold transition-transform ease-in-out ${
          selected ? "bg-darkGray dark:bg-disabled-gray" : "bg-lightGray"
        } ${selected && status === "pending" && `animate-bounce-up`} ${selected && status === "failure" && `animate-shake`}`}
        onPress={() => onWordClick(wordObject)}
      >
        <Text className="text-center text-xl uppercase font-semibold text-black my-auto">
          {word}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

export default WordTile;
