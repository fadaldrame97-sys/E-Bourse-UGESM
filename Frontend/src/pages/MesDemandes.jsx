import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Carte from "../components/Carte";


function MesDemandes(){

  const [demandes, setDemandes] = useState([]);
  const [billet, setBillet] = useState(null);
  const [erreur, setErreur] = useState('');


  const navigate = useNavigate();


  useEffect(()=>{
    Promise.all([
      api.get('/demandes-bourse'),
      api.get('/billets-retour'),
    ])
    .then(function ([resDemandes, resBillet]) {
      setDemandes(resDemandes.data.demandes);
      setBillet(resBillet.data.billet);
    })
    .catch(function (error) {
      setErreur('Impossible de charger vos demandes.');
    })
    
  },[]);



  function couleurBadge(statut) {
    if (statut === 'validee') {
      return 'bg-[#EAF3DE] text-[#27500A]';
    } else if (statut === 'rejetee') {
      return 'bg-red-100 text-red-700';
    } else if (statut === 'incomplet') {
      return 'bg-orange-100 text-orange-700';
    } else {
      return 'bg-gray-100 text-gray-700';
    }
  }

  function libelleType(type) {
    if (type === 'premiere_attribution') {
      return 'Première attribution';
    } else {
      return 'Renouvellement';
    }
  }


  function annulerBillet(id) {
  if (!window.confirm('Annuler votre demande de billet retour ?')) return;

  api.delete('/billets-retour/' + id)
    .then(function () {
      window.location.reload();
    })
    .catch(function () {
      alert("Erreur lors de l'annulation.");
    });
}

  return(


         <div className="min-h-screen bg-[#FDF6F3] px-6 py-10">
             <div className="max-w-2xl mx-auto">

                <button
                    onClick={function () { navigate('/dashboard'); }}
                    className="text-sm text-[#888780] mb-6"
                    >
                    Retour au tableau de bord
                </button>

                {erreur && ( <p className="text-sm text-red-600 mb-4">{erreur}</p>  )}
               

                { !erreur && (
                  <>
                    <h1 className="text-xl font-bold text-[#2C2C2A] mb-4">Demandes de bourse</h1>

                    {demandes.length === 0 && (
                      <Carte>
                        <p className="text-sm text-[#888780] text-center">Aucune demande de bourse pour le moment.</p>
                      </Carte>
                    )}

                    <div className="flex flex-col gap-3 mb-8">
                      {demandes.map(function (demande) {
                        return (
                          <Carte key={demande.id}>
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-sm font-semibold text-[#2C2C2A]">
                                {demande.numero_dossier}
                              </p>

                              <span
                                className={
                                  "text-xs font-semibold px-3 py-1 rounded-full " +
                                  couleurBadge(demande.statut)
                                }
                              >
                                {demande.statut}
                              </span>
                            </div>

                            <p className="text-sm text-[#888780]">
                              {libelleType(demande.type)}
                            </p>

                            {demande.statut === 'rejetee' && demande.commentaire && (
                              <p className="text-sm text-red-600 mt-2">
                                Motif du rejet : {demande.commentaire}
                              </p>
                            )}

                            <p className="text-xs text-[#888780] mt-1">
                              Déposée le {demande.date_depot}
                            </p>
                          </Carte>
                        );
                      })}
                    </div>

                    <h1 className="text-xl font-bold text-[#2C2C2A] mb-4">Billet de retour</h1>

                    {billet === null ? (
                      <Carte>
                        <p className="text-sm text-[#888780] text-center">Aucune demande de billet de retour pour le moment.</p>
                      </Carte>
                    ) : (
                      <Carte>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-semibold text-[#2C2C2A]">Billet de retour</p>
                          <span className={"text-xs font-semibold px-3 py-1 rounded-full " + couleurBadge(billet.statut)}>
                            {billet.statut}
                          </span>
                        </div>
                        <p className="text-sm text-[#888780]">
                                Motif de la demande : {billet.motif}
                              </p>

                              {billet.statut === 'refusee' && billet.commentaire && (
                                <p className="text-sm text-red-600 mt-2">
                                  Motif du rejet : {billet.commentaire}
                                </p>
                              )}

                              <p className="text-xs text-[#888780] mt-1">
                                Demandé le {billet.date_demande}
                              </p>


                               {billet.statut === 'en_attente' && (
                                 <button
                                   onClick={function () { annulerBillet(billet.id); }}
                                  className="text-xs text-red-600 underline mt-2"
                                     >
                                   Annuler ma demande
                              </button>
                               )}
                      </Carte>
                    )}
                  </>
                )}


               

      </div>
    </div>
  );

}

export default MesDemandes;