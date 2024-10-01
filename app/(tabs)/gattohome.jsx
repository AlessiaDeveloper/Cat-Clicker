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
import * as Animatable from "react-native-animatable";
import EdificiData from "../data/EdificiData";
import ModalSettings from "../(modal)/ModalSettings";
import ModalAchievment from "../(modal)/ModalAchievment";
import GameContext from "../store/GameProvider";
import EdificiPurchaseButton from "../components/EdificiPurchaseButton";
import StrisciaBoost from "../components/StrisciaBoost";

export default function GattoHome() {
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

  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });
  const [showEffect, setShowEffect] = useState(false);

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
          <Text className="font-pregular text-primary rounded-md p-1 bg-secondary text-xs">
            {item.increment}/sec
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

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.gattoClicker}
      >
        <View
          style={{
            flex: 3,
            flexDirection: "row",
            marginTop: 50,
            justifyContent: "center",
          }}
        >
          <ModalSettings />
          <Animatable.View>
            <Image
              style={styles.image}
              source={require("./../../assets/images/gatto2.0.png")}
            />
          </Animatable.View>
          <ModalAchievment />
        </View>

        {showEffect && (
          <Animatable.View
            animation="zoomIn"
            duration={100} // Ridotto il tempo per rispondere più velocemente
            style={[
              styles.touchEffect,
              {
                left: touchPosition.x,
                top: touchPosition.y,
              },
            ]}
          >
            <Image
              source={require("../../assets/images/zampa.png")}
              style={styles.effectImage}
            />
          </Animatable.View>
        )}
      </Pressable>
      <StrisciaBoost />

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
    height: "39%",
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
    height: 24,
  },
  imageBoost: {
    marginBottom: 3,
    width: 40,
    height: 40,
    borderColor: "yellow",
    borderWidth: 3,
    backgroundColor: "purple",
  },

  gattoClicker: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  touchEffect: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  effectImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});
