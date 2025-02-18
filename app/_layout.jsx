import React from "react";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as NavigationBar from "expo-navigation-bar";
import { GameProvider } from "./store/GameProvider";
import { BoostProvider } from "./store/BoostProvider";

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Luckiest Guy": require("../assets/fonts/LuckiestGuy-Regular.ttf"),
  });

  useEffect(() => {
    async function hideNavigationBar() {
      await NavigationBar.setVisibilityAsync("hidden");
      await NavigationBar.setBehaviorAsync("overlay-swipe");
    }
    hideNavigationBar();
  }, []);

  if (!fontsLoaded && !error) return null;
  return (
    <GameProvider>
      <BoostProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index"></Stack.Screen>
        </Stack>
      </BoostProvider>
    </GameProvider>
  );
};

export default RootLayout;
