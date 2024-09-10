import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as NavigationBar from "expo-navigation-bar";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Luckiest Guy": require("../assets/fonts/LuckiestGuy-Regular.ttf"),
  });
  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);
  useEffect(() => {
    async function hideNavigationBar() {
      await NavigationBar.setVisibilityAsync("hidden");
      await NavigationBar.setBehaviorAsync("overlay-swipe");
    }
    hideNavigationBar();
  }, []);
  SplashScreen.preventAutoHideAsync();

  if (!fontsLoaded && !error) return null;
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
};

export default RootLayout;
