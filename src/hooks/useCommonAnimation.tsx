import {
  Easing,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

/**
 * hook to create a fading animation style
 * @param fadeInDuration - duration of fade in -> opacity 1 animation in milliseconds (default is 800)
 * @param fadeOutDuration - duration of fade out -> opacity finalOpacity animation in milliseconds (default is 800)
 * @param finalOpacity - final opacity value after fade out (default is 0.5)
 * @returns
 */
export const useFadingStyle = ({
  fadeInDuration = 800,
  fadeOutDuration = 800,
  finalOpacity = 0.5,
}: {
  fadeInDuration?: number;
  fadeOutDuration?: number;
  finalOpacity?: number;
}) => {
  const opacityStyle = useAnimatedStyle(() => {
    return {
      opacity: withRepeat(
        withSequence(
          withTiming(1, {
            duration: fadeInDuration,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(finalOpacity, {
            duration: fadeOutDuration,
            easing: Easing.inOut(Easing.ease),
          })
        ),
        -1,
        true
      ),
    };
  });

  return opacityStyle;
};
