import { Redirect, router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return <SafeAreaView>
    <Pressable onPress={() => router.push("/welcome")}><Text>Go to welcome</Text></Pressable>
  </SafeAreaView>
}