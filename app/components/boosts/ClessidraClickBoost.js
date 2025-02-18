import React, { useContext } from "react";
import { Image, StyleSheet, Pressable, Text, View } from "react-native";
import BoostContext from "../../store/BoostProvider";

const ClessidraClickBoost = () => {
  const {
    startBoost,
    clessidraBoostActive,
    getCooldownTime,
    getRegenTime,
    formatTime,
  } = useContext(BoostContext);

  const clessidraBoostCooldown = getCooldownTime("clessidra");
  const clessidraRegenTime = getRegenTime("clessidra");

  const handleClessidraBoost = () => {
    if (clessidraRegenTime > 0 || clessidraBoostActive) return;
    startBoost("clessidra");
  };

  const buttonStyles = [
    "flex flex-col mr-3 border-2 rounded-md border-secondary items-center justify-center",
    // Prima controlliamo se il boost è attivo
    clessidraBoostActive ? "bg-secondary border-white" : "",
    // Solo se non è attivo e c'è regenTime, applichiamo opacity
    !clessidraBoostActive && clessidraRegenTime > 0 ? "opacity-50" : "",
    // Se non è attivo e non c'è regenTime, manteniamo lo sfondo trasparente
    !clessidraBoostActive ? "bg-transparent" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Pressable
      onPress={handleClessidraBoost}
      id="clessidra"
      className={buttonStyles}
      style={styles.pressableButton}
      disabled={clessidraRegenTime > 0 || clessidraBoostActive}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={[
              styles.image,
              clessidraBoostCooldown > 0 || clessidraRegenTime > 0
                ? styles.dimmed
                : null,
            ]}
            source={require("../../../assets/images/clessidra.png")}
          />
        </View>
        <View style={styles.textOverlay}>
          <Text
            className={`font-pregular ${
              clessidraBoostActive ? "text-primary" : "text-secondary"
            } justify-center w-10 px-1 text-xs`}
          >
            {clessidraBoostCooldown > 0
              ? formatTime(clessidraBoostCooldown)
              : clessidraRegenTime > 0
              ? formatTime(clessidraRegenTime * 60)
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

export default ClessidraClickBoost;
