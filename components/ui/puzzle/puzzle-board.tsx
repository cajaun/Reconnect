import { View } from "react-native";
import { usePuzzle } from "@/context/puzzle-context";
import WordTile from "./word-tile";
import MistakesTracker from "./mistakes";
import PuzzleControls from "./puzzle-controls";

const PuzzleBoard = () => {
  const { initialShuffle } = usePuzzle();

  return (
    <View className="relative w-full px-1">
      <View className="flex-col items-center gap-6">
        <View className="relative flex w-full aspect-square">
          {initialShuffle.map((word, idx) => (
            <WordTile key={idx} wordObject={word} />
          ))}
        </View>
        <MistakesTracker />
        <PuzzleControls />
      </View>
    </View>
  );
};

export default PuzzleBoard;
