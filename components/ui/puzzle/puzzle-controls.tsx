import { View, Pressable, Text } from "react-native";
import { usePuzzle } from "@/context/puzzle-context";
import { SymbolView } from "expo-symbols";
import { PressableScale } from "../utils/pressable-scale";

const PuzzleControls = () => {
  const { status, shuffle, deselect, onSubmit, reset } = usePuzzle();

  return (
    <View className="flex-row justify-between items-center w-full px-8">

      <PressableScale onPress={reset} 
      className="rounded-full w-16 h-16 items-center bg-[#F2F2F2]  justify-center ">
        <SymbolView
          name="arrow.counterclockwise"
          weight="bold"
          tintColor={"black"}
          size={25}
        />
      </PressableScale>


      <View className="flex-row gap-2.5">
        <PressableScale onPress={shuffle} className="rounded-full w-16 h-16 items-center bg-[#F2F2F2]  justify-center">
          <SymbolView name="shuffle" tintColor={"black"} weight="bold" size={25} />
        </PressableScale>

        <PressableScale onPress={deselect} className="rounded-full w-16 h-16 items-center bg-[#F2F2F2]  justify-center">
          <SymbolView name="eraser.fill" size={25} tintColor={"black"} weight="bold"  />
        </PressableScale>
      </View>

     
      <PressableScale
        className="rounded-full w-16 h-16 items-center bg-[#F2F2F2]  justify-center"
        disabled={status !== "submittable"}
        onPress={onSubmit}
      >
        <SymbolView name="paperplane.fill" size={25} tintColor={"black"} weight="bold"  />
      </PressableScale>
    </View>
  );
};

export default PuzzleControls;
