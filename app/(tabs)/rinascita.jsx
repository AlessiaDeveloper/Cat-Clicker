import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  Pressable,
} from "react-native";

import GameContext from "../store/GameProvider";
import EdificiPurchaseButton from "../components/EdificiPurchaseButton";
import StrisciaBoost from "../components/StrisciaBoost";
import RinascitaData from "../data/RinascitaData";
import GattoClicker from "../components/GattoClicker";

export default function Rinascita() {
  const {
    scatolette,
    setScatolette,
    displayScore,
    setDisplayScore,
    actualScore,
    setActualScore,
    counterRinascitaProv,
    setCounterRinascitaProv,
    factories,
    setFactories,
  } = useContext(GameContext);

  const [rinascitas, setRinascitas] = useState(
    RinascitaData.map((rinascita) => ({
      ...rinascita,
      currentCost: rinascita.requiredValuta,
    }))
  );

  const renderItem = ({ item }) => {
    const isDisabled = scatolette < item.currentCost;

    return (
      <View className="flex flex-row border-t-2 border-primary items-center justify-between bg-white">
        <Image
          source={item.image}
          className="border border-indigo-600 w-16 h-16 mx-2"
        />
        <View className="flex-col items-center">
          <Text className="font-pregular text-primary text-md">
            {item.name}
          </Text>
          <Text className="font-pregular flex flex-wrap text-primary text-xs">
            {item.description}
          </Text>
          <Text className="font-pregular flex flex-wrap text-primary text-xs">
            {"120 -> 130 "}
          </Text>
        </View>

        <Pressable
          className="flex-row items-center p-2 rounded-md m-1 mx-3"
          style={[
            styles.button,
            isDisabled ? styles.buttonDisabled : styles.buttonEnabled,
          ]}
          onPress={() => handleUpgradePurchase(item.id)}
          disabled={isDisabled}
        >
          <Text className="font-pregular text-primary">
            {item.currentCost} {""}
          </Text>
          <Image
            className="w-6 h-5 mx-2"
            source={require("../../assets/images/rebirth.png")}
          />
        </Pressable>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <GattoClicker setActualScore={setActualScore} />
      <StrisciaBoost />

      <View className="flex flex-row justify-between border-y-2 bg-white border-primary w-full p-3">
        <Text className="text-lg font-pregular ml-2  text-primary">
          <Image
            className="w-6 h-5 mx-2"
            source={require("../../assets/images/rebirth.png")}
          />
          <Text> Stelline da ottenere </Text>
        </Text>
        <Text className="text-lg font-pregular ml-2 text-primary">
          {counterRinascitaProv}{" "}
        </Text>
      </View>

      <SafeAreaView style={styles.containerEdifici}>
        <FlatList
          data={rinascitas}
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
    height: "39%",
  },
  imageEdifici: {
    width: 70,
    height: 50,
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
