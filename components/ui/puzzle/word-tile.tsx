import { View, Text, Pressable, Animated } from "react-native";
import { usePuzzle } from "@/context/puzzle-context";
import { useEffect, useMemo, useRef } from "react";
import { Word } from "@/types/puzzle";
import { difficultyToColor } from "@/types/difficulty";
import useShuffleAnimation from "@/hooks/use-shuffle-animation";
import { FadeIn } from "../utils/fade-in";

type WordTileProps = {
  wordObject: Word;
};

const WordTile = ({ wordObject }: WordTileProps) => {
  const {
    shuffledWords,
    status,
    onWordClick,
    correctGuesses,
    categories,
    sortedSelectedWords,
  } = usePuzzle();
  const { difficulty, word } = wordObject;

  const location = useMemo(
    () => shuffledWords.indexOf(wordObject),
    [shuffledWords, wordObject]
  );
  // const idxInSelected = sortedSelectedWords.indexOf(wordObject);
  // const selected = idxInSelected !== -1;
  
  const selected = sortedSelectedWords.some(
    w => w.word === wordObject.word && w.difficulty === wordObject.difficulty
  );

  
  const correct = correctGuesses.find(({ words }) =>
    words.includes(wordObject)
  );

  const { row, animatedStyle } = useShuffleAnimation(location);

  
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
            <FadeIn >
              <Text className="text-xl font-bold uppercase text-black mx-auto">
                {category?.description}
              </Text>
              <Text className = "mx-auto">{correct.words.map(({ word }) => word).join(", ")}</Text>
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
        className={` h-full w-full rounded-lg font-bold transition-transform ease-in-out active:scale-90 ${
          selected ? " bg-[#BFBFBF] " : " bg-[#F2F2F2] "
        } ${selected && status === "pending" && `animate-bounce-up`} ${
          selected && status === "failure" && `animate-shake`
        }`}
        onPress={() => onWordClick(wordObject)}
      >
        <Text className={`text-center text-xl uppercase font-semibold  my-auto ${selected ? "text-white" : "text-black"}` }>
          {word}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

export default WordTile;
