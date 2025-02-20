import { View, Text } from "react-native";
import { usePuzzle } from "@/context/puzzle-context";

const MistakesTracker = () => {
  const { correctGuesses, guesses } = usePuzzle();

  return (
    <View className="flex-row items-center gap-2.5">
      <Text>Mistakes remaining:</Text>
      <View className="flex w-24 flex-row items-center gap-2.5">
        {Array.from(Array(4)).map((_, idx) => (
          <View
            key={idx}
            className={`h-4 w-4 rounded-full bg-darkGray transition-transform duration-300 ${
              idx + 1 > 4 - (guesses.length - correctGuesses.length) ? "scale-0" : "scale-100"
            }`}
          />
        ))}
      </View>
    </View>
  );
};

export default MistakesTracker;
