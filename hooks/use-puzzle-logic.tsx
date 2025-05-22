import { useState, useMemo, useCallback, useEffect } from "react";
import { applyCorrectGuessesToShuffledWords, shuffle as arrayShuffle, shuffleUnsolvedWords, sleep} from "@/utils/puzzle-utils";
import { Guess, Puzzle, Word } from "@/types/puzzle";
import { Status } from "@/types/status";
import { sortSelectedWords, toggleWordSelection } from "@/utils/word-manager";
import { getCorrectGuesses, handleCorrectGuess, handleIncorrectGuess, isCorrectGuess } from "@/utils/guess-manager";
import { clearPuzzleData, getPuzzleData, markPuzzleCompleted, updatePuzzleData } from "@/utils/puzzle-progress"


export const usePuzzleLogic = (puzzle: Puzzle, initialShuffle: Word[]) => {
  const [shuffledWords, setShuffledWords] = useState(initialShuffle);
  const [selectedWords, setSelectedWords] = useState<Word[]>([]);
  const [status, setStatus] = useState<Status>("guessing");
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [hasInitialized, setHasInitialized] = useState(false);

  const sortedSelectedWords = useMemo(() => sortSelectedWords(selectedWords, shuffledWords), [shuffledWords, selectedWords]);

  const correctGuesses = useMemo(() => getCorrectGuesses(guesses), [guesses]);


  const shuffle = useCallback(() => {
    setShuffledWords((prev) => {
      const solvedGuesses = guesses.filter((g) => g.correct);
      return shuffleUnsolvedWords(prev, solvedGuesses);
    });
  }, [guesses]);
  


  useEffect(() => {
    const loadFromStorage = async () => {
      const data = await getPuzzleData(puzzle.id);
  
      const savedGuesses = data.guesses || [];
      const savedStatus = data.status || "guessing";
      const baseWords =
        data.shuffledWords?.length > 0 ? data.shuffledWords : [...initialShuffle];
  
      const correctGuesses = savedGuesses.filter((g: Guess) => g.correct);
      const reordered = applyCorrectGuessesToShuffledWords(baseWords, correctGuesses);
  
      setGuesses(savedGuesses);
      setStatus(savedStatus);
      setShuffledWords(reordered); 
      
      setHasInitialized(true);
    };
  
    loadFromStorage();
  }, [puzzle.id, initialShuffle]);
  
  

  useEffect(() => {
    if (hasInitialized) {
      updatePuzzleData(puzzle.id, { guesses, status, shuffledWords });
    }
  }, [guesses, status, shuffledWords, puzzle.id, hasInitialized]);

  const deselect = useCallback(() => setSelectedWords([]), []);

  const onWordClick = useCallback(
    (word: Word) => {
      setSelectedWords((prev) => toggleWordSelection(prev, word, status, setStatus, puzzle.words));
    },
    [status, puzzle.words]
  );
  

  const onSubmit = useCallback(async () => {
    if (status !== "submittable") return;
    setStatus("pending");
    await sleep(700);
  
    if (isCorrectGuess(selectedWords)) {
      await handleCorrectGuess(
        selectedWords,
        shuffledWords,
        correctGuesses,
        setShuffledWords,
        setGuesses,
        setStatus,
        setSelectedWords
      );
  
      const newGuesses = [...guesses, { words: selectedWords, correct: true }];
      const totalCorrect = getCorrectGuesses(newGuesses).length;
  
   
      await updatePuzzleData(puzzle.id, { guesses: newGuesses });
  

      if (totalCorrect === puzzle.categories.length) {
        await markPuzzleCompleted(puzzle.id);
      }
  
    } else {

      const updatedMistakes = guesses.filter(g => !g.correct).length + 1;
      const newGuesses = [...guesses, { words: selectedWords, correct: false }];
  
      await updatePuzzleData(puzzle.id, {
        mistakes: updatedMistakes,
        guesses: newGuesses,
      });
  
      await handleIncorrectGuess(
        selectedWords,
        guesses,
        shuffledWords,
        correctGuesses,
        setGuesses,
        setStatus,
        setSelectedWords,
        setShuffledWords
      );
    }
  }, [
    selectedWords,
    shuffledWords,
    correctGuesses.length,
    status,
    guesses,
    puzzle.categories.length,
    puzzle.id
  ]);
  

  const reset = useCallback(async () => {
    await clearPuzzleData(puzzle.id); 
    setShuffledWords(arrayShuffle([...initialShuffle], 0));
    setSelectedWords([]);
    setGuesses([]);
    setStatus("guessing");
  }, [initialShuffle, puzzle.id]);
  
  

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
    reset,
    initialShuffle,
    categories: puzzle.categories,
    id: puzzle.id,
    hasInitialized,
  };
};
