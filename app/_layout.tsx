import { Stack } from "expo-router";
import "./global.css";
import "@/reanimatedConfg";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Toaster } from 'sonner-native';
import { useFonts } from "expo-font";




export default function RootLayout() {

  const [loaded, error] = useFonts({
    "OpenRunde-Bold": require("../assets/fonts/OpenRunde-Bold.otf"),
    "OpenRunde-Medium": require("../assets/fonts/OpenRunde-Medium.otf"),
    "OpenRunde-Regular": require("../assets/fonts/OpenRunde-Regular.otf"),
    "OpenRunde-Semibold": require("../assets/fonts/OpenRunde-Semibold.otf"),
  });

  return (
    
    <GestureHandlerRootView>
      <StatusBar style="auto" />
      
      <Stack screenOptions={{ headerShown: false }}>




      </Stack>
      <Toaster />
    </GestureHandlerRootView>
  );
}
