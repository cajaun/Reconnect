import { View, Text } from "react-native";
import { allPuzzles } from "@/utils/puzzle-data";

const MarqueeBoard = () => {
  const currentPuzzle = allPuzzles[1];
  const words = currentPuzzle.words;

  return (
    <View className="relative w-full h-full  px-4 ">
      <View className="flex-col items-center gap-6 my-auto">
        <View className="relative flex w-full aspect-square">
          {words.map((wordObj, idx) => {

            const row = Math.floor(idx / 4); 
            const col = idx % 4; 
            return (
              <View
                key={wordObj.id}
                className="absolute h-1/4 w-1/4 p-1"
                style={{
                  top: `${row * 25}%`,
                  left: `${col * 25}%`,
                }}
              >
                <View
                  className="h-full w-full rounded-md font-bold  bg-lightGray"
                >
                  <Text className="text-center text-xs uppercase font-bold text-black my-auto">
                    {wordObj.word}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default MarqueeBoard;
