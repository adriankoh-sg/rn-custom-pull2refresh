// src/hooks/useScreenInterval.ts
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useRef } from 'react';

/**
 * A hook that sets up an interval to run a callback function at specified intervals, but only when the screen is focused.
 * The interval is automatically cleared when the screen is unfocused or when the component unmounts.
 * @param callback - The function to be executed at each interval.
 * @param options - Configuration options for the interval.
 * @param options.delay - The delay in milliseconds between each execution of the callback.
 * @param options.disabled - If true, the interval will not start.
 * @returns An object with `startInterval` and `stopInterval` functions to manually control the interval.
 * @example
 * const { startInterval, stopInterval } = useScreenInterval(() => {
 *   console.log('This will run every 5 seconds when the screen is focused');
 * }, { delay: 5000 });
 *
 * // To manually start or stop the interval:
 * startInterval();
 * stopInterval();
 */
export const useScreenInterval = (
  callback: () => void,
  options: { delay: number; disabled?: boolean }
) => {
  const { delay, disabled } = options;
  const intervalRef = useRef<number | null>(null);
  const callbackRef = useRef(callback);

  // Keep callback ref updated
  callbackRef.current = callback;

  const startInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      callbackRef.current();
    }, delay);
  }, [delay]);

  const stopInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      !disabled && startInterval();

      return stopInterval;
    }, [startInterval, stopInterval, disabled])
  );

  return { startInterval, stopInterval };
};
