import { Octicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import DrawerButton from "../drawer-button";
import Header from "../header";
import { Colors } from "../colors";

type Views = "default" | "key" | "phrase" | "remove";

export default function WelcomeView({
  title,
  heading,
  setView,
  onClose,
}: {
  title?: string;
  heading?: string;
  setView: (view: Views) => void;
  onClose: () => void;
}) {
  return (
    <View style={{ gap: 16 }}>
      <View style={{ gap: 24 }}>
        <Header onPress={onClose} leftLabel="Options"  shouldClose={true}/>
        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: Colors.grey[100],
          }}
        />
      </View>
      <View style={{ gap: 12 }}>
        <DrawerButton
          onPress={() => setView("key")}
          backgroundColor={Colors.grey[100]}
          icon={<Octicons name="key" size={24} color={Colors.grey[300]} />}
          label="View Private Key"
        />
        <DrawerButton
          onPress={() => setView("phrase")}
          backgroundColor={Colors.grey[100]}
          icon={<Octicons name="package" size={24} color={Colors.grey[300]} />}
          label="View Recovery Phrase"
        />
        <DrawerButton
          onPress={() => setView("remove")}
          backgroundColor={Colors.red[100]}
          icon={<Octicons name="alert" size={24} color={Colors.red[300]} />}
          label="Remove Wallet"
          textColor={Colors.red[300]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 24,
    fontFamily: "OpenRunde-Bold",
  },
  headingText: {
    fontSize: 16,
    fontFamily: "OpenRunde-semibold",
    color: Colors.grey[300],
  },
});
