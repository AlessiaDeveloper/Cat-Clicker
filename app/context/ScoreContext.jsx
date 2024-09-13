import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
  useRef,
} from "react";

const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [displayScore, setDisplayScore] = useState(100000);
  const [actualScore, setActualScore] = useState(100000);
  const [factories, setFactories] = useState(0);

  const factoriesRef = useRef(0);

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

  useEffect(() => {
    factoriesRef.current = factories;
  }, [factories]);

  useEffect(() => {
    const intervalId = setInterval(incrementScoreGradually, 50);
    return () => clearInterval(intervalId);
  }, [incrementScoreGradually]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (factories > 0) {
        setActualScore((prevScore) => prevScore + factories);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [factories]);

  return (
    <ScoreContext.Provider
      value={{
        displayScore,
        actualScore,
        setActualScore,
        factories,
        setFactories,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => useContext(ScoreContext);
