
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

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
  const position = useSharedValue({ x: 0, y: 0 });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: position.value.x },
        { translateY: position.value.y }
      ]
    };
  }, [position]);

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      position.value = {
        x: e.translationX,
        y: e.translationY,
      };
    })
    .onEnd(() => {
      position.value = withSpring({ x: 0, y: 0 }, { duration: 500 });
    });


  return (
    <GestureDetector gesture={gesture}>
      <View>
        <Text>Drag the ball around!</Text>
        <View style={styles.container}>
          <Animated.View
            style={[styles.ball, animatedStyle]}
          />
        </View>
      </View>
    </GestureDetector>
  );
};

export default VanillaAnimation;
