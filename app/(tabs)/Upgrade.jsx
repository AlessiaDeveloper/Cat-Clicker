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
import UpgradeData from "../data/UpgradeData";
import { upgradeFunctions } from "../utils/upgradeFunctions";
import GattoClicker from "../components/GattoClicker";
import StrisciaBoost from "../components/StrisciaBoost";
import StrisciaValute from "../components/StrisciaValute";

export default function Upgrade() {
  const {
    scatolette,
    setScatolette,
    displayScore,
    setDisplayScore,
    actualScore,
    setActualScore,
    setFactories,
  } = useContext(GameContext);

  const [upgrades, setUpgrades] = useState(
    UpgradeData.map((upgrade) => ({
      ...upgrade,
      currentCost: upgrade.requiredScat,
    }))
  );

  const handleUpgradePurchase = (id) => {
    const selectedUpgrade = upgrades.find((upgrade) => upgrade.id === id);
    if (scatolette >= selectedUpgrade.currentCost) {
      setScatolette(scatolette - selectedUpgrade.currentCost);
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
        EdificiData,
        setFactories
      );
    }
  };

  const renderItem = ({ item }) => {
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
          className="flex-row items-center p-2 rounded-md m-1 mx-3"
          style={[
            styles.button,
            isDisabled ? styles.buttonDisabled : styles.buttonEnabled,
          ]}
          onPress={() => handleUpgradePurchase(item.id)}
          disabled={isDisabled}
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
      <GattoClicker setActualScore={setActualScore} />
      <StrisciaBoost />
      <StrisciaValute />
      <SafeAreaView style={styles.containerEdifici}>
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
    height: "42%",
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
  button: {
    padding: 10,
    borderRadius: 10,
    margin: 5,
  },
  buttonEnabled: {
    backgroundColor: "#5D2E8C",
  },
  buttonDisabled: {
    backgroundColor: "#B0B0B0",
  },
});
