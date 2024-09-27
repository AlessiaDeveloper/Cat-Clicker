import React, { useContext, useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  Pressable,
  Animated,
} from "react-native";
import * as Animatable from "react-native-animatable";
import EdificiData from "../data/EdificiData";
import ModalSettings from "../(modal)/ModalSettings";
import ModalAchievment from "../(modal)/ModalAchievment";
import GameContext from "../store/GameProvider";
import EdificiPurchaseButton from "../components/EdificiPurchaseButton";

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

  const buttonRef = useRef(null);

  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });
  const [showEffect, setShowEffect] = useState(false);

  // Funzione per gestire il tocco e la sua posizione
  const handlePressIn = (e) => {
    const { locationX, locationY } = e.nativeEvent;
    setTouchPosition({ x: locationX, y: locationY });
    setShowEffect(true);
  };

  const handlePressOut = () => {
    setShowEffect(false);
  };

  const handlePress = () => {
    setActualScore((current) => current + 1);
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
          <Text className="font-pregular text-secondary rounded-md p-1 bg-primary text-xs">
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
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handlePress}
            style={styles.gattoClicker} // Usa lo stile qui per rendere cliccabile l'intero bottone
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

          {/* Mostra effetto animato quando c'è un tocco */}
          {showEffect && (
            <Animatable.View
              animation="zoomIn"
              duration={200} // Riduci la durata dell'animazione
              style={[
                styles.touchEffect,
                {
                  left: touchPosition.x - 50, // centriamo l'immagine
                  top: touchPosition.y - 50,
                },
              ]}
            >
              <Image
                source={require("../../assets/images/zampa.png")} // L'immagine che vuoi mostrare
                style={styles.effectImage}
              />
            </Animatable.View>
          )}
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
    height: "49%",
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
  gattoClicker: {
    width: 200,
    height: 300,
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
