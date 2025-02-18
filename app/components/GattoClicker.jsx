import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { View, Pressable, Image, Animated, Easing } from "react-native";
import ModalSettings from "../(modal)/ModalSettings";
import ModalAchievment from "../(modal)/ModalAchievment";
import GameContext from "../store/GameProvider";
import BoostContext from "../store/BoostProvider";

const PawEffect = React.memo(({ x, y, onFinish, clickValue }) => {
  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(0.5)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -30,
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      onFinish();
    });
  }, [opacity, scale, translateY, onFinish]);

  return (
    <>
      <Animated.View
        style={[
          styles.touchEffect,
          {
            left: x,
            top: y,
            opacity,
            transform: [{ scale }],
          },
        ]}
      >
        <Image
          source={require("../../assets/images/zampa.png")}
          style={styles.effectImage}
        />
      </Animated.View>
      <Animated.Text
        className="font-pregular text-secondary text-lg"
        style={{
          position: "absolute",
          left: x + 10,
          top: y - 20,
          opacity,
          transform: [{ translateY }],
          fontSize: 20,
        }}
      >
        {clickValue}
      </Animated.Text>
    </>
  );
});

function GattoClicker() {
  const { zampaClickValueRef, setActualScore, setDisplayScore } =
    useContext(GameContext);
  const { starBoostActive } = useContext(BoostContext);
  const [effects, setEffects] = useState([]);
  const nextId = useRef(0);

  const addEffect = useCallback(
    (x, y) => {
      const id = nextId.current++;
      const clickValue = starBoostActive
        ? zampaClickValueRef.current * 2
        : zampaClickValueRef.current;

      setEffects((currentEffects) => [
        ...currentEffects,
        { id, x, y, clickValue },
      ]);
    },
    [starBoostActive, zampaClickValueRef]
  );

  const handlePress = useCallback(
    (e) => {
      const { pageX, pageY } = e.nativeEvent;
      addEffect(pageX - 25, pageY - 25);

      setActualScore((prevScore) => {
        const increment = starBoostActive
          ? zampaClickValueRef.current * 2
          : zampaClickValueRef.current;
        const newScore = prevScore + increment;
        setDisplayScore(newScore);
        return newScore;
      });
    },
    [
      addEffect,
      starBoostActive,
      zampaClickValueRef,
      setActualScore,
      setDisplayScore,
    ]
  );

  const handleEffectFinish = useCallback((id) => {
    setEffects((currentEffects) =>
      currentEffects.filter((effect) => effect.id !== id)
    );
  }, []);

  return (
    <Pressable onPress={handlePress} style={styles.gattoClicker}>
      <View style={styles.contentContainer}>
        <ModalSettings />
        <Image
          style={styles.image}
          source={require("../../assets/images/gatto2.0.png")}
        />
        <ModalAchievment />
      </View>
      {effects.map((effect) => (
        <PawEffect
          key={effect.id}
          x={effect.x}
          y={effect.y}
          clickValue={effect.clickValue}
          onFinish={() => handleEffectFinish(effect.id)}
        />
      ))}
    </Pressable>
  );
}

const styles = {
  gattoClicker: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flexDirection: "row",
    marginTop: 50,
    justifyContent: "center",
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
};

export default React.memo(GattoClicker);
