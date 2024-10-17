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
  3: (
    displayScore,
    setDisplayScore,
    actualScore,
    setActualScore,
    edificiData
  ) => {
    // Incrementa del 10% l'increment di ogni edificio
    edificiData.forEach((edificio) => {
      edificio.increment = Math.floor(edificio.increment * 2);
    });
  },
};
