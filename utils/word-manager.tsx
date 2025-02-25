import { Guess, Word } from "@/types/puzzle";
import { Status } from "@/types/status";
import { toast } from "sonner-native";

export const sortSelectedWords = (selectedWords: Word[], shuffledWords: Word[]) => {
  return [...selectedWords].sort(
    (a, b) => shuffledWords.indexOf(a) - shuffledWords.indexOf(b)
  );
};

export const toggleWordSelection = (
  selectedWords: Word[],
  word: Word,
  status: Status,
  setStatus: (status: Status) => void,
  puzzleWords: Word[],
) => {
  const idxInUnshuffled = (word: Word) =>
    puzzleWords.findIndex((w) => w.id === word.id);

  const next = [...selectedWords];
  const idxInPrev = selectedWords.indexOf(word);

  if (idxInPrev !== -1) {
    next.splice(idxInPrev, 1);
    if (status === "submittable") setStatus("guessing");
  } else {
    if (next.length === 4) return next;



    const location = next.findIndex((w) => idxInUnshuffled(w) > idxInUnshuffled(word));
    next.splice(location === -1 ? next.length : location, 0, word);
    if (next.length === 4) setStatus("submittable");
  }

  return next;
};
