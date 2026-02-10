import { MAX_PULLDOWN_DISTANCE, PULLDOWN_REFRESH_THRESHOLD } from '@/src/constants/Config';
import { createContext, ReactNode, useContext } from 'react';
import { SharedValue, useDerivedValue, useSharedValue } from 'react-native-reanimated';

interface PullDownContextType {
  pullDownDistance: SharedValue<number>;
  clampedPullDownDistance: SharedValue<number>;
  isRefresh: SharedValue<boolean>;
}

const PullDownContext = createContext<PullDownContextType | undefined>(undefined);

export function PullDownProvider({ children }: { children: ReactNode }) {
  const pullDownDistance = useSharedValue(0);

  const clampedPullDownDistance = useDerivedValue(() => {
    return Math.min(pullDownDistance.value, MAX_PULLDOWN_DISTANCE);
  });

  const isRefresh = useDerivedValue(() => pullDownDistance.value >= PULLDOWN_REFRESH_THRESHOLD);

  return (
    <PullDownContext.Provider value={{ pullDownDistance, clampedPullDownDistance, isRefresh }}>
      {children}
    </PullDownContext.Provider>
  );
}

export function usePullDown() {
  const context = useContext(PullDownContext);
  if (!context) {
    throw new Error('usePullDown must be used within PullDownProvider');
  }
  return context;
}
