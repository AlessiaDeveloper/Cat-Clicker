import React, { useContext, useRef } from "react";
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
import EdificiPurchaseButton from "../components/EdificiPurchaseButton";
import UpgradeData from "../data/UpgradeData";

export default function Upgrade() {
  const {
    specialCurrency,
    displayScore,
    actualScore,
    setActualScore,
    setFactories,
    levels,
    costs,
    handleLevelUp,
  } = useContext(GameContext);

  const buttonRef = useRef(null);

  const renderItem = ({ item }) => {
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

        <Pressable className="flex-row items-center p-3 rounded-md m-3 bg-primary  font-pregular">
          <Text className="font-pregular text-secondary">
            {item.requiredScat} {""}
          </Text>
          <Image
            style={styles.imageIcon}
            source={require("../../assets/images/scatoletta.png")}
          />
        </Pressable>
      </View>
    );
  };

  const handlePress = () => {
    setActualScore((current) => current + 1);
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
            onPress={handlePress}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#5D2E8C" : "#5D2E8C",
                opacity: pressed ? 0.8 : 1,
              },
              styles.gattoClicker,
            ]}
          >
            {({ pressed }) => (
              <>
                <Image
                  style={styles.image}
                  source={
                    pressed
                      ? require("./../../assets/images/cat1.png")
                      : require("./../../assets/images/gatto2.0.png")
                  }
                />
              </>
            )}
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
          {specialCurrency}
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
          data={UpgradeData}
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
});
