import { createContext, ReactNode, useContext } from 'react';
import { SharedValue, useDerivedValue, useSharedValue } from 'react-native-reanimated';

interface PullDownContextType {
  pullDownDistance: SharedValue<number>;
  clampedPullDownDistance: SharedValue<number>;
  MAX_PULLDOWN_DISTANCE: number;
}

const PullDownContext = createContext<PullDownContextType | undefined>(undefined);

export function PullDownProvider({ children }: { children: ReactNode }) {
  const pullDownDistance = useSharedValue(0);
  const MAX_PULLDOWN_DISTANCE = 150;

  const clampedPullDownDistance = useDerivedValue(() => {
    return Math.min(pullDownDistance.value, MAX_PULLDOWN_DISTANCE);
  });

  return (
    <PullDownContext.Provider value={{ pullDownDistance, clampedPullDownDistance, MAX_PULLDOWN_DISTANCE }}>
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
