import AsyncStorage from "@react-native-async-storage/async-storage";

export const setStartDate = async (): Promise<void> => {
  try {
    const startDate = await AsyncStorage.getItem("startDate");
    if (!startDate) {


      const today = new Date("2025-05-01T12:00:00Z");
      // const today = new Date();

      const localDateString =
        today.getFullYear() +
        "-" +
        String(today.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(today.getDate()).padStart(2, "0");
      await AsyncStorage.setItem("startDate", localDateString);
    }
  } catch (error) {
    console.error("Error setting start date:", error);
  }
};

export const getDaysElapsed = async (): Promise<number> => {
  try {
    const startDate = await AsyncStorage.getItem("startDate");
    if (!startDate) return 0;

    const start = new Date(startDate + "T00:00:00Z");
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
    const unlockedPuzzles: { [key: number]: boolean } = {};

    for (let i = 1; i <= daysElapsed + 1; i++) {
      unlockedPuzzles[i] = true;
    }

    await AsyncStorage.setItem(
      "unlockedPuzzles",
      JSON.stringify(unlockedPuzzles)
    );
  } catch (error) {
    console.error("Error unlocking puzzles:", error);
  }
};

export const isPuzzleUnlocked = async (puzzleId: number): Promise<boolean> => {
  try {
    const unlockedPuzzles = JSON.parse(
      (await AsyncStorage.getItem("unlockedPuzzles")) || "{}"
    );
    return !!unlockedPuzzles[puzzleId];
  } catch (error) {
    console.error("Error checking puzzle unlock state:", error);
    return false;
  }
};

export const getUnlockedPuzzles = async (): Promise<{
  [key: number]: boolean;
}> => {
  try {
    const unlockedPuzzles = JSON.parse(
      (await AsyncStorage.getItem("unlockedPuzzles")) || "{}"
    );
    return unlockedPuzzles;
  } catch (error) {
    console.error("Error fetching unlocked puzzles:", error);
    return {};
  }
};

export const getStartDate = async (): Promise<string | null> => {
  try {
    const date = await AsyncStorage.getItem("startDate");
    return date;
  } catch {
    return null;
  }
};
