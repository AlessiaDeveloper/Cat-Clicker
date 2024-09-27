import React, { useRef, useState, useCallback } from "react";
import { View, StyleSheet, Pressable, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import ModalSettings from "../(modal)/ModalSettings";
import ModalAchievment from "../(modal)/ModalAchievment";

const ClickableGatto = ({ setActualScore }) => {
  const buttonRef = useRef(null);
  const [effects, setEffects] = useState([]);
  const nextId = useRef(0);

  const addEffect = useCallback((x, y) => {
    const id = nextId.current++;
    setEffects((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setEffects((prev) => prev.filter((effect) => effect.id !== id));
    }, 300);
  }, []);

  const handlePress = useCallback(
    (e) => {
      const { pageX, pageY } = e.nativeEvent;
      addEffect(pageX - 25, pageY - 25);
      setActualScore((current) => current + 1);
    },
    [addEffect, setActualScore]
  );

  return (
    <View style={styles.container}>
      <ModalSettings />
      <Pressable onPress={handlePress}>
        <Animatable.View ref={buttonRef}>
          <Image
            style={styles.image}
            source={require("./../../assets/images/gatto2.0.png")}
          />
        </Animatable.View>
      </Pressable>
      <ModalAchievment />
      {effects.map((effect) => (
        <Animatable.View
          key={effect.id}
          animation="zoomIn"
          duration={200}
          style={[
            styles.touchEffect,
            {
              left: effect.x,
              top: effect.y,
            },
          ]}
        >
          <Image
            source={require("../../assets/images/zampa.png")}
            style={styles.effectImage}
          />
        </Animatable.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  image: {
    width: 200,
    height: 300,
  },
  touchEffect: {
    position: "absolute",
    width: 50,
    height: 50,
  },
  effectImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});

export default React.memo(ClickableGatto);
