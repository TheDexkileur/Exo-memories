import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import Status from "./components/Status";

const CARTES_DE_BASE = [
  "A","B","C","D","E","F","G","H","I","J","K","L","M",
  "N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
];

function melangerCartes() {
  return [...CARTES_DE_BASE, ...CARTES_DE_BASE]
    .map((valeur, index) => ({
      id: `${valeur}-${index}-${Math.random().toString(16).slice(2)}`,
      valeur,
      trouvee: false,
    }))
    .sort(() => Math.random() - 0.5);
}

export default function App() {
  const [cartes, setCartes] = useState(() => melangerCartes());
  const [premierChoix, setPremierChoix] = useState(null);
  const [secondChoix, setSecondChoix] = useState(null);
  const [verrouille, setVerrouille] = useState(false);

  const pairesTrouvees = useMemo(
    () => cartes.filter((c) => c.trouvee).length / 2,
    [cartes]
  );

  const resetChoix = () => {
    setPremierChoix(null);
    setSecondChoix(null);
    setVerrouille(false);
  };

  const handleCarteClick = (carte) => {
    if (verrouille || carte.trouvee || carte.id === premierChoix?.id) return;

    if (!premierChoix) {
      setPremierChoix(carte);
      return;
    }

    setSecondChoix(carte);
  };

  useEffect(() => {
    if (!premierChoix || !secondChoix) return;

    setVerrouille(true);

    if (premierChoix.valeur === secondChoix.valeur) {
      setCartes((cartesActuelles) =>
        cartesActuelles.map((carte) =>
          carte.valeur === premierChoix.valeur ? { ...carte, trouvee: true } : carte
        )
      );
      resetChoix();
      return;
    }

    const timeoutId = setTimeout(() => resetChoix(), 800);
    return () => clearTimeout(timeoutId);
  }, [premierChoix, secondChoix]);

  const rejouer = () => {
    setCartes(melangerCartes());
    setPremierChoix(null);
    setSecondChoix(null);
    setVerrouille(false);
  };

  return (
    <main className="jeu-memory">
      <h1>Jeu de Memory</h1>

      <Board
        cartes={cartes}
        premierChoix={premierChoix}
        secondChoix={secondChoix}
        verrouille={verrouille}
        onCarteClick={handleCarteClick}
      />

      <Status
        pairesTrouvees={pairesTrouvees}
        totalPaires={CARTES_DE_BASE.length}
        onRejouer={rejouer}
      />
    </main>
  );
}
