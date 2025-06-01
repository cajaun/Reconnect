import { useEffect, useRef } from "react";
import { InteractionManager, FlatList } from "react-native";

export function useScrollToIndex(
  flatListRef: React.RefObject<FlatList<any>>,
  formattedUnlockedPuzzles: { id: string }[],
  puzzleId: number | string,
  cooldownMs = 500
) {
  const scrollCooldownRef = useRef(false);

  useEffect(() => {
    if (scrollCooldownRef.current) return;

    const index = formattedUnlockedPuzzles.findIndex(
      (p) => p.id === String(puzzleId)
    );
    if (index !== -1) {
      scrollCooldownRef.current = true;
      InteractionManager.runAfterInteractions(() => {
        flatListRef.current?.scrollToIndex({ index, animated: true });

        setTimeout(() => {
          scrollCooldownRef.current = false;
        }, cooldownMs);
      });
    }
  }, [flatListRef, formattedUnlockedPuzzles, puzzleId, cooldownMs]);
}
