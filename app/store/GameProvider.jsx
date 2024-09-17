import { createContext, useState } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [specialCurrency, setSpecialCurrency] = useState(0); // Nuova valuta speciale

  return (
    <GameContext.Provider
      value={{
        specialCurrency,
        setSpecialCurrency,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
