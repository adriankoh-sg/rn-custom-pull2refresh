
import React from "react";
import { Animated, PanResponder, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ball: {
    backgroundColor: 'blue',
    height: 100,
    width: 100,
    borderRadius: 50,
  },
});

const VanillaAnimation = () => {
  const position = new Animated.ValueXY();
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderGrant: (e) => {
      console.log("Grant:", { native: e.nativeEvent });
      position.setValue({
        x: e.nativeEvent.locationX,
        y: e.nativeEvent.locationY,
      });

      // position.setValue({ x: 0, y: 0 });
    },
    onPanResponderMove: Animated.event([
      null,
      { dx: position.x, dy: position.y },
    ]),
    onPanResponderRelease: (e) => {
      position.flattenOffset();
    },
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.ball, position.getLayout()]}
        {...panResponder.panHandlers}
      />
    </View>
  );
};

export default VanillaAnimation;
