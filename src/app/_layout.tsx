import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

import AppLoadingScreen from "@/src/components/AppLoading";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 0,
  fade: true,
});

let start = new Date().getTime();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (loaded && !ready) {
      setTimeout(() => {
        setReady(true);
      }, 10);
    }
  }, [loaded, ready]);
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && ready) {
      router.navigate('/(tabs)');
    }
  }, [loaded, ready]);

  if (!loaded || !ready) {
    SplashScreen.hide();
    const t = new Date().getTime() - start;
    console.log("Showing loading screen", loaded, ready, `Elapsed time: ${t}ms`);

    return <AppLoadingScreen />;
  }


  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
