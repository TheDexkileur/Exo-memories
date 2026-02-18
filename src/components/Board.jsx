import Card from "./Card";

export default function Board({
  cartes,
  premierChoix,
  secondChoix,
  verrouille,
  onCarteClick,
}) {
  return (
    <div className="grille-cartes">
      {cartes.map((carte) => {
        const retournee =
          carte.trouvee ||
          carte.id === premierChoix?.id ||
          carte.id === secondChoix?.id;

        return (
          <Card
            key={carte.id}
            carte={carte}
            retournee={retournee}
            onClick={() => onCarteClick(carte)}
            disabled={verrouille || carte.trouvee}
          />
        );
      })}
    </div>
  );
}
