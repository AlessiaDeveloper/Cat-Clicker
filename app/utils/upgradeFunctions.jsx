export const upgradeFunctions = {
  1: (displayScore, setDisplayScore, actualScore, setActualScore) => {
    const croccantiniEarned = Math.floor(displayScore * 0.5);

    // Aggiorna sia actualScore che displayScore
    const newScore = displayScore + croccantiniEarned;
    setActualScore(newScore);
    setDisplayScore(newScore);
  },
  2: (displayScore, setDisplayScore, actualScore, setActualScore) => {
    const croccantiniEarned = Math.floor(displayScore * 2);

    // Aggiorna sia actualScore che displayScore
    const newScore = displayScore + croccantiniEarned;
    setActualScore(newScore);
    setDisplayScore(newScore);
  },
  // Aggiungi altre funzioni per gli altri upgrade...
};
