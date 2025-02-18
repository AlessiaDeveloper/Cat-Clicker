import React, { useContext } from "react";
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
import BoostContext from "../store/BoostProvider";
import EdificiPurchaseButton from "../components/EdificiPurchaseButton";
import StrisciaBoost from "../components/StrisciaBoost";
import GattoClicker from "../components/GattoClicker";
import StrisciaValute from "../components/StrisciaValute";
import Click from "../components/Click";

export default function GattoHome() {
  const {
    actualScore,
    setActualScore,
    setFactories,
    levels,
    costs,
    handleLevelUp,
  } = useContext(GameContext);

  const { clessidraBoostActive } = useContext(BoostContext);

  const renderItem = ({ item }) => {
    const increment = clessidraBoostActive
      ? item.increment * 2
      : item.increment;

    return (
      <View className="flex flex-row border-primary items-center justify-between bg-white">
        <Image
          source={item.image}
          resizeMode="contain"
          className="w-20 h-20 mx-2"
        />
        <View className="flex-col items-center">
          <Text className="font-pregular text-primary text-lg">
            {item.name}
          </Text>
          <Text className="font-pregular text-primary text-md">
            Level {levels[item.levelKey]}
          </Text>
          {item.increment !== undefined && (
            <Text className="font-pregular text-primary rounded-md p-1 bg-secondary text-xs">
              {increment}/sec
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
        <Click />
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
    height: "38%",
  },
});
