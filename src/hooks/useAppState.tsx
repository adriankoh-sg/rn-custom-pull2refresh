import { useEffect } from 'react';
import type { AppStateStatus } from 'react-native';
import { AppState, Platform } from 'react-native';

/**
 * custom hook to handle app state changes.
 * Idea taken with reference from:
 * https://tanstack.com/query/latest/docs/framework/react/examples/react-native?path=examples%2Freact%2Freact-native%2Fsrc%2Fhooks%2FuseAppState.ts
 * @param onChange - handler for app state change
 * @param onAndroidBlur - [Android only] handler for app going to background
 * @param onAndroidFocus - [Android only] handler for app coming to foreground
 * @example
 * useAppState(
 *   (status) => {
 *     console.log('App state changed to:', status);
 *   },
 *   () => {
 *     console.log('App is going to background (Android)');
 *   },
 *   () => {
 *     console.log('App is coming to foreground (Android)');
 *   }
 * );
 */
export function useAppState(
  onChange: (status: AppStateStatus) => void,
  onAndroidBlur: () => void,
  onAndroidFocus: () => void
) {
  useEffect(() => {
    const subscription = AppState.addEventListener('change', onChange);
    const androidBlur =
      Platform.OS === 'android' ? AppState.addEventListener('blur', onAndroidBlur) : null;
    const androidFocus =
      Platform.OS === 'android' ? AppState.addEventListener('focus', onAndroidFocus) : null;

    return () => {
      subscription.remove();
      androidBlur?.remove();
      androidFocus?.remove();
    };
  }, [onChange, onAndroidBlur, onAndroidFocus]);
}
