import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import GameContext from "../../store/GameProvider";
import BoostContext from "../../store/BoostProvider";

const ZampaClickButton = () => {
  const {
    startBoost,
    getCooldownTime,
    getRegenTime,
    formatTime,
    zampaBoostActive,
  } = useContext(BoostContext);

  const zampaBoostCooldown = getCooldownTime("zampa");
  const zampaRegenTime = getRegenTime("zampa");

  const handleZampaBoost = () => {
    if (zampaRegenTime > 0 || zampaBoostActive) return;
    startBoost("zampa");
  };

  const buttonStyles = [
    "flex flex-col mr-3 border-2 rounded-md border-secondary items-center justify-center",
    zampaBoostActive ? "bg-secondary border-white" : "",
    !zampaBoostActive && zampaRegenTime > 0 ? "opacity-50" : "",
    !zampaBoostActive ? "bg-transparent" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Pressable
      onPress={handleZampaBoost}
      id="zampa"
      className={buttonStyles}
      style={styles.pressableButton}
      disabled={zampaRegenTime > 0 || zampaBoostActive}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={[
              styles.image,
              zampaBoostCooldown > 0 || zampaRegenTime > 0
                ? styles.dimmed
                : null,
            ]}
            source={require("../../../assets/images/zampa.png")}
          />
        </View>
        <View style={styles.textOverlay}>
          <Text
            className={`font-pregular ${
              zampaBoostActive ? "text-primary" : "text-secondary"
            } justify-center px-1 text-xs`}
            style={styles.text}
          >
            {zampaBoostCooldown > 0
              ? formatTime(zampaBoostCooldown)
              : zampaRegenTime > 0
              ? formatTime(zampaRegenTime * 60)
              : ""}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressableButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "100%",
  },
  container: {
    position: "relative",
    width: 36,
    height: 36,
  },
  imageContainer: {
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  dimmed: {
    opacity: 0.7,
  },
  textOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.80)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

export default ZampaClickButton;
