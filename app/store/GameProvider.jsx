import React, { createContext, useState, useEffect, useCallback } from "react";
import EdificiData from "../data/EdificiData";
import Achievment from "../data/Achievment";
import RinascitaData from "../data/RinascitaData";

// Crea il contesto
const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [scatolette, setScatolette] = useState(0);
  const [achievements, setAchievements] = useState(
    Achievment.map((achievement) => ({
      ...achievement,
      claimed: false,
    }))
  );
  const [upgrades, setUpgrades] = useState(
    UpgradeData.map((upgrade) => ({
      ...upgrade,
      currentCost: upgrade.requiredScat,
    }))
  );
  const [counterRinascita, setCounterRinascita] = useState(0);
  const [rinascitas, setRinascitas] = useState(
    RinascitaData.map((rinascita) => ({
      ...rinascita,
      currentCost: rinascita.requiredValuta,
    }))
  );
  const [counterRinascitaProv, setCounterRinascitaProv] = useState(0);

  const [actualScore, setActualScore] = useState(100000);
  const [displayScore, setDisplayScore] = useState(100000);
  const [factories, setFactories] = useState(0);
  const [levels, setLevels] = useState(
    EdificiData.reduce((acc, building) => {
      acc[building.levelKey] = 0;
      return acc;
    }, {})
  );
  const [costs, setCosts] = useState(
    EdificiData.reduce((acc, building) => {
      acc[building.levelKey] = building.cost;
      return acc;
    }, {})
  );

  // Funzione per incrementare gradualmente lo score
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

  // Funzione per gestire i click che incrementano il valore del punteggio
  const handleClick = useCallback(
    (building) => {
      const currentLevel = levels[building.levelKey];
      const clickValue =
        building.baseClickIncrement + currentLevel * building.incrementPerLevel;
      setActualScore((prevScore) => prevScore + clickValue);
    },
    [levels, setActualScore]
  );

  return (
    <GameContext.Provider
      value={{
        scatolette,
        setScatolette,
        actualScore,
        displayScore,
        setDisplayScore,
        setActualScore,
        factories,
        setFactories,
        achievements,
        setAchievements,
        levels,
        costs,
        handleLevelUp,
        handleClick, // Esponi la funzione per l'utilizzo nei componenti
        upgrades,
        setUpgrades,
        counterRinascita,
        setCounterRinascita,
        rinascitas,
        setRinascitas,
        counterRinascitaProv,
        setCounterRinascitaProv,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
