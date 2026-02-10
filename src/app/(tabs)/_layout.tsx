import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React from "react";

import Colors from "@/src/constants/Colors";
import { TAB_HEADER_HEIGHT } from "@/src/constants/Config";
import { PullDownProvider, usePullDown } from "@/src/context/PullDownContext";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";


function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

function TabLayoutContent() {
  const colorScheme = useColorScheme();
  const { top } = useSafeAreaInsets();
  const { clampedPullDownDistance, isRefresh } = usePullDown();
  const loopRotation = useSharedValue(0);

  const headerStyle = useAnimatedStyle(() => {
    return {
      height: TAB_HEADER_HEIGHT + top + clampedPullDownDistance.value,
    };
  });

  useAnimatedReaction(
    () => isRefresh.value,
    (isRefreshing) => {
      if (isRefreshing) {
        loopRotation.value = withRepeat(
          withTiming(360, { duration: 1000, easing: Easing.linear }),
          -1,
          false
        );
      } else {
        loopRotation.value = 0;
      }
    }
  );

  const circularProgressStyle = useAnimatedStyle(() => {
    const progress = clampedPullDownDistance.value / 150;
    const staticRotation = interpolate(progress, [0, 1], [0, 360], "clamp");
    const rotation = isRefresh.value ? loopRotation.value : staticRotation;

    return {
      transform: [{ rotate: `${rotation}deg` }],
      opacity: interpolate(progress, [0, 0.15, 0.3], [0, 0, 1], "clamp"),
    };
  }, [clampedPullDownDistance, isRefresh]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: true,
        headerTitleStyle: { color: "#fff" },
        header: ({ options }) => {
          return (
            <Animated.View style={headerStyle}>
              <LinearGradient
                colors={["#4c669f", "#3b5998", "#192f6a"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ flex: 1 }}
              />
              <View style={[styles.titleSection, { top }]}>
                <Text style={styles.title}>{options.title}</Text>
              </View>
              <View style={[styles.progressContainer, { top: top + TAB_HEADER_HEIGHT }]}>
                <Animated.View style={[styles.circularProgess, circularProgressStyle]} />
              </View>
            </Animated.View>
          );
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="contacts"
        options={{
          title: "Contacts",
          tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />,
        }}
      />
    </Tabs>
  );
}

export default function TabLayout() {
  return (
    <PullDownProvider>
      <TabLayoutContent />
    </PullDownProvider>
  );
}

const styles = StyleSheet.create({
  progressContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  circularProgess: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#fff",
    borderTopColor: "#4d4d4d",
  },
  titleSection: {
    position: "absolute",
    flex: 1,
    width: "100%",
    height: TAB_HEADER_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  }
});
