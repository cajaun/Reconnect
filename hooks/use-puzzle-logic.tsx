import { useState, useMemo, useCallback } from "react";
import { shuffle as arrayShuffle, sleep } from "@/utils/puzzle-utils";
import { Guess, Puzzle, Word } from "@/types/puzzle";
import { Status } from "@/types/status";
import { toast } from 'sonner-native';

export const usePuzzleLogic = (puzzle: Puzzle, initialShuffle: Word[]) => {
  const [shuffledWords, setShuffledWords] = useState(initialShuffle);
  const [selectedWords, setSelectedWords] = useState<Word[]>([]);
  const [status, setStatus] = useState<Status>("guessing");
  const [guesses, setGuesses] = useState<Guess[]>([]);

  const sortedSelectedWords = useMemo(() => {
    return [...selectedWords].sort(
      (a, b) => shuffledWords.indexOf(a) - shuffledWords.indexOf(b)
    );
  }, [shuffledWords, selectedWords]);

  const correctGuesses = useMemo(
    () => guesses.filter(({ correct }) => correct),
    [guesses]
  );

  const shuffle = useCallback(
    () =>
      setShuffledWords(arrayShuffle(shuffledWords, correctGuesses.length * 4)),
    [shuffledWords, correctGuesses.length]
  );

  const deselect = useCallback(() => setSelectedWords([]), []);

  const onWordClick = useCallback(
    (word: Word) => {
      setSelectedWords((prev) => {
        const next = [...prev];
        const idxInPrev = prev.indexOf(word);
        if (idxInPrev !== -1) {
          next.splice(idxInPrev, 1);
          if (status === "submittable") setStatus("guessing");
        } else {
          if (next.length === 4) return next;
          const idxInUnshuffled = puzzle.words.findIndex(
            (w) => w.id === word.id
          );
          const insertIndex = next.findIndex(
            (w) =>
              idxInUnshuffled > puzzle.words.findIndex((p) => p.id === w.id)
          );
          next.splice(insertIndex === -1 ? next.length : insertIndex, 0, word);
          if (next.length === 4) setStatus("submittable");
        }
        return next;
      });
    },
    [status, puzzle.words]
  );

  const onSubmit = useCallback(async () => {
    if (status !== "submittable") return;
    setStatus("pending");
    await sleep(700);

    const difficulty = selectedWords[0]?.difficulty;
    const sameDifficultyCount = selectedWords.filter(
      (word) => word.difficulty === difficulty
    ).length;

    if (sameDifficultyCount === 4) {
      const newShuffledWords = [...shuffledWords];
      let hasMoved = false;

      for (let i = 0; i < 4; i++) {
        const idx = newShuffledWords.indexOf(selectedWords[i]);
        if (idx !== i + correctGuesses.length * 4) {
          hasMoved = true;
          [
            newShuffledWords[i + correctGuesses.length * 4],
            newShuffledWords[idx],
          ] = [
            newShuffledWords[idx],
            newShuffledWords[i + correctGuesses.length * 4],
          ];
        }
      }

      setShuffledWords(newShuffledWords);
      if (hasMoved) await sleep(500);
      setSelectedWords([]);
      setGuesses((prev) => [...prev, { words: selectedWords, correct: true }]);
      if (correctGuesses.length === 3) {
        await sleep(1000);

        toast.success('Successfully solved!', {
          description: 'Everything worked as expected.',
          duration: 6000,
          position: "bottom-center",
        });

        return setStatus("complete");
        
      }
    } else {
      if (sameDifficultyCount === 3) {
        const oneDifferent =
          selectedWords.filter((word) => word.difficulty !== difficulty)
            .length === 1;
            if (oneDifferent) {
              toast("One away...");
            }
      }
      if (sameDifficultyCount === 1) {
        const endDifficulty = selectedWords.at(-1)?.difficulty;
        const otherThreeSame =
          selectedWords.filter((word) => word.difficulty === endDifficulty)
            .length === 3;
            if (otherThreeSame) {
              toast("One away...");
            }
      }
      setStatus("failure");

      await sleep(400);
      setGuesses((prev) => [...prev, { words: selectedWords, correct: false }]);


      if (correctGuesses.length + 3 === guesses.length) {
        const delayBetweenRows = 1000;
        const remainingWords = [...shuffledWords];
      
        const groupedWords: Word[][] = [];
        while (remainingWords.length) {
          const groupDifficulty = remainingWords[0].difficulty;
          const group = remainingWords
            .filter((word) => word.difficulty === groupDifficulty)
            .slice(0, 4);
          groupedWords.push(group);
          group.forEach((word) => {
            const index = remainingWords.indexOf(word);
            if (index > -1) remainingWords.splice(index, 1);
          });
        }
      
   
        const newOrderedWords = [
          ...correctGuesses.flatMap((guess) => guess.words),
          ...groupedWords.flat(),
        ];
      
        const uniqueWords = newOrderedWords.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.id === value.id)
        );
      

        setShuffledWords(uniqueWords);

        console.log(shuffledWords);
        console.log(uniqueWords)
      
      
        const processRowWithDelay = async (row: Word[]) => {
          await sleep(delayBetweenRows); 
          setGuesses((prevGuesses) => [
            ...prevGuesses,
            ...row.map((word) => ({
              words: [word],
              correct: true,
            })),
          ]);
        };
      

        for (let i = 0; i < groupedWords.length; i++) {
          const row = groupedWords[i];
          await processRowWithDelay(row)
        }
      
        toast.success("Solved!", {
          description: "Everything worked as expected.",
          duration: 6000,
          position: "bottom-center",
        });
      
        return setStatus("complete");
      }
      
      
    }

    setStatus("guessing");
  }, [
    selectedWords,
    shuffledWords,
    correctGuesses.length,
    status,
    guesses.length,
  ]);

  return {
    status,
    shuffledWords,
    selectedWords,
    sortedSelectedWords,
    onWordClick,
    onSubmit,
    correctGuesses,
    guesses,
    shuffle,
    deselect,
    initialShuffle,
    categories: puzzle.categories,
    name: puzzle.name,
  };
};
