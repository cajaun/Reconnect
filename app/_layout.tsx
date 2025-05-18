import { router, Stack } from "expo-router";
import "./global.css";
import "@/reanimatedConfg";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Toaster } from 'sonner-native';
import { useEffect } from "react";
import { allPuzzles } from "@/utils/puzzle-data";




export default function RootLayout() {

  useEffect(() => {
    // Redirect to the first puzzle when app loads
    if (allPuzzles.length > 0) {
      router.replace(`/${allPuzzles[0].id}`);
    }
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
