import { View } from "react-native";
import { usePuzzle } from "@/context/puzzle-context";
import { SymbolView } from "expo-symbols";
import * as Haptics from "expo-haptics";

const MistakesTracker = () => {
  const { correctGuesses, guesses } = usePuzzle();
  const mistakes = guesses.length - correctGuesses.length;

  return (
    <View className="flex flex-row items-center gap-1  p-2 rounded-2xl ">
      <View className="flex flex-row items-center gap-1 p-2 rounded-2xl">
        {Array.from(Array(4)).map((_, idx) => {
          const isMistake = idx < mistakes;

          return (
            <View key={idx} className="flex items-center justify-center">
              <SymbolView
                name="flame.fill"
                weight="bold"
                size={20}
                tintColor={isMistake ? "black" : "#DFDFDF"}
                // animationSpec={
                //   isMistake
                //     ? {
                //         effect: {
                //           type: "bounce",
                //           wholeSymbol: true,
                //         },
                //         speed: 1,
                //       }
                //     : undefined
                // }
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default MistakesTracker;
