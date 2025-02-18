import React, { useContext, useState, useEffect, useRef } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import GameContext from "../store/GameProvider";
import ZampaClickBoost from "./boosts/ZampaClickBoost";
import StellaCLickButton from "./boosts/StellaCLickButton";
import ClessidraClickBoost from "./boosts/ClessidraClickBoost";

const StrisciaBoost = () => {
  const { displayScore, setActualScore, setDisplayScore, zampaClickValueRef } =
    useContext(GameContext);

  const [boostActive, setBoostActive] = useState(false); // Stato per il boost attivo
  const [boostStarCooldown, setBoostStarCooldown] = useState(0);
  const [starBoostActive, setStarBoostActive] = useState(false);

  return (
    <View className="flex flex-row items-center border-y-2 border-secondary w-full bg-primary p-2">
      <View className="flex flex-row w-3/6 justify-start items-center">
        <View
          className={`flex-row  mr-3  rounded-md  items-center justify-center`}
          style={styles.buttonContainer}
        >
          {/* //zampaBoost */}

          <ZampaClickBoost />
          <StellaCLickButton></StellaCLickButton>
          <ClessidraClickBoost></ClessidraClickBoost>
          {/* Pulsante Boost Stella */}
        </View>
        <View className="flex flex-row w-5/6 justify-end ">
          <Text className="text-lg font-pregular back text-secondary">
            {displayScore}
          </Text>
        </View>
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
