import { Stack } from "expo-router";
import "./global.css";
import "@/reanimatedConfg";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";


export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name = "(puzzles)" options={{ headerShown: false }}/>
        

      </Stack>
    </GestureHandlerRootView>
  );
}
