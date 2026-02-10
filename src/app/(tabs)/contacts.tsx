import Contact from "@/src/components/Contact";
import { MAX_PULLDOWN_DISTANCE, PULLDOWN_REFRESH_THRESHOLD } from "@/src/constants/Config";
import { usePullDown } from "@/src/context/PullDownContext";
import { sampleContactList } from "@/src/dummy/contacts";
import { ContactType } from "@/src/types";
import { useScrollToTop } from '@react-navigation/native';
import { FlashList, FlashListRef } from "@shopify/flash-list";
import { useRef } from "react";
import { PanResponder, StyleSheet, View } from "react-native";
import Animated, { useAnimatedScrollHandler, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

// use custom Animated FlashList
const AnimatedFlashList = Animated.createAnimatedComponent(FlashList) as unknown as typeof FlashList;

export default function Contacts() {
  const flatListRef = useRef<FlashListRef<ContactType>>(null);
  const scrollY = useSharedValue(0);
  const { pullDownDistance, isRefresh } = usePullDown();

  // Hook to enable scroll to top when the tab is pressed again
  useScrollToTop(
    useRef({
      scrollToTop: () =>
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true }),
    })
  );

  // on refresh
  const onRefresh = (done: () => void) => {
    // Simulate a network request or any async operation
    setTimeout(() => {
      done(); // Call done when the refresh is complete
    }, 5000); // Adjust the timeout as needed
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      // You can handle scroll events here if needed
      const yOffset = event.contentOffset.y;
      scrollY.value = yOffset;
    },
  });

  const onPanRelease = () => {
    pullDownDistance.value = withSpring(isRefresh.value ? PULLDOWN_REFRESH_THRESHOLD : 0, { duration: 500 });

    if (isRefresh.value) {
      onRefresh(() => {
        pullDownDistance.value = withTiming(0, { duration: 500 });
      });
    }
  };

  const panResponderRef = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) =>
        scrollY.value <= 0 && gestureState.dy > 0,
      onPanResponderMove: (event, gestureState) => {
        pullDownDistance.value = Math.max(Math.min(gestureState.dy, MAX_PULLDOWN_DISTANCE), 0);
      },
      onPanResponderRelease: onPanRelease,
      onPanResponderTerminate: onPanRelease,
    })
  );

  return (
    <View style={styles.container} {...panResponderRef.current.panHandlers}>
      <AnimatedFlashList
        ref={flatListRef}
        data={sampleContactList as ContactType[]}
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
