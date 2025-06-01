import { useRef, useCallback } from "react";
import { InteractionManager } from "react-native";
import { useRouter } from "expo-router";

export function useDebouncedNavigation(debounceMs = 500) {
  const router = useRouter();
  const isNavigatingRef = useRef(false);

  const navigate = useCallback(
    (targetId: string) => {
      if (isNavigatingRef.current) return;
      isNavigatingRef.current = true;

      InteractionManager.runAfterInteractions(() => {
        router.push(`/${targetId}`);
        // console.log("Going to route ", targetId);

        setTimeout(() => {
          isNavigatingRef.current = false;
        }, debounceMs);
      });
    },
    [router, debounceMs]
  );

  return navigate;
}
