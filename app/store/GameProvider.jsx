// import { createContext, useState } from "react";

// const GameContext = createContext();

// export const GameProvider = ({ children }) => {
//   const [specialCurrency, setSpecialCurrency] = useState(0); // Nuova valuta speciale

//   return (
//     <GameContext.Provider
//       value={{
//         specialCurrency,
//         setSpecialCurrency,
//       }}
//     >
//       {children}
//     </GameContext.Provider>
//   );
// };

// export default GameContext;
import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import EdificiData from "../data/EdificiData";

// Crea il contesto
const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [specialCurrency, setSpecialCurrency] = useState(0);
  const [actualScore, setActualScore] = useState(100000);
  const [displayScore, setDisplayScore] = useState(100000);
  const [factories, setFactories] = useState(0);
  const [levels, setLevels] = useState(
    EdificiData.reduce((acc, building) => {
      acc[building.levelKey] = 0; // Imposta tutti i livelli inizialmente a 0
      return acc;
    }, {})
  );
  const [costs, setCosts] = useState(
    EdificiData.reduce((acc, building) => {
      acc[building.levelKey] = building.cost; // Imposta il costo iniziale
      return acc;
    }, {})
  );

  // Funzione per incrementare gradualmente lo score (spostata dal componente)
  const incrementScoreGradually = useCallback(() => {
    const difference = actualScore - displayScore;
    if (difference > 0) {
      const increment = Math.ceil(difference / 10);
      setDisplayScore((prevScore) =>
        Math.min(prevScore + increment, actualScore)
      );
    } else if (difference < 0) {
      setDisplayScore(actualScore);
    }
  }, [actualScore, displayScore]);

  // Incrementa lo score in base alle fabbriche
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (factories > 0) {
        setActualScore((prevScore) => prevScore + factories);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [factories]);

  // Incrementa automaticamente lo score visualizzato
  useEffect(() => {
    const intervalId = setInterval(incrementScoreGradually, 50);
    return () => clearInterval(intervalId);
  }, [incrementScoreGradually]);

  // Funzione per aumentare il livello di un edificio e aggiornare il costo
  const handleLevelUp = useCallback(
    (buildingName) => {
      setLevels((prevLevels) => ({
        ...prevLevels,
        [buildingName]: prevLevels[buildingName] + 1,
      }));
      setCosts((prevCosts) => ({
        ...prevCosts,
        [buildingName]: Math.ceil(prevCosts[buildingName] * 1.5),
      }));
    },
    [setLevels, setCosts]
  );

  return (
    <GameContext.Provider
      value={{
        specialCurrency,
        setSpecialCurrency,
        actualScore,
        displayScore,
        setActualScore,
        factories,
        setFactories,
        levels,
        costs,
        handleLevelUp,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
