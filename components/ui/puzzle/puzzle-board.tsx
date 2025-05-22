import { Pressable, Text, View } from "react-native";
import { usePuzzle } from "@/context/puzzle-context";
import WordTile from "./word-tile";
import { SharedValue } from "react-native-reanimated";
import { difficultyToColor } from "@/types/difficulty";
import { FadeIn } from "../utils/fade-in";
import { getPuzzleWordLayout } from "@/utils/puzzle-utils";
import { useMemo } from "react";

const PuzzleBoard = ({
  interactive,
  progress,
}: {
  interactive?: boolean;
  progress: SharedValue<number>;
}) => {

  
  const { shuffledWords, id, hasInitialized, correctGuesses, categories } =
    usePuzzle();

    const { solvedGroups, adjustedWordPositions } = useMemo(() =>
      getPuzzleWordLayout(shuffledWords, correctGuesses), [shuffledWords, correctGuesses]
    );

  if (!hasInitialized) return null;

//   console.log("shuffledWords", shuffledWords.map(w => w.word));
// console.log("solvedWordIds", solvedWordIds);

  return (
    <View key={`puzzle-${id}`} className="relative w-full px-1">
      <View className="flex-col">
        <View className="relative flex w-full aspect-square flex-wrap gap-1">
          {solvedGroups.map(({ correct, difficulty, row }) => {
            const category = categories.find(
              ({ difficulty: categoryDifficulty }) =>
                categoryDifficulty === difficulty
            );

            const color = difficultyToColor[difficulty];

            return (
              <View
                key={`banner-${difficulty}`}
                className="absolute left-0 w-full h-1/4 p-1"
                style={{ top: `${row * 25}%` }}
              >
                <View
                  className="flex-col h-full w-full items-center justify-center rounded-md p-2"
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
          })}

          {adjustedWordPositions.map(({ word, row, col }) => (
            <WordTile
              key={`${id}-${word.id}`}
              wordObject={word}
              row={row}
              col={col}
              disabled={!interactive}
              progress={progress}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default PuzzleBoard;
