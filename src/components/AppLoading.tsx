import { Image } from 'expo-image';
import React from "react";
import { StyleSheet, View } from "react-native";

export default function AppLoadingScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/apngb-animated.png")}
        style={styles.image}
        contentFit="contain"
        accessibilityLabel="Loading"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
});