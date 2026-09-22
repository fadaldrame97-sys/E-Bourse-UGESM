import { useNavigate } from "react-router-dom";

function BoutonRetour({ vers }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={function () { navigate(vers); }}
      className="text-sm text-[#060604] "
    >
      Retour au tableau de bord
    </button>
  );
}

export default BoutonRetour;