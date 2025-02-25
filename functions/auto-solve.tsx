import { Word } from "@/types/puzzle";
import { Guess } from "@/types/puzzle";
import { toast } from "sonner-native";
import { sleep } from "@/utils/puzzle-utils";
import { Status } from "@/types/status";
import { difficultyArray } from "@/types/difficulty";

interface AutoSolveProps {
  guesses: Guess[];
  shuffledWords: Word[];
  correctGuesses: { words: Word[] }[];
  setShuffledWords: React.Dispatch<React.SetStateAction<Word[]>>;
  setGuesses: React.Dispatch<React.SetStateAction<Guess[]>>;
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
  setSelectedWords: React.Dispatch<React.SetStateAction<Word[]>>;
}

export const autoSolve = async ({
  shuffledWords,
  correctGuesses,
  setShuffledWords,
  setGuesses,
  setStatus,
  setSelectedWords,
}: AutoSolveProps) => {
  try {
    console.log("Starting autoSolve...");
    setSelectedWords([]);
    await sleep(500);

    let newShuffledWords = [...shuffledWords];

    // find solved groups if they exist
    const solvedCategories = new Map(
      correctGuesses.map((group) => [group.words[0].difficulty, group.words])
    );

    console.log("Already solved categories:", solvedCategories);

    // group words from before for efficient lookups
    const groupedWordsByDifficulty = new Map<string, Word[]>();
    for (const word of newShuffledWords) {
      if (!groupedWordsByDifficulty.has(word.difficulty)) {
        groupedWordsByDifficulty.set(word.difficulty, []);
      }
      groupedWordsByDifficulty.get(word.difficulty)!.push(word);
    }

    // find first unsolved category index
    const firstUnsolvedIndex = difficultyArray.findIndex(
      (difficulty) => !solvedCategories.has(difficulty)
    );

    if (firstUnsolvedIndex === -1) {
      console.log("All categories already solved.");
      setStatus("complete");
      return;
    }

    console.log("Starting autosolve at:", difficultyArray[firstUnsolvedIndex]);

    // rrack the next available row for placement
    let nextAvailableRow = 0;
    for (let i = 0; i < difficultyArray.length; i++) {
      if (solvedCategories.has(difficultyArray[i])) {
        nextAvailableRow++; // skip solved categories
      }
    }

    for (let i = firstUnsolvedIndex; i < difficultyArray.length; i++) {
      const difficulty = difficultyArray[i];

      if (solvedCategories.has(difficulty)) continue; // skip already solved categories

      const groupedWords = groupedWordsByDifficulty.get(difficulty);
      if (!groupedWords || groupedWords.length !== 4) {
        console.error(`Error: ${difficulty} does not have 4 words.`);
        continue;
      }

      // Calculate target indices (this also accounts for solved the  categories above)
      const targetIndices = Array.from(
        { length: 4 },
        (_, j) => nextAvailableRow * 4 + j
      );

      // map word positions for swapping
      const wordMap = new Map(
        newShuffledWords.map((w, index) => [w.word, index])
      );

      let hasMoved = false;
      for (let j = 0; j < 4; j++) {
        const targetIdx = targetIndices[j];
        const wordIdx = wordMap.get(groupedWords[j].word);

        if (wordIdx !== undefined && wordIdx !== targetIdx) {
          // swap elements
          [newShuffledWords[wordIdx], newShuffledWords[targetIdx]] = [
            newShuffledWords[targetIdx],
            newShuffledWords[wordIdx],
          ];
          hasMoved = true;

          wordMap.set(newShuffledWords[wordIdx].word, wordIdx);
          wordMap.set(newShuffledWords[targetIdx].word, targetIdx);


        }
      }

      if (hasMoved) {
        setShuffledWords([...newShuffledWords]);

        await sleep(1000);


      }

      setGuesses((prevGuesses) => [
        ...prevGuesses,
        { words: groupedWords, correct: true },
      ]);

      nextAvailableRow++; // move to the next available row
      await sleep(500);
    }

    toast.success("Successfully solved!", {
      description: "Everything worked as expected.",
      duration: 6000,
      position: "bottom-center",
    });

    setStatus("complete");
  } catch (error) {
    console.error("Error in autoSolve:", error);
    toast.error("An error occurred while solving. Please try again.");
  }
};
