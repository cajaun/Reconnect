import { View, Pressable, Text } from "react-native";
import { usePuzzle } from "@/context/puzzle-context";

const PuzzleControls = () => {
  const { status, shuffle, deselect, onSubmit } = usePuzzle();

  return (
    <View className="flex-row gap-2.5">
      <Pressable className="rounded-full border border-black px-4 py-3 active:bg-gray-300 dark:border-white" onPress={shuffle}>
        <Text>Shuffle</Text>
      </Pressable>
      <Pressable className="rounded-full border border-black px-4 py-3 active:bg-gray-300 dark:border-white" onPress={deselect}>
        <Text>Deselect All</Text>
      </Pressable>
      <Pressable
        className="rounded-full border bg-darkGray px-4 py-3 text-white active:bg-gray-600 disabled:border-gray-400 disabled:bg-white disabled:text-gray-400 dark:bg-white dark:text-black dark:disabled:bg-black"
        disabled={status !== "submittable"}
        onPress={onSubmit}
      >
        <Text>Submit</Text>
      </Pressable>
    </View>
  );
};

export default PuzzleControls;
