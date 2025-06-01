import AsyncStorage from "@react-native-async-storage/async-storage";
import { Guess, Word } from "@/types/puzzle";
import { Status } from "@/types/status";
import { STORAGE_KEYS } from "./keys";
import { getDateForPuzzle } from "./puzzle-init";

const puzzleCache: { [puzzleId: number]: any } = {};

let cachedPuzzleIndex: number[] | null = null;

const getPuzzleKey = (puzzleId: number) => `puzzleData:${puzzleId}`;

const loadPuzzleIndex = async (): Promise<number[]> => {
  if (cachedPuzzleIndex) return cachedPuzzleIndex;

  try {
    const indexStr = await AsyncStorage.getItem(STORAGE_KEYS.PUZZLE_INDEX);
    const index = indexStr ? JSON.parse(indexStr) : [];
    cachedPuzzleIndex = index;
    return index;
  } catch (error) {
    console.error("Error loading puzzle index", error);
    return [];
  }
};

const savePuzzleIndex = async (index: number[]): Promise<void> => {
  try {
    cachedPuzzleIndex = index;
    await AsyncStorage.setItem(
      STORAGE_KEYS.PUZZLE_INDEX,
      JSON.stringify(index)
    );
  } catch (error) {
    console.error("Error saving puzzle index", error);
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
  if (puzzleCache[puzzleId]) return puzzleCache[puzzleId];

  try {
    const json = await AsyncStorage.getItem(getPuzzleKey(puzzleId));
    const data = json
      ? JSON.parse(json)
      : { status: "guessing", mistakes: 0, guesses: [], shuffledWords: [] };

    puzzleCache[puzzleId] = data;
    return data;
  } catch (error) {
    console.error("Error retrieving puzzle data:", error);
    return { status: "guessing", mistakes: 0, guesses: [], shuffledWords: [] };
  }
};

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
    const existingData = await getPuzzleData(puzzleId);

    const updatedData = {
      status: updates.status ?? existingData.status ?? "guessing",
      mistakes: updates.mistakes ?? existingData.mistakes ?? 0,
      guesses: updates.guesses ?? existingData.guesses ?? [],
      shuffledWords: updates.shuffledWords ?? existingData.shuffledWords ?? [],
    };

    await AsyncStorage.setItem(
      getPuzzleKey(puzzleId),
      JSON.stringify(updatedData)
    );
    await addToPuzzleIndex(puzzleId);


    // console.log("Updates ", updates.status)
    // console.log("Existing data ", existingData.status )
    if (
      updates.status === "complete" &&
      existingData.status !== "complete"
    ) {
      await addCompletionDateForPuzzle(puzzleId);
    }

    delete puzzleCache[puzzleId]; // invalidate cache
  } catch (error) {
    console.error("Error updating puzzle data:", error);
  }
};

export const addCompletionDateForPuzzle = async (puzzleId: number): Promise<void> => {
  const date = await getDateForPuzzle(puzzleId);
  const existingStr = await AsyncStorage.getItem(STORAGE_KEYS.COMPLETION_DATES);
  const existingDates = existingStr ? JSON.parse(existingStr) : [];

  if (!existingDates.includes(date)) {
    existingDates.push(date);
    await AsyncStorage.setItem(STORAGE_KEYS.COMPLETION_DATES, JSON.stringify(existingDates));
    console.log(`Added completion date for puzzle ${puzzleId}: ${date}`);
  }
};


export const clearPuzzleData = async (puzzleId: number): Promise<void> => {
  try {
    await AsyncStorage.removeItem(getPuzzleKey(puzzleId));

    const index = await loadPuzzleIndex();
    const updatedIndex = index.filter((id) => id !== puzzleId);
    await savePuzzleIndex(updatedIndex);

    delete puzzleCache[puzzleId];
  } catch (error) {
    console.error("Error clearing puzzle data:", error);
  }
};

const addToPuzzleIndex = async (puzzleId: number) => {
  try {
    const index = await loadPuzzleIndex();
    if (!index.includes(puzzleId)) {
      const updatedIndex = [...index, puzzleId];
      await savePuzzleIndex(updatedIndex);
    }
  } catch (e) {
    console.error("Error updating puzzle index", e);
  }
};

export const getAllPuzzleData = async (): Promise<Record<string, any>> => {
  try {
    const index = await loadPuzzleIndex();
    const keys = index.map(getPuzzleKey);
    const keyValuePairs = await AsyncStorage.multiGet(keys);

    const result: Record<string, any> = {};
    for (const [key, value] of keyValuePairs) {
      const puzzleId = key.replace("puzzleData:", "");
      result[puzzleId] = value
        ? JSON.parse(value)
        : { status: "guessing", mistakes: 0, guesses: [], shuffledWords: [] };
    }

    return result;
  } catch (error) {
    console.error("Error retrieving all puzzle data:", error);
    return {};
  }
};

export const clearPuzzleCache = (): void => {
  Object.keys(puzzleCache).forEach((key) => delete puzzleCache[+key]);
};

export const clearPuzzleCacheAndStorage = async (): Promise<void> => {
  try {
    const index = await loadPuzzleIndex();
    const keysToRemove = index
      .map(getPuzzleKey)
      .concat([
        STORAGE_KEYS.PUZZLE_INDEX,
        STORAGE_KEYS.LONGEST_STREAK,
        STORAGE_KEYS.START_DATE,
        STORAGE_KEYS.UNLOCKED_PUZZLES,
      ]);

    await AsyncStorage.multiRemove(keysToRemove);
    Object.keys(puzzleCache).forEach((key) => delete puzzleCache[+key]);
    cachedPuzzleIndex = null;

    console.log("Puzzle cache and storage cleared successfully.");
  } catch (error) {
    console.error("Error clearing puzzle cache and storage:", error);
  }
};
