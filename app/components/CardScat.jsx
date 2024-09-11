import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";

export default CardScat = ({ image, guadagno, costo }) => {
  return (
    <View style={styles.card}>
      <Text>{guadagno}</Text>
      <Image source={image} style={styles.image}></Image>
      <View>
        <TouchableOpacity style={styles.factoryButton}>
          <Text>{costo} </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 5,
    width: "30%",
    height: "70%",
    borderColor: "#5D2E8C",
    borderWidth: 3,
    alignItems: "center",
    backgroundColor: "white",
    margin: 3,
    borderRadius: 3,
  },
  image: {
    flexDirection: "column",
    resizeMode: "contain",
    width: "70%",
    height: "60%",
  },
  factoryButton: {
    padding: 7,
    backgroundColor: "#5D2E8C",
    color: "yellow",
    borderRadius: 5,
  },
});
