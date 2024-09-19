export const upgradeFunctions = {
  1: (scatolette, setScatolette) => {
    const croccantiniEarned = Math.floor(scatolette * 0.5);
    setScatolette(scatolette + croccantiniEarned);
  },
  2: (scatolette, setScatolette) => {
    const croccantiniEarned = 100;
    setScatolette(scatolette + croccantiniEarned);
  },
  3: (scatolette, setScatolette) => {
    // Esempio: aumento del 10% la produzione di croccantini
    console.log("Upgrade 3 attivato");
  },
  // Aggiungi altre funzioni per gli altri upgrade...
};
