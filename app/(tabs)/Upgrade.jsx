import React, { useContext, useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  Pressable,
} from "react-native";
import * as Animatable from "react-native-animatable";
import ModalSettings from "../(modal)/ModalSettings";
import ModalAchievment from "../(modal)/ModalAchievment";
import GameContext from "../store/GameProvider";
import UpgradeData from "../data/UpgradeData";
import { upgradeFunctions } from "../utils/upgradeFunctions";

export default function Upgrade() {
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

  const buttonRef = useRef(null);

  // Stato locale per tenere traccia dei costi aggiornati per ogni upgrade
  const [upgrades, setUpgrades] = useState(
    UpgradeData.map((upgrade) => ({
      ...upgrade,
      currentCost: upgrade.requiredScat, // Inizialmente il costo è quello definito in UpgradeData
    }))
  );

  // Funzione per gestire l'acquisto di un upgrade
  const handleUpgradePurchase = (id) => {
    const selectedUpgrade = upgrades.find((upgrade) => upgrade.id === id);

    if (scatolette >= selectedUpgrade.currentCost) {
      // Se ci sono abbastanza scatolette, riduci il numero di scatolette e aumenta il costo dell'upgrade
      setScatolette(scatolette - selectedUpgrade.currentCost);

      // Aggiorna il costo dell'upgrade di 5 scatolette
      setUpgrades((prevUpgrades) =>
        prevUpgrades.map((upgrade) =>
          upgrade.id === id
            ? { ...upgrade, currentCost: upgrade.currentCost + 5 }
            : upgrade
        )
      );
    }
    if (upgradeFunctions[id]) {
      upgradeFunctions[id](
        displayScore,
        setDisplayScore,
        actualScore,
        setActualScore,
        factories,
        setFactories
      );
    }
  };

  const renderItem = ({ item }) => {
    // Controlla se il bottone deve essere disabilitato
    const isDisabled = scatolette < item.currentCost;

    return (
      <View className="flex flex-row border-t-2 border-primary items-center justify-between bg-white">
        <Image source={item.image} style={styles.imageEdifici} />
        <View className="flex-col items-center">
          <Text className="font-pregular text-primary text-md">
            {item.name}
          </Text>
          <Text className="font-pregular flex flex-wrap text-primary text-xs">
            {item.description}
          </Text>
        </View>

        <Pressable
          className="flex-row items-center p-3 rounded-md m-3"
          style={[
            styles.button, // Stile normale del bottone
            isDisabled ? styles.buttonDisabled : styles.buttonEnabled, // Stile disabilitato o abilitato
          ]}
          onPress={() => handleUpgradePurchase(item.id)} // Gestisci l'acquisto qui
          disabled={isDisabled} // Disabilita il bottone se non ci sono abbastanza scatolette
        >
          <Text className="font-pregular text-secondary">
            {item.currentCost} {""}
          </Text>
          <Image
            style={styles.imageIcon}
            source={require("../../assets/images/scatoletta.png")}
          />
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 3,
          flexDirection: "row",
          marginTop: 50,
          justifyContent: "center",
        }}
      >
        <ModalSettings />
        <Animatable.View ref={buttonRef}>
          <Pressable
            ref={buttonRef}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#5D2E8C" : "#5D2E8C",
                opacity: pressed ? 0.8 : 1,
              },
              styles.gattoClicker,
            ]}
          >
            <Image
              style={styles.image}
              source={require("./../../assets/images/gatto2.0.png")}
            />
          </Pressable>
        </Animatable.View>
        <ModalAchievment />
      </View>

      <View className="flex flex-row justify-between border-y-2 border-secondary w-full p-3">
        <Text className="text-lg font-pregular ml-2 text-secondary">
          <Image
            style={styles.imageIcon}
            source={require("../../assets/images/scatoletta.png")}
          />
          <Text> {"  "}</Text>
          {scatolette}
        </Text>

        <Text className="text-lg font-pregular text-secondary">
          {displayScore}
        </Text>
      </View>

      <SafeAreaView style={styles.containerEdifici}>
        <View className="text-lg font-pregular flex-wrap p-4 flex-row justify-center text-primary border-primary text-center bg-white">
          <Image
            style={styles.imageIcona}
            source={require("../../assets/images/scatolette.png")}
          />
          <Text className="text-xl px-2 font-pregular text-primary border-primary text-center bg-white">
            Usa le scatolette per gli upgrade permanenti
          </Text>
        </View>
        <FlatList
          data={upgrades}
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
    height: "48%",
  },

  imageEdifici: {
    width: 70,
    height: 50,
    resizeMode: "contain",
    margin: 2,
  },
  image: {
    width: 200,
    height: 300,
  },
  imageIcon: {
    marginBottom: 3,
    width: 25,
    height: 25,
  },
  imageIcona: {
    width: 60,
    height: 60,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    margin: 5,
  },
  buttonEnabled: {
    backgroundColor: "#5D2E8C", // Colore del bottone quando abilitato
  },
  buttonDisabled: {
    backgroundColor: "#B0B0B0", // Colore del bottone quando disabilitato
  },
});
