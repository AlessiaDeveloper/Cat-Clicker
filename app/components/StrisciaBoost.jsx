import React, { useContext, useState, useEffect, useRef } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import GameContext from "../store/GameProvider";

const StrisciaBoost = () => {
  const { displayScore, setActualScore, setDisplayScore } =
    useContext(GameContext);

  const [autoClickActive, setAutoClickActive] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);
  const [regenTimeInMinutes, setRegenTimeInMinutes] = useState(0);
  const [boostActive, setBoostActive] = useState(false); // Stato per il boost della stella
  const [boostCooldown, setBoostCooldown] = useState(0);

  const intervalRef = useRef(null);

  const handleAutoClick = () => {
    if (regenTimeInMinutes > 0 || autoClickActive) return;

    setAutoClickActive(true);
    setCooldownTime(60);
    setRegenTimeInMinutes(240);

    // Inizia l'autoclick per 60 secondi
    intervalRef.current = setInterval(() => {
      setActualScore((currentScore) => {
        const increment = boostActive ? 1.5 : 1; // Valore aumentato del 50% se boost attivo
        const newScore = currentScore + increment;
        setDisplayScore(newScore);
        return newScore;
      });
    }, 1000);

    // Ferma l'autoclick dopo 60 secondi
    setTimeout(() => {
      clearInterval(intervalRef.current);
      setAutoClickActive(false);
    }, 60000);
  };

  const handleBoostClick = () => {
    if (boostCooldown > 0 || boostActive) return;

    setBoostActive(true);
    setBoostCooldown(240); // Cooldown di 4 ore

    // Disattiva il boost dopo 1 minuto
    setTimeout(() => {
      setBoostActive(false);
    }, 60000);
  };

  useEffect(() => {
    if (cooldownTime > 0) {
      const cooldownInterval = setInterval(() => {
        setCooldownTime((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(cooldownInterval);
    }
  }, [cooldownTime]);

  useEffect(() => {
    if (regenTimeInMinutes > 0) {
      const regenInterval = setInterval(() => {
        setRegenTimeInMinutes((prev) => prev - 1);
      }, 60000);
      return () => clearInterval(regenInterval);
    }
  }, [regenTimeInMinutes]);

  useEffect(() => {
    if (boostCooldown > 0) {
      const boostCooldownInterval = setInterval(() => {
        setBoostCooldown((prev) => prev - 1);
      }, 60000);
      return () => clearInterval(boostCooldownInterval);
    }
  }, [boostCooldown]);

  const formatCooldown = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const formatRegenTime = (timeInMinutes) => {
    const hours = Math.floor(timeInMinutes / 60);
    const minutes = timeInMinutes % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <View className="flex flex-row items-center border-t-2 border-secondary w-full bg-primary p-3">
      <View className="flex flex-row w-3/6 justify-start">
        <View
          className={`flex flex-col mr-3 border-2 rounded-md border-secondary items-center justify-center ${
            cooldownTime > 0 || regenTimeInMinutes > 0 ? "opacity-50" : ""
          }`}
          style={styles.buttonContainer}
        >
          <Pressable
            onPress={handleAutoClick}
            disabled={cooldownTime > 0 || regenTimeInMinutes > 0}
            className={`${
              cooldownTime > 0 || regenTimeInMinutes > 0 ? "opacity-50" : ""
            }`}
            style={styles.pressableButton}
          >
            <Image
              style={styles.image}
              source={require("../../assets/images/zampa.png")}
            />
            <Text className="font-pregular text-secondary justify-center w-10 px-1 text-xs">
              {cooldownTime > 0
                ? formatCooldown(cooldownTime)
                : regenTimeInMinutes > 0
                ? formatRegenTime(regenTimeInMinutes)
                : "01:00"}
            </Text>
          </Pressable>
        </View>

        {/* Pulsante Boost Stella */}
        <Pressable
          onPress={handleBoostClick}
          disabled={boostCooldown > 0 || boostActive}
          className="flex flex-col mr-3 border-2 rounded-md border-secondary items-center justify-center"
          style={styles.pressableButton}
        >
          <Image
            className="flex justify-center"
            style={styles.imageBoost}
            source={require("../../assets/images/stella.png")}
          />
          <Text className="font-pregular text-secondary justify-center w-10 px-1 text-xs">
            {boostCooldown > 0
              ? formatRegenTime(boostCooldown)
              : boostActive
              ? "BOOST!"
              : "04:00"}
          </Text>
        </Pressable>

        <Pressable
          className="flex flex-col mr-3 border-2 rounded-md border-secondary items-center justify-center"
          style={styles.pressableButton}
        >
          <Image
            style={styles.imageBoost}
            source={require("../../assets/images/clessidra.png")}
          />
          <Text className="font-pregular text-secondary justify-center w-10 px-1 text-xs">
            12:00
          </Text>
        </Pressable>
      </View>
      <View className="flex flex-row w-3/6 justify-end ">
        <Text className="text-lg font-pregular back text-secondary">
          {displayScore}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageBoost: {
    width: 37,
    height: 37,
    justifyContent: "center",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
  },
  pressableButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 36,
    height: 36,
    resizeMode: "contain",
  },
});

export default StrisciaBoost;
