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

// Componente separato per l'animazione della zampa
const PawEffect = React.memo(({ x, y, onFinish, clickValue }) => {
  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(0.5)).current; // Inizia con un valore più basso
  const translateY = useRef(new Animated.Value(0)).current; // Aggiunto per animare il valore

  useEffect(() => {
    // Esegui l'animazione con easing per una transizione più fluida
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 400, // Tempo di animazione ridotto per più reattività
        easing: Easing.out(Easing.ease), // Migliora la fluidità
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1, // Scala fino al valore finale
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -30, // Il testo si sposta verso l'alto durante l'animazione
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      onFinish(); // Callback quando l'animazione termina
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
          left: x + 10, // Regola la posizione per allineare al meglio il testo
          top: y - 20, // Posiziona sopra la zampa
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

function GattoClicker({ setActualScore }) {
  const [effects, setEffects] = useState([]);
  const nextId = useRef(0);
  const {
    levels,
    setDisplayScore,
    setActualScore: setActualScoreFromContext,
  } = useContext(GameContext);

  const addEffect = useCallback((x, y, clickValue) => {
    const id = nextId.current++;
    setEffects((currentEffects) => [
      ...currentEffects,
      { id, x, y, clickValue },
    ]);
  }, []);

  const handlePress = useCallback(
    (e, building) => {
      const { pageX, pageY } = e.nativeEvent;

      // Recupera il livello attuale del building (es. zampa)
      const currentLevel = levels[building.levelKey];
      const clickValue =
        building.baseClickIncrement + currentLevel * building.incrementPerLevel; // Calcola il valore del click in base al livello

      addEffect(pageX - 25, pageY - 25, clickValue); // Aggiungi effetto zampa con clickValue

      setActualScore((current) => {
        const newScore = current + clickValue; // Incrementa lo score con il valore calcolato
        setDisplayScore(newScore);
        setActualScoreFromContext(newScore);
        return newScore;
      });
    },
    [
      addEffect,
      levels,
      setActualScore,
      setDisplayScore,
      setActualScoreFromContext,
    ]
  );

  const handleEffectFinish = useCallback((id) => {
    setEffects((currentEffects) =>
      currentEffects.filter((effect) => effect.id !== id)
    );
  }, []);

  return (
    <Pressable
      onPress={(e) =>
        handlePress(e, {
          levelKey: "zampa", // Assumiamo che questo sia l'oggetto building per il click
          baseClickIncrement: 1, // Valore di incremento base
          incrementPerLevel: 1, // Valore di incremento per livello
        })
      }
      style={styles.gattoClicker}
    >
      <View style={styles.contentContainer}>
        <ModalSettings />
        <Image
          style={styles.image}
          source={require("./../../assets/images/gatto2.0.png")}
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
