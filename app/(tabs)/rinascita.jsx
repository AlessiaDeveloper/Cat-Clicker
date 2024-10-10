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
    factories,
    setFactories,
  } = useContext(GameContext);
  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });
  const [showEffect, setShowEffect] = useState(false);
  const [counterRinascita, setCounterRinascita] = useState(0);
  const [rinascitas, setRinascitas] = useState(
    RinascitaData.map((rinascita) => ({
      ...rinascita,
      currentCost: rinascita.requiredValuta, // Inizialmente il costo è quello definito in RinascitaData
    }))
  );

  const handlePressIn = (e) => {
    const { pageX, pageY } = e.nativeEvent;
    setTouchPosition({ x: pageX - 25, y: pageY - 25 }); // Centrato
    setShowEffect(true);
    setActualScore((current) => current + 1); // Incremento immediato al tocco
  };

  const handlePressOut = () => {
    setShowEffect(false);
  };

  const renderItem = ({ item }) => {
    // Controlla se il bottone deve essere disabilitato
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
            styles.button, // Stile normale del bottone
            isDisabled ? styles.buttonDisabled : styles.buttonEnabled, // Stile disabilitato o abilitato
          ]}
          onPress={() => handleUpgradePurchase(item.id)} // Gestisci l'acquisto qui
          disabled={isDisabled} // Disabilita il bottone se non ci sono abbastanza scatolette
        >
          <Text className="font-pregular text-primary">
            {item.currentCost} {""}
          </Text>
          <Image
            style={styles.imageIcon}
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
            style={styles.imageIcon}
            source={require("../../assets/images/rebirth.png")}
          />
          <Text> Stelline da ottenere </Text>
        </Text>
        <Text className="text-lg font-pregular ml-2 text-primary">
          {counterRinascita}{" "}
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

  imageIcon: {
    marginBottom: 3,
    width: 25,
    height: 25,
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
