import { Guess, Word } from "@/types/puzzle";
import { Status } from "@/types/status";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const updatePuzzleData = async (
  puzzleId: number,
  updates: {
    status?: Status; 
    mistakes?: number;
    guesses?: Guess[];
    shuffledWords?: Word[]; 
  }
): Promise<void> => {
  try {
    const puzzleData = JSON.parse(
      (await AsyncStorage.getItem("puzzleData")) || "{}"
    );

    const currentPuzzle = puzzleData[puzzleId] || {};

    puzzleData[puzzleId] = {
      ...currentPuzzle,
      status: updates.status ?? currentPuzzle.status ?? "guessing",
      mistakes: updates.mistakes ?? currentPuzzle.mistakes ?? 0,
      guesses: updates.guesses ?? currentPuzzle.guesses ?? [],
      shuffledWords: updates.shuffledWords ?? currentPuzzle.shuffledWords ?? [], 
    };

    await AsyncStorage.setItem("puzzleData", JSON.stringify(puzzleData));
  } catch (error) {
    console.error("Error updating puzzle data:", error);
  }
};



export const getPuzzleData = async (
  puzzleId: number
): Promise<{
  status: Status;
  mistakes: number;
  guesses: Guess[];
  shuffledWords: Word[];
}> => {
  try {
    const puzzleData = JSON.parse(
      (await AsyncStorage.getItem("puzzleData")) || "{}"
    );

    return (
      puzzleData[puzzleId] || {
        status: "guessing",
        mistakes: 0,
        guesses: [],
        shuffledWords: [],
      }
    );
  } catch (error) {
    console.error("Error retrieving puzzle data:", error);
    return { status: "guessing", mistakes: 0, guesses: [], shuffledWords: [] };
  }
};



export const markPuzzleCompleted = async (puzzleId: number): Promise<void> => {

  await updatePuzzleData(puzzleId, { status: "complete" });
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


export const setPuzzleMistakes = async (
  puzzleId: number,
  mistakes: number
): Promise<void> => {

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
    const puzzleData = JSON.parse(
      (await AsyncStorage.getItem("puzzleData")) || "{}"
    );

    delete puzzleData[puzzleId]; 

    await AsyncStorage.setItem("puzzleData", JSON.stringify(puzzleData));
  } catch (error) {
    console.error("Error clearing puzzle data:", error);
  }
};
