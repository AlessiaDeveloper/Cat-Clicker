import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
} from "react-native";
import EdificiData from "../data/EdificiData";
import GameContext from "../store/GameProvider";
import EdificiPurchaseButton from "../components/EdificiPurchaseButton";
import StrisciaBoost from "../components/StrisciaBoost";
import GattoClicker from "../components/GattoClicker";
import StrisciaValute from "../components/StrisciaValute";
import ClickButton from "../components/ClickButton";

export default function GattoHome() {
  const {
    actualScore,
    setActualScore,
    setFactories,
    levels,
    costs,
    handleLevelUp,
  } = useContext(GameContext);

  const renderItem = ({ item }) => {
    return (
      <View className="flex flex-row border-t-2 border-primary items-center justify-between bg-white">
        <Image source={item.image} style={styles.imageEdifici} />
        <View className="flex-col items-center">
          <Text className="font-pregular text-primary text-lg">
            {" "}
            {item.name}{" "}
          </Text>
          <Text className="font-pregular text-primary text-md">
            {" "}
            Level {levels[item.levelKey]}{" "}
          </Text>
          {item.increment !== undefined && (
            <Text className="font-pregular text-primary rounded-md p-1 bg-secondary text-xs">
              {item.increment}/sec
            </Text>
          )}
        </View>
        <EdificiPurchaseButton
          cost={costs[item.levelKey]}
          increment={item.increment}
          lev={levels[item.levelKey]}
          setLev={() => handleLevelUp(item.levelKey)}
          actualScore={actualScore}
          setActualScore={setActualScore}
          setFactories={setFactories}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <GattoClicker setActualScore={setActualScore} />
      <StrisciaBoost />
      <StrisciaValute />
      <SafeAreaView style={styles.containerEdifici}>
        <FlatList
          data={EdificiData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </SafeAreaView>
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
