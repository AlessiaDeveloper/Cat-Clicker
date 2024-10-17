import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import EdificiData from "../data/EdificiData";
import Achievment from "../data/Achievment";
import RinascitaData from "../data/RinascitaData";

// Crea il contesto
const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [scatolette, setScatolette] = useState(0);
  const [achievements, setAchievements] = useState(
    Achievment.map((achievement) => ({
      //prende tutti gli achievment e gli imposta claimed false di default
      ...achievement,
      claimed: false,
    }))
  );
  // Stato locale per tenere traccia dei costi aggiornati per ogni upgrade
  const [upgrades, setUpgrades] = useState(
    UpgradeData.map((upgrade) => ({
      ...upgrade,
      currentCost: upgrade.requiredScat, // Inizialmente il costo è quello definito in UpgradeData
    }))
  );
  const [counterRinascita, setCounterRinascita] = useState(0);
  const [rinascitas, setRinascitas] = useState(
    RinascitaData.map((rinascita) => ({
      ...rinascita,
      currentCost: rinascita.requiredValuta, // Inizialmente il costo è quello definito in RinascitaData
    }))
  );
  const [counterRinascitaProv, setCounterRinascitaProv] = useState(0);

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
