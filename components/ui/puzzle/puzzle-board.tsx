import { Pressable, Text, View } from "react-native";
import { usePuzzle } from "@/context/puzzle-context";
import WordTile from "./word-tile";
import { SharedValue } from "react-native-reanimated";

const PuzzleBoard = ({
  interactive,
  progress,
}: {
  interactive?: boolean;
  progress: SharedValue<number>;
}) => {
  const { shuffledWords, id, hasInitialized } = usePuzzle();

  if (!hasInitialized) return null; 

  // console.log(shuffledWords)

  return (
    <View key={`puzzle-${id}`} className="relative w-full px-1 ">
      <View className="flex-col">
        <View className="relative flex w-full aspect-square flex-wrap">
          {shuffledWords.map((word) => (
            <WordTile
              key={`${id}-${word.id}`}
              wordObject={word}
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
