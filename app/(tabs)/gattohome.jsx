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
import EdificiData from "../data/EdificiData";
import ModalSettings from "../(modal)/ModalSettings";
import ModalAchievment from "../(modal)/ModalAchievment";
import GameContext from "../store/GameProvider";
import EdificiPurchaseButton from "../components/EdificiPurchaseButton";

export default function Gattohome() {
  const {
    scatolette,
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
      <View className="flex flex-row border-b-2 border-primary items-center justify-between bg-white">
        <Image source={item.image} style={styles.imageEdifici} />
        <View className="flex-col items-center">
          <Text className="font-pregular text-primary text-lg">
            {item.name}
          </Text>
          <Text className="font-pregular text-primary text-md">
            Level {levels[item.levelKey]}
          </Text>
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
          {scatolette}
        </Text>

        <Text className="text-lg font-pregular text-secondary">
          {displayScore}
        </Text>
      </View>

      <SafeAreaView style={styles.containerEdifici}>
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
    height: "48%",
  },

  imageEdifici: {
    width: 110,
    height: 80,
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
});
