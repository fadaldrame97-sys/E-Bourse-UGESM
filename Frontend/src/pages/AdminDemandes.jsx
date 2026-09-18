import { useState, useEffect } from "react";
import api from "../api/axios";
import Carte from "../components/Carte";
import NavBar from "../components/NavBar";

function AdminDemandes() {
  const [demandes, setDemandes] = useState([]);
  const [commentaires, setCommentaires] = useState({});

 // function charger() {
   // api.get('/admin/demandes-en-attente')
     // .then(function (reponse) { setDemandes(reponse.data.demandes); })
     // .catch(function () {});
 // }

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

  function validerDemande(id) {
    api.post('/admin/demandes/' + id + '/valider')
      .then(function () { charger(); })
      .catch(function () { alert('Erreur lors de la validation.'); });
  }


   function rejeterDemande(id) {
    const commentaire = commentaires[id];

    if (!commentaire) {
      alert('Veuillez indiquer un motif de rejet.');
      return;
    }

    api.post('/admin/demandes/' + id + '/rejeter', { commentaire: commentaire })
      .then(function () { charger(); })
      .catch(function () { alert('Erreur lors du rejet.'); });
  }

   function changerCommentaire(id, valeur) {
    const copie = Object.assign({}, commentaires);
    copie[id] = valeur;
    setCommentaires(copie);
  }

  return (
    <div className="min-h-screen bg-[#FDF6F3] px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <NavBar titre="Demandes en attente" />

        {demandes.length === 0 && (
          <Carte>
            <p className="text-sm text-[#888780] text-center">Aucune demande en attente.</p>
          </Carte>
        )}

        <div className="flex flex-col gap-3">
          {demandes.map(function (demande) {
            return (
              <Carte key={demande.id}>
                <div className="mb-3">
                  <p className="text-sm font-semibold text-[#2C2C2A]">
                    {demande.etudiant.user.prenom} {demande.etudiant.user.nom}
                  </p>
                  <p className="text-xs text-[#888780]">{demande.numero_dossier} · {demande.type}</p>
                </div>

                <input
                  type="text"
                  placeholder="Motif en cas de rejet"
                  value={commentaires[demande.id] || ''}
                  onChange={function (e) { changerCommentaire(demande.id, e.target.value); }}
                  className="border border-[#D3D1C7] rounded-lg px-3 py-2 text-sm w-full mb-3"
                />

                <div className="flex gap-2">
                  <button
                    onClick={function () { validerDemande(demande.id); }}
                    className="flex-1 bg-[#EAF3DE] text-[#27500A] rounded-lg px-3 py-2 text-xs font-semibold"
                  >
                    Valider
                  </button>
                  <button
                    onClick={function () { rejeterDemande(demande.id); }}
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
export default AdminDemandes;
