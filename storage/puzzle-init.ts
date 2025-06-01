import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "./keys";
import { getFormattedDate } from "@/utils/dates-manager";

export const setStartDate = async (): Promise<void> => {
  try {
    const startDate = await AsyncStorage.getItem(STORAGE_KEYS.START_DATE);
    if (!startDate) {
      // const today = new Date();
      const today = new Date(2025, 4, 27);

      const localDateString = getFormattedDate(today);
      await AsyncStorage.setItem(STORAGE_KEYS.START_DATE, localDateString);
    }
  } catch (error) {
    console.error("Error setting start date:", error);
  }
};

export const getStartDate = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEYS.START_DATE);
  } catch (error) {
    console.error("Error getting start date:", error);
    return null;
  }
};

export const getDaysElapsed = async (): Promise<number> => {
  try {
    const startDate = await AsyncStorage.getItem(STORAGE_KEYS.START_DATE);
    if (!startDate) return 0;

    const [year, month, day] = startDate.split("-").map(Number);
    const start = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const differenceInTime = today.getTime() - start.getTime();
    return Math.floor(differenceInTime / (1000 * 3600 * 24));
  } catch (error) {
    console.error("Error calculating days elapsed:", error);
    return 0;
  }
};

export const unlockPuzzles = async (): Promise<void> => {
  try {
    const daysElapsed = await getDaysElapsed();
    const unlockedPuzzles: Record<number, boolean> = {};

    for (let i = 1; i <= daysElapsed + 1; i++) {
      unlockedPuzzles[i] = true;
    }

    await AsyncStorage.setItem(
      STORAGE_KEYS.UNLOCKED_PUZZLES,
      JSON.stringify(unlockedPuzzles)
    );
  } catch (error) {
    console.error("Error unlocking puzzles:", error);
  }
};

export const isPuzzleUnlocked = async (puzzleId: number): Promise<boolean> => {
  try {
    const unlockedStr = await AsyncStorage.getItem(STORAGE_KEYS.UNLOCKED_PUZZLES);
    const unlocked = unlockedStr ? JSON.parse(unlockedStr) : {};
    return !!unlocked[puzzleId];
  } catch (error) {
    console.error("Error checking puzzle unlock state:", error);
    return false;
  }
};

export const getUnlockedPuzzles = async (): Promise<Record<number, boolean>> => {
  try {
    const unlockedStr = await AsyncStorage.getItem(STORAGE_KEYS.UNLOCKED_PUZZLES);
    return unlockedStr ? JSON.parse(unlockedStr) : {};
  } catch (error) {
    console.error("Error fetching unlocked puzzles:", error);
    return {};
  }
};

export const getDateForPuzzle = async (puzzleId: number): Promise<string> => {
  const startDateStr = await getStartDate(); 
  if (!startDateStr) throw new Error("Start date not set");

  const [year, month, day] = startDateStr.split("-").map(Number);
  const startDate = new Date(year, month - 1, day);

  const puzzleDate = new Date(startDate);
  puzzleDate.setDate(puzzleDate.getDate() + puzzleId - 1);

  return getFormattedDate(puzzleDate);
};
