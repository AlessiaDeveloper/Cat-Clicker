import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";

const ClickButton = () => {
  return (
    <View className="flex border-t-2 border-primary items-center justify-between bg-white">
      <Pressable>
        <Image
          source={require("./../../assets/images/zampa.png")}
          style={styles.imageEdifici}
        />
      </Pressable>
      <View className="flex flex-row  w-full items-center justify-between px-3 bg-white">
        <Text> Livello 3</Text>
        <Text> croccantini farmati</Text>
      </View>

      <View className="flex-col items-center"></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5D2E8C",
  },
  containerEdifici: {
    height: "42%",
  },
  imageEdifici: {
    width: 110,
    height: 80,
    resizeMode: "contain",
    margin: 2,
  },
});

export default ClickButton;
