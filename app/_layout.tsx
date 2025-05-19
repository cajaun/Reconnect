import { router, Stack } from "expo-router";
import "./global.css";
import "@/reanimatedConfg";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Toaster } from 'sonner-native';
import { useEffect, useState } from "react";
import { allPuzzles } from "@/utils/puzzle-data";
import { initializePuzzlesOnFirstLaunch } from "@/utils/puzzle-init";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";




export default function RootLayout() {

  const [ready, setReady] = useState(false);



  useEffect(() => {
    (async () => {
      // await AsyncStorage.clear();
      // console.log('AsyncStorage cleared');
      console.log('Calling initializePuzzlesOnFirstLaunch');
      const unlockedIds = await initializePuzzlesOnFirstLaunch();
      console.log('Unlocked IDs:', unlockedIds);
      const today = new Date();
      const todayIndex = today.getDate() - 1; // zero-based index for today
      const todayPuzzle = allPuzzles[todayIndex];
      const todayId = todayPuzzle?.id;
  
      let targetId = todayId && unlockedIds.includes(todayId)
        ? todayId
        : unlockedIds[0];
  
      console.log("Target Id", targetId);
      if (targetId !== undefined) {
        router.replace(`/${targetId}`);
      }
  
      setReady(true);
    })();
  }, []);
  


  return (
    
    <GestureHandlerRootView>
      <StatusBar style="auto" />
      
      <Stack screenOptions={{ headerShown: false }}>

      <Stack.Screen name="[id]" />


      </Stack>
      <Toaster />
    </GestureHandlerRootView>
  );
}
