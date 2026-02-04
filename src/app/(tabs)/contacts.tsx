import Contact from "@/src/components/Contact";
import { sampleContactList } from "@/src/dummy/contacts";
import { useScrollToTop } from '@react-navigation/native';
import { useRef } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedScrollHandler } from "react-native-reanimated";

export default function Contacts() {
  const flatListRef = useRef<Animated.FlatList>(null);

  // Hook to enable scroll to top when the tab is pressed again
  useScrollToTop(
    useRef({
      scrollToTop: () =>
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true }),
    })
  );

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      console.log(event.contentOffset.y);
    },
  });

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={sampleContactList}
        style={{ flex: 1 }}
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
