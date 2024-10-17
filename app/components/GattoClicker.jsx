import React, { useState, useContext } from "react";
import { View, Pressable, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import ModalSettings from "../(modal)/ModalSettings";
import ModalAchievment from "../(modal)/ModalAchievment";
import GameContext from "../store/GameProvider"; // Importa il contesto corretto

export default function GattoClicker({ setActualScore }) {
  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });
  const [showEffect, setShowEffect] = useState(false);
  const MemoizedModalSettings = React.memo(ModalSettings);
  const MemoizedModalAchievment = React.memo(ModalAchievment);

  // Ottieni le funzioni dal contesto e rinomina setActualScore
  const { setDisplayScore, setActualScore: setActualScoreFromContext } =
    useContext(GameContext);

  const handlePressIn = (e) => {
    const { pageX, pageY } = e.nativeEvent;
    setTouchPosition({ x: pageX - 25, y: pageY - 25 });
    setShowEffect(true);

    // Aggiorna il punteggio sia nel contesto che tramite la prop
    setActualScore((current) => {
      const newScore = current + 1;
      setDisplayScore(newScore); // Aggiorna anche displayScore immediatamente
      setActualScoreFromContext(newScore); // Aggiorna lo score anche nel contesto
      return newScore;
    });
  };

  const handlePressOut = () => {
    setShowEffect(false);
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.gattoClicker}
    >
      <View
        style={{
          flexDirection: "row",
          marginTop: 50,
          justifyContent: "center",
        }}
      >
        <MemoizedModalSettings />
        <Animatable.View>
          <Image
            style={styles.image}
            source={require("./../../assets/images/gatto2.0.png")}
          />
        </Animatable.View>
        <MemoizedModalAchievment />
      </View>

      {showEffect && (
        <Animatable.View
          animation="zoomIn"
          duration={100}
          style={[
            styles.touchEffect,
            { left: touchPosition.x, top: touchPosition.y },
          ]}
        >
          <Image
            source={require("../../assets/images/zampa.png")}
            style={styles.effectImage}
          />
        </Animatable.View>
      )}
    </Pressable>
  );
}

const styles = {
  gattoClicker: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 300,
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
};
