import { View, Pressable, Text } from "react-native";
import { usePuzzle } from "@/context/puzzle-context";

const PuzzleControls = () => {
  const { status, shuffle, deselect, onSubmit } = usePuzzle();

  return (
    <View className="flex-row gap-2.5">
      <Pressable className="rounded-full border border-black px-4 py-3 active:bg-lightGray dark:border-white" onPress={shuffle}>
        <Text>Shuffle</Text>
      </Pressable>
      <Pressable className="rounded-full border border-black px-4 py-3 active:bg-lightGray dark:border-white" onPress={deselect}>
        <Text>Deselect All</Text>
      </Pressable>
      <Pressable
        className="rounded-full border  px-4 py-3 text-white"
        disabled={status !== "submittable"}
        onPress={onSubmit}
      >
        <Text>Submit</Text>
      </Pressable>
    </View>
  );
};

export default PuzzleControls;
