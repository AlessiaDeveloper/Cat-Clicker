import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import CardScat from "../components/CardScat";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ShopScat() {
  return (
    <SafeAreaView
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "60%",
        backgroundColor: "white",
      }}
    >
      <View className="flex-1 w-full h-full items-center mt-5">
        <Text className="text-3xl font-pregular text-primary">Shop</Text>
        <Image
          source={require("./../../assets/images/removespot.png")}
          className="border-primary"
          style={styles.noads}
        ></Image>
        <Text className="text-xl font-pregular mb-5 text-primary">
          Purchase scatolette
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <CardScat
            style={{
              flex: 2,
            }}
            image={require("./../../assets/images/scatoletta.png")}
            guadagno={"+100"}
            costo={"0,80$"}
          ></CardScat>
          <CardScat
            image={require("./../../assets/images/duescat.png")}
            guadagno={"+1000"}
            costo={"4,99$"}
            style={{
              flex: 2,
            }}
          ></CardScat>
          <CardScat
            image={require("./../../assets/images/scatolette.png")}
            guadagno={"+10000"}
            costo={"14,99$"}
            style={{
              flex: 2,
            }}
          ></CardScat>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  noads: {
    padding: 10,
    flexDirection: "row",
    resizeMode: "contain",
    width: "60%",
    height: "60%",
    borderWidth: 3,
    marginVertical: 30,
    borderColor: "#5D2E8C",
    fontSize: 20,
    borderRadius: 5,
  },
});
