export default function Status({ pairesTrouvees, totalPaires, onRejouer }) {
  return (
    <>
      <p className="statut">
        Paires trouvées : {pairesTrouvees} / {totalPaires}
      </p>

      <button className="rejouer" type="button" onClick={onRejouer}>
        Rejouer
      </button>
    </>
  );
}
