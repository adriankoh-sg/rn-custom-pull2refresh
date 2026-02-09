import Contact from "@/src/components/Contact";
import { usePullDown } from "@/src/context/PullDownContext";
import { sampleContactList } from "@/src/dummy/contacts";
import { ContactType } from "@/src/types";
import { useScrollToTop } from '@react-navigation/native';
import { FlashList, FlashListRef } from "@shopify/flash-list";
import { useRef } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedScrollHandler } from "react-native-reanimated";

// use custom Animated FlashList
const AnimatedFlashList = Animated.createAnimatedComponent(FlashList) as unknown as typeof FlashList;

export default function Contacts() {
  const flatListRef = useRef<FlashListRef<ContactType>>(null);
  const { pullDownDistance } = usePullDown();

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
      pullDownDistance.value = Math.max(0, -y);
    },
  });

  return (
    <View style={styles.container}>
      <AnimatedFlashList
        ref={flatListRef}
        data={sampleContactList as ContactType[]}
        renderItem={({ item }) => <Contact contact={item} />}
        onScroll={scrollHandler as any}
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
