import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import EdificiPurchaseButton from "../components/EdificiPurchaseButton";

const EdificioItem = React.memo(
  ({
    item,
    levels,
    costs,
    actualScore,
    setActualScore,
    setFactories,
    handleLevelUp,
  }) => (
    <View style={styles.container}>
      <Image source={item.image} style={styles.imageEdifici} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.level}>Level {levels[item.levelKey]}</Text>
        <Text style={styles.increment}>{item.increment}/sec</Text>
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
  )
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#FFD700",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 10,
  },
  imageEdifici: {
    width: 110,
    height: 80,
    resizeMode: "contain",
  },
  infoContainer: {
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5D2E8C",
  },
  level: {
    fontSize: 16,
    color: "#5D2E8C",
  },
  increment: {
    fontSize: 14,
    color: "white",
    backgroundColor: "#5D2E8C",
    padding: 5,
    borderRadius: 5,
  },
});

export default EdificioItem;
