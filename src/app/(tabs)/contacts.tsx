import Contact from "@/src/components/Contact";
import { sampleContactList } from "@/src/dummy/contacts";
import { useScrollToTop } from '@react-navigation/native';
import { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useDerivedValue, useSharedValue } from "react-native-reanimated";

export default function Contacts() {
  const flatListRef = useRef<Animated.FlatList>(null);
  const scrollPosition = useSharedValue(0);
  const pullDownDistance = useSharedValue(0);

  const MAX_PULLDOWN_DISTANCE = 150;

  // Hook to enable scroll to top when the tab is pressed again
  useScrollToTop(
    useRef({
      scrollToTop: () =>
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true }),
    })
  );

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const y = event.contentOffset.y;

      console.log(y);
      scrollPosition.value = y;
      pullDownDistance.value = Math.max(0, -y);
    },
  });

  const clampedPullDownDistance = useDerivedValue(() => {
    return Math.min(pullDownDistance.value, MAX_PULLDOWN_DISTANCE);
  });

  const flatListStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: clampedPullDownDistance.value }],
    };
  });

  return (
    <View style={styles.container}>
      <View style={{ height: 30, backgroundColor: 'lightblue', justifyContent: 'center', alignItems: 'center' }}>
        <Text>Pull to refresh</Text>
      </View>
      <Animated.FlatList
        ref={flatListRef}
        data={sampleContactList}
        style={[{ flex: 1 }]}
        renderItem={({ item }) => <Contact contact={item} />}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
