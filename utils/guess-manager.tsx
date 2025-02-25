import { Guess, Word } from "@/types/puzzle";
import { Status } from "@/types/status";
import { sleep } from "./puzzle-utils";
import { toast } from "sonner-native";
import { autoSolve } from "@/functions/auto-solve";

export const getCorrectGuesses = (guesses: Guess[]) => guesses.filter(({ correct }) => correct);

export const isCorrectGuess = (selectedWords: Word[]) => {
  if (selectedWords.length !== 4) return false;
  const difficulty = selectedWords[0].difficulty;
  return selectedWords.every((word) => word.difficulty === difficulty);
};

export const handleCorrectGuess = async (
  selectedWords: Word[],
  shuffledWords: Word[],
  correctGuesses: Guess[],
  setShuffledWords: React.Dispatch<React.SetStateAction<Word[]>>,
  setGuesses: React.Dispatch<React.SetStateAction<Guess[]>>,
  setStatus: React.Dispatch<React.SetStateAction<Status>>,
  setSelectedWords: React.Dispatch<React.SetStateAction<Word[]>>,
) => {
  const newShuffledWords = [...shuffledWords];
  let hasMoved = false;

  for (let i = 0; i < 4; i++) {
    const idx = newShuffledWords.indexOf(selectedWords[i]);
    if (idx !== i + correctGuesses.length * 4) {
      hasMoved = true;
      [newShuffledWords[i + correctGuesses.length * 4], newShuffledWords[idx]] = 
        [newShuffledWords[idx], newShuffledWords[i + correctGuesses.length * 4]];
    }
  }

  setShuffledWords(newShuffledWords);
  if (hasMoved) await sleep(500);
  setSelectedWords([]);
  setGuesses((prev) => [...prev, { words: selectedWords, correct: true }]);

  if (correctGuesses.length === 3) {
    await sleep(1000);
    toast.success("Successfully solved!", { duration: 6000, position: "bottom-center" });
    setStatus("complete");
  } else {
    setStatus("guessing");
  }
};

export const handleIncorrectGuess = async (
  selectedWords: Word[],
  guesses: Guess[],
  shuffledWords: Word[],
  correctGuesses: Guess[],
  setGuesses: React.Dispatch<React.SetStateAction<Guess[]>>,
  setStatus: React.Dispatch<React.SetStateAction<Status>>,
  setSelectedWords: React.Dispatch<React.SetStateAction<Word[]>>,
  setShuffledWords: React.Dispatch<React.SetStateAction<Word[]>>
) => {
  const difficulty = selectedWords[0]?.difficulty;
  const sameDifficultyCount = selectedWords.filter((word) => word.difficulty === difficulty).length;

  if (
    sameDifficultyCount === 3 ||
    selectedWords.filter((word) => word.difficulty === selectedWords.at(-1)?.difficulty).length === 3
  ) {
    toast.error("One away", { duration: 6000, position: "bottom-center" });
  }

  setStatus("failure");
  await sleep(400);
  setGuesses((prev) => [...prev, { words: selectedWords, correct: false }]);

  if (correctGuesses.length + 3 === guesses.length) {
    autoSolve({
      guesses,
      shuffledWords,
      correctGuesses: correctGuesses.map(({ words }) => ({ words })), 
      setShuffledWords,
      setGuesses,
      setStatus,
      setSelectedWords,
    });
  } else {
    setStatus("guessing");
  }
};

