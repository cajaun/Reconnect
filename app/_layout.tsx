import { router, Stack } from "expo-router";
import "./global.css";
import "@/reanimatedConfg";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Toaster } from "sonner-native";
import { useEffect, useState } from "react";
import { useColorScheme, View } from "react-native";
import ThemeProvider from "@/components/ui/utils/theme-provider";
import { getDaysElapsed, setStartDate, unlockPuzzles } from "@/storage/puzzle-init";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActionTrayProvider } from "@/context/action-tray-context";
import { clearPuzzleCacheAndStorage } from "@/storage/puzzle-data";
import { markStart, setupPerformanceObserver } from "@/utils/performance";


export default function RootLayout() {
  const [ready, setReady] = useState(false);
  const colorScheme = useColorScheme();


  useEffect(() => {

    const init = async () => {
      // await clearPuzzleCacheAndStorage()
      // await AsyncStorage.clear()

      await setStartDate();
      await unlockPuzzles();

      const daysElapsed = await getDaysElapsed();
      const puzzleIdForToday = daysElapsed + 1;


      router.replace(`/${puzzleIdForToday}`);
      setReady(true);
    };

    init();
  }, []);
  

  return (
    <ThemeProvider>

      <GestureHandlerRootView>
        <ActionTrayProvider>
          <StatusBar style="auto" />

          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="[id]" />
          </Stack>
          <Toaster />
        </ActionTrayProvider>
      </GestureHandlerRootView>
 
    </ThemeProvider>
  );
}
