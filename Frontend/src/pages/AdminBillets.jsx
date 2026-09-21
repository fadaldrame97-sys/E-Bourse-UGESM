import { useState, useEffect } from "react";
import api from "../api/axios";
import Carte from "../components/Carte";
import NavBar from "../components/NavBar";

function AdminBillets() {
  const [billets, setBillets] = useState([]);

  function charger() {
    api.get('/admin/billets-en-attente')
      .then(function (reponse) {
        setBillets(reponse.data.billets);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(function () { charger(); }, []);

  function validerBillet(id) {
    api.post('/admin/billets/' + id + '/valider')
      .then(function () { charger(); })
      .catch(function () { alert('Erreur lors de la validation.'); });
  }

  function rejeterBillet(id) {
    api.post('/admin/billets/' + id + '/rejeter')
      .then(function () { charger(); })
      .catch(function () { alert('Erreur lors du rejet.'); });
  }

  return (
    <div className="min-h-screen bg-[#FDF6F3] px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <NavBar titre="Billets retour en attente" />

        {billets.length === 0 && (
          <Carte>
            <p className="text-sm text-[#888780] text-center">Aucun billet retour en attente.</p>
          </Carte>
        )}

        <div className="flex flex-col gap-3">
          {billets.map(function (billet) {
            return (
              <Carte key={billet.id}>
                <div className="mb-3">
                  <p className="text-sm font-semibold text-[#2C2C2A]">
                    {billet.etudiant.user.prenom} {billet.etudiant.user.nom}
                  </p>
                  <p className="text-xs text-[#888780]">{billet.type} · {billet.motif}</p>
                </div>

                  {billet.chemin_diplome && (
                        <a
                            href={"http://127.0.0.1:8000/storage/" + billet.chemin_diplome}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-[#D85A30] underline block mb-3"
                        >
                            Voir le diplôme
                        </a>
                    )}
  

                <div className="flex gap-2">
                  <button
                    onClick={function () { validerBillet(billet.id); }}
                    className="flex-1 bg-[#EAF3DE] text-[#27500A] rounded-lg px-3 py-2 text-xs font-semibold"
                  >
                    Valider
                  </button>
                  <button
                    onClick={function () { rejeterBillet(billet.id); }}
                    className="flex-1 bg-red-100 text-red-700 rounded-lg px-3 py-2 text-xs font-semibold"
                  >
                    Rejeter
                  </button>
                </div>
              </Carte>
            );
          })}
        </div>

      </div>
    </div>
  );
}

export default AdminBillets;