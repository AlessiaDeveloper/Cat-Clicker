import React, { useContext } from "react";
import { TouchableOpacity, Text, View, Image, StyleSheet } from "react-native";
import GameContext from "../store/GameProvider";

export default function ZampaLevelUpButton() {
  const { zampaHandleLevelUp, zampaCosts, actualScore, zampaLevels } =
    useContext(GameContext);

  return (
    <View className="flex flex-row border-t-2 border-primary items-center justify-between bg-white">
      <Image
        source={require("./../../assets/images/zampa.png")}
        style={styles.imageEdifici}
      />
      <View className="flex-col items-center">
        <Text className="font-pregular text-primary text-lg">Zampa</Text>
        <Text className="font-pregular text-primary text-md">
          Level {zampaLevels}
        </Text>
      </View>
      <TouchableOpacity
        onPress={zampaHandleLevelUp}
        style={{
          padding: 7,
          backgroundColor: "#5D2E8C",
          margin: 15,
          borderRadius: 5,
          padding: 10,
          borderRadius: 5,
          marginTop: 20,
        }}
        disabled={actualScore < zampaCosts}
      >
        <Text className="font-pregular text-secondary">{zampaCosts} click</Text>
      </TouchableOpacity>
    </View>
  );
}
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
    width: 90,
    height: 60,
    resizeMode: "contain",
    margin: 2,
  },
  imageBoost: {
    marginBottom: 3,
    width: 40,
    height: 40,
    borderColor: "yellow",
    borderWidth: 3,
    backgroundColor: "purple",
  },
});
