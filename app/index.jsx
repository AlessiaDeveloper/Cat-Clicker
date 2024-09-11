import { StatusBar } from "expo-status-bar";
import { Text, View, ImageBackground, StyleSheet } from "react-native";
import { Link, Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView className="h-full bg-primary">
      <ImageBackground
        source={require("../assets/images/cattrono.png")}
        style={styles.image}
      ></ImageBackground>
      <Redirect href={"/Gattohome"}></Redirect>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    zIndex: 1,
    resizeMode: "contain",
  },
});
