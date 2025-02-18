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

const GameContext = createContext();
export const GameProvider = ({ children }) => {
  //sez SCATOLETTE
  const [scatolette, setScatolette] = useState(0);
  const [upgrades, setUpgrades] = useState(
    UpgradeData.map((upgrade) => ({
      ...upgrade,
      currentCost: upgrade.requiredScat,
    }))
  );
  const [achievements, setAchievements] = useState(
    Achievment.map((achievement) => ({
      ...achievement,
      claimed: false,
    }))
  );

  //sez RINASCITA
  const [counterRinascita, setCounterRinascita] = useState(0);
  const [rinascitas, setRinascitas] = useState(
    RinascitaData.map((rinascita) => ({
      ...rinascita,
      currentCost: rinascita.requiredValuta,
    }))
  );
  const [counterRinascitaProv, setCounterRinascitaProv] = useState(0);

  //sez SCORE
  const [actualScore, setActualScore] = useState(100000);
  const [displayScore, setDisplayScore] = useState(100000);

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

  // Incrementa lo score in base agli edifici
  const [factories, setFactories] = useState(0);
  const [levels, setLevels] = useState(
    EdificiData.reduce((acc, building) => {
      acc[building.levelKey] = 0;
      return acc;
    }, {})
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (factories > 0) {
        setActualScore((prevScore) => prevScore + factories);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [factories]);

  useEffect(() => {
    const totalFactories = EdificiData.reduce((total, building) => {
      const level = levels[building.levelKey] || 0;
      return total + building.increment * level;
    }, 0);
    setFactories(totalFactories);
  }, [levels]);

  // Incrementa automaticamente lo score visualizzato
  useEffect(() => {
    const intervalId = setInterval(incrementScoreGradually, 50);
    return () => clearInterval(intervalId);
  }, [incrementScoreGradually]);

  //sez EDIFICI

  const [costs, setCosts] = useState(
    EdificiData.reduce((acc, building) => {
      acc[building.levelKey] = building.cost;
      return acc;
    }, {})
  );

  // Sezione ZAMPA
  const [zampaLevels, setZampaLevels] = useState(0);
  const [zampaCosts, setZampaCosts] = useState(50);
  const [zampaIncrement, setZampaIncrement] = useState(2);
  const [zampaClickValue, setZampaClickValue] = useState(1 + zampaLevels * 2);
  const zampaClickValueRef = useRef(zampaClickValue);

  // stellaboost
  const [stellaBoostActive, setStellaBoostActive] = useState(false);

  useEffect(() => {
    setZampaClickValue(1 + zampaLevels * 2); // Aggiorna il valore quando zampaLevels cambia
  }, [zampaLevels]);
  // Funzione per il click di zampa
  const zampaHandleClick = useCallback(() => {
    // Calcola l'incremento basato sul boost stella
    const baseIncrement = 1 + zampaLevels * 2;
    const finalIncrement = stellaBoostActive
      ? baseIncrement * 2 // Moltiplica per 2 durante il boost
      : baseIncrement;

    setActualScore((prevScore) => prevScore + finalIncrement);
  }, [zampaLevels, stellaBoostActive]);

  // Funzione per il level-up di zampa
  const zampaHandleLevelUp = useCallback(() => {
    if (actualScore >= zampaCosts) {
      setZampaLevels((prevLevels) => prevLevels + 1);
      setActualScore((prevScore) => prevScore - zampaCosts);
      setZampaCosts((prevCosts) => Math.ceil(prevCosts * 1.5));
    }
  }, [actualScore, zampaCosts]);

  useEffect(() => {
    setZampaClickValue(1 + zampaLevels * 2); // Aggiorna il valore dinamicamente
  }, [zampaLevels]);
  useEffect(() => {
    zampaClickValueRef.current = zampaClickValue; // Aggiorna il riferimento ogni volta che cambia
  }, [zampaClickValue]);

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
        // Esportazione specifica per zampa
        zampaLevels,
        zampaCosts,
        zampaIncrement,
        zampaClickValue,
        setZampaClickValue,
        setZampaIncrement,
        zampaHandleClick,
        zampaHandleLevelUp,
        zampaClickValueRef,
        stellaBoostActive,
        setStellaBoostActive,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
