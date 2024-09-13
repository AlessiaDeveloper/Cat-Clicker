import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";

export default CardScat = ({ image, guadagno, costo }) => {
  return (
    <View className="p-4 w-fit h-4/6 border-2 border-primary rounded-md items-center mx-1 py-3 ">
      <Text className="text-lg font-pregular text-primary">{guadagno}</Text>
      <Image source={image} style={styles.image}></Image>
      <TouchableOpacity
        style={styles.factoryButton}
        className="px-2 bg-primary text-secondary rounded-md"
      >
        <Text className="text-lg font-pregular text-secondary">{costo} </Text>
      </TouchableOpacity>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flexDirection: "column",
    resizeMode: "contain",
    width: "90%",
    height: "60%",
  },
});
