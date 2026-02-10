import VanillaAnimation from "@/src/components/VanillaAnimation";
import { StyleSheet, View } from "react-native";

export default function HomeScreen() {

  return (
    <View style={styles.container}>
      <VanillaAnimation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: 100, height: 100, backgroundColor: 'blue'
  },
  moveRight: {
    alignSelf: 'flex-end',

  },
});
