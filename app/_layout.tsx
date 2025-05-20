import { router, Stack } from "expo-router";
import "./global.css";
import "@/reanimatedConfg";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Toaster } from 'sonner-native';
import { useEffect, useState } from "react";
import { useColorScheme, View } from "react-native";
import ThemeProvider from "@/components/ui/utils/theme-provider";
import { getDaysElapsed, setStartDate } from "@/utils/puzzle-init";
import AsyncStorage from "@react-native-async-storage/async-storage";




export default function RootLayout() {

  const [ready, setReady] = useState(false);
  const colorScheme = useColorScheme();


  useEffect(() => {
    const init = async () => {
      await AsyncStorage.clear();
      await setStartDate(); 

      const daysElapsed = await getDaysElapsed();
      console.log("StartDate:", await AsyncStorage.getItem("startDate"));
      console.log("Days elapsed:", daysElapsed);
      
      const puzzleIdForToday = daysElapsed + 1;
      console.log("Puzzle ID for today:", puzzleIdForToday);


      router.replace(`/${puzzleIdForToday}`);

      setReady(true);
    };

    init();
  }, []);




  return (
    <ThemeProvider>
    <GestureHandlerRootView>
      <StatusBar style="auto" />
      
      <Stack screenOptions={{ headerShown: false }}>

      <Stack.Screen name="[id]" />


      </Stack>
      <Toaster />
    </GestureHandlerRootView>
    </ThemeProvider>
  );
}
