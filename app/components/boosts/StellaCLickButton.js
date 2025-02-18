import React, { useContext } from "react";
import { Image, StyleSheet, Pressable, Text, View } from "react-native";
import BoostContext from "../../store/BoostProvider";

const StellaClickButton = () => {
  const {
    startBoost,
    starBoostActive,
    getCooldownTime,
    getRegenTime,
    formatTime,
  } = useContext(BoostContext);

  const starBoostCooldown = getCooldownTime("stella");
  const starRegenTime = getRegenTime("stella");

  const handleStarBoost = () => {
    if (starRegenTime > 0 || starBoostActive) return;
    startBoost("stella");
  };

  const buttonStyles = [
    "flex flex-col mr-3 border-2 rounded-md border-secondary items-center justify-center",
    starBoostActive ? "bg-secondary border-white" : "",
    !starBoostActive && starRegenTime > 0 ? "opacity-50" : "",
    !starBoostActive ? "bg-transparent" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Pressable
      onPress={handleStarBoost}
      id="stella"
      className={buttonStyles}
      style={styles.pressableButton}
      disabled={starRegenTime > 0 || starBoostActive}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={[
              styles.image,
              starBoostCooldown > 0 || starRegenTime > 0 ? styles.dimmed : null,
            ]}
            source={require("../../../assets/images/stella.png")}
          />
        </View>
        <View style={styles.textOverlay}>
          <Text
            className={`font-pregular ${
              starBoostActive ? "text-primary" : "text-secondary"
            } justify-center w-10 px-1 text-xs`}
            style={styles.text}
          >
            {starBoostCooldown > 0
              ? formatTime(starBoostCooldown)
              : starRegenTime > 0
              ? formatTime(starRegenTime * 60)
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
    textShadowColor: "rgba(0, 0, 0, 0.95)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 15,
  },
});

export default StellaClickButton;
