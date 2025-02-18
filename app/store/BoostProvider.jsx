import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import GameContext from "./GameProvider";

const BoostContext = createContext();

export const BoostProvider = ({ children }) => {
  // Importiamo i valori necessari dal GameContext
  const {
    actualScore,
    setActualScore,
    displayScore,
    setDisplayScore,
    zampaClickValueRef,
  } = useContext(GameContext);

  // Stati per i cooldown e i tempi di rigenerazione
  const [zampaBoostCooldown, setZampaBoostCooldown] = useState(0);
  const [starBoostCooldown, setStarBoostCooldown] = useState(0);
  const [clessidraBoostCooldown, setClessidraBoostCooldown] = useState(0);

  const [zampaRegenTime, setZampaRegenTime] = useState(0);
  const [starRegenTime, setStarRegenTime] = useState(0);
  const [clessidraRegenTime, setClessidraRegenTime] = useState(0);

  // Stati per tracciare quali boost sono attivi
  const [starBoostActive, setStarBoostActive] = useState(false);
  const [zampaBoostActive, setZampaBoostActive] = useState(false);
  const [clessidraBoostActive, setClessidraBoostActive] = useState(false);

  // Refs per gestire gli intervalli e i timeout
  const zampaIntervalRef = useRef(null); //gestire l'autoclick del boost zampa
  const starIntervalRef = useRef(null); //gestire il countdown del boost stella
  const clessidraIntervalRef = useRef(null);
  const zampaTimeoutRef = useRef(null); //gestire i timer che terminano i boost
  const starTimeoutRef = useRef(null); //gestire i timer che terminano i boost
  const clessidraTimeoutvalRef = useRef(null);

  const factoriesIncrementRef = useRef(1);

  // Effect per gestire il regenTime
  useEffect(() => {
    const timer = setInterval(() => {
      if (zampaRegenTime > 0) {
        setZampaRegenTime((prev) => prev - 1);
      }
      if (starRegenTime > 0) {
        setStarRegenTime((prev) => prev - 1);
      }

      if (clessidraRegenTime > 0) {
        setClessidraRegenTime((prev) => prev - 1);
      }
    }, 60000);

    return () => clearInterval(timer);
  }, [zampaRegenTime, starRegenTime, clessidraRegenTime]);

  const startBoost = (boostType) => {
    if (boostType === "zampa") {
      // Controllo se il boost può essere attivato

      setZampaBoostActive(true);
      setZampaBoostCooldown(40);
      setZampaRegenTime(240);

      // Pulizia degli intervalli esistenti
      if (zampaIntervalRef.current) {
        clearInterval(zampaIntervalRef.current);
      }
      if (zampaTimeoutRef.current) {
        getCooldownTime;
        clearTimeout(zampaTimeoutRef.current);
      }

      // Funzione per l'autoclick che considera il boost stella
      const performAction = () => {
        setActualScore((prevScore) => {
          const increment = starBoostActive
            ? zampaClickValueRef.current * 2 // Valore raddoppiato se stella è attivo
            : zampaClickValueRef.current; // Valore normale
          const newScore = prevScore + increment;
          setDisplayScore(newScore);
          return newScore;
        });

        // Aggiornamento del cooldown
        setZampaBoostCooldown((prev) => {
          if (prev <= 1) {
            //se il cooldown è minore di 1
            clearInterval(zampaIntervalRef.current);
            zampaIntervalRef.current = null;
            setZampaBoostActive(false);
            return 0; // viene eseguito quando il cd sta per terminare. Imposta il cooldown a 0 indicando che il boost è terminato
          }
          return prev - 1; // è il normale funzionamento del cooldown
        });
      };

      // Avvio immediato e poi ogni secondo
      performAction();
      zampaIntervalRef.current = setInterval(performAction, 1000);

      // Timer per terminare il boost dopo 60 secondi
      zampaTimeoutRef.current = setTimeout(() => {
        if (zampaIntervalRef.current) {
          clearInterval(zampaIntervalRef.current);
          zampaIntervalRef.current = null;
        }
        setZampaBoostActive(false);
        setZampaBoostCooldown(0);
      }, 60000);
    } else if (boostType === "clessidra") {
      if (clessidraBoostActive) return; // Evita di riattivare se già attivo
      setClessidraBoostActive(true);
      factoriesIncrementRef.current = 2; // Raddoppia l'incremento

      // Timer per disattivare il boost dopo 60 secondi
      setTimeout(() => {
        setClessidraBoostActive(false);
        factoriesIncrementRef.current = 1; // Ripristina l'incremento normale
      }, 60000);
      learTimeout(zampaTimeoutRef.current);
    } else if (boostType === "stella") {
      // Controllo se il boost può essere attivato
      if (starRegenTime > 0 || starBoostActive) {
        return;
      }

      setStarBoostActive(true);
      setStarBoostCooldown(60);
      setStarRegenTime(240);

      // Se zampa boost è attivo, aggiorniamo l'autoclick con il valore raddoppiato
      if (zampaBoostActive && zampaIntervalRef.current) {
        clearInterval(zampaIntervalRef.current);

        const performAction = () => {
          setActualScore((prevScore) => {
            const increment = zampaClickValueRef.current * 2;
            const newScore = prevScore + increment;
            setDisplayScore(newScore);
            return newScore;
          });

          setZampaBoostCooldown((prev) => {
            if (prev <= 1) {
              clearInterval(zampaIntervalRef.current);
              zampaIntervalRef.current = null;
              setZampaBoostActive(false);
              return 0;
            }
            return prev - 1;
          });
        };

        performAction();
        zampaIntervalRef.current = setInterval(performAction, 1000);
      }

      // Timer per il cooldown
      starIntervalRef.current = setInterval(() => {
        setStarBoostCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(starIntervalRef.current);
            starIntervalRef.current = null;
            setStarBoostActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Timer per terminare il boost stella
      starTimeoutRef.current = setTimeout(() => {
        if (starIntervalRef.current) {
          clearInterval(starIntervalRef.current);
          starIntervalRef.current = null;
        }
        setStarBoostActive(false);
        setStarBoostCooldown(0);

        // Se zampa boost è ancora attivo, ripristiniamo l'autoclick normale
        if (zampaBoostActive && zampaIntervalRef.current) {
          clearInterval(zampaIntervalRef.current);

          const performAction = () => {
            setActualScore((prevScore) => {
              const increment = zampaClickValueRef.current;
              const newScore = prevScore + increment;
              setDisplayScore(newScore);
              return newScore;
            });

            setZampaBoostCooldown((prev) => {
              if (prev <= 1) {
                clearInterval(zampaIntervalRef.current);
                zampaIntervalRef.current = null;
                setZampaBoostActive(false);
                return 0;
              }
              return prev - 1;
            });
          };

          performAction();
          zampaIntervalRef.current = setInterval(performAction, 1000);
        }
      }, 60000);
    }
  };

  // Funzione per fermare i boost
  const stopBoost = (boostType) => {
    if (boostType === "zampa") {
      setZampaBoostActive(false);
      setZampaBoostCooldown(0);
      if (zampaIntervalRef.current) {
        clearInterval(zampaIntervalRef.current);
        zampaIntervalRef.current = null;
      }
      if (zampaTimeoutRef.current) {
        clearTimeout(zampaTimeoutRef.current);
        zampaTimeoutRef.current = null;
      }
    } else if (boostType === "stella") {
      setStarBoostActive(false);
      setStarBoostCooldown(0);
      if (starIntervalRef.current) {
        clearInterval(starIntervalRef.current);
        starIntervalRef.current = null;
      }
      if (starTimeoutRef.current) {
        clearTimeout(starTimeoutRef.current);
        starTimeoutRef.current = null;
      }
    }
  };

  // Funzione per formattare il tempo
  const formatTime = (timeInSeconds) => {
    if (timeInSeconds < 61) {
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = timeInSeconds % 60;
      return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    } else {
      const totalMinutes = Math.floor(timeInSeconds / 60);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
    }
  };

  // Funzioni helper per ottenere i tempi
  const getCooldownTime = (boostType) => {
    const cooldowns = {
      zampa: zampaBoostCooldown,
      stella: starBoostCooldown,
      clessidra: clessidraBoostCooldown,
      // Aggiungi altri boost qui
    };
    return cooldowns[boostType] || 0; // Ritorna 0 se il boostType non esiste
  };

  const getRegenTime = (boostType) => {
    const regenTimes = {
      zampa: zampaRegenTime,
      stella: starRegenTime,
      clessidra: clessidraRegenTime,
      // Aggiungi altri boost qui
    };
    return regenTimes[boostType] || 0; // Ritorna 0 se il boostType non esiste
  };

  return (
    <BoostContext.Provider
      value={{
        getCooldownTime,
        getRegenTime,
        startBoost,
        stopBoost,
        formatTime,
        starBoostActive,
        zampaBoostActive,
        clessidraBoostActive,
        setClessidraBoostActive,
      }}
    >
      {children}
    </BoostContext.Provider>
  );
};

export default BoostContext;
