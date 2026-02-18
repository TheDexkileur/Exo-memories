export default function Card({ carte, retournee, onClick, disabled }) {
  return (
    <button
      className={`carte ${retournee ? "retournee" : ""}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
      aria-label={retournee ? `Carte ${carte.valeur}` : "Carte cachée"}
    >
      {retournee ? carte.valeur : "?"}
    </button>
  );
}
