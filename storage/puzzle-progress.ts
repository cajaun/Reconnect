import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "./keys";
import { getCurrentStreak, updateLongestStreak } from "./puzzle-streak";
import { getPuzzleData, updatePuzzleData } from "./puzzle-data";

export const markPuzzleCompleted = async (puzzleId: number): Promise<void> => {
  await updatePuzzleData(puzzleId, { status: "complete" });

  const currentStreak = await getCurrentStreak();
  await updateLongestStreak(currentStreak);
};

export const isPuzzleCompleted = async (puzzleId: number): Promise<boolean> => {
  try {
    const puzzle = await getPuzzleData(puzzleId);
    return puzzle.status === "complete";
  } catch (error) {
    console.error("Error checking puzzle completion state:", error);
    return false;
  }
};

export const setPuzzleMistakes = async (puzzleId: number, mistakes: number): Promise<void> => {
  await updatePuzzleData(puzzleId, { mistakes });
};

export const getPuzzleMistakes = async (puzzleId: number): Promise<number> => {
  try {
    const puzzle = await getPuzzleData(puzzleId);
    return puzzle.mistakes;
  } catch (error) {
    console.error("Error retrieving puzzle mistakes:", error);
    return 0;
  }
};

export const clearPuzzleData = async (puzzleId: number): Promise<void> => {
  try {
    await AsyncStorage.removeItem(`puzzleData:${puzzleId}`);

    const indexStr = await AsyncStorage.getItem(STORAGE_KEYS.PUZZLE_INDEX);
    if (indexStr) {
      const index: number[] = JSON.parse(indexStr);
      const updatedIndex = index.filter((id) => id !== puzzleId);
      await AsyncStorage.setItem(
        STORAGE_KEYS.PUZZLE_INDEX,
        JSON.stringify(updatedIndex)
      );
    }
  } catch (error) {
    console.error("Error clearing puzzle data:", error);
  }
};