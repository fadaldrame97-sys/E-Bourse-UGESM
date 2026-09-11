import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Carte from "../components/Carte";


function MesDemandes(){

  const [demandes, setDemandes] = useState([]);
  const [erreur, setErreur] = useState('');

   const navigate = useNavigate();


   useEffect(()=>{
    api.get('/demandes-bourse')
    .then(function(res){
        setDemandes(res.data.demandes);
    })

    .catch(function (error) {
        setErreur('Impossible de charger vos demandes.');
       
      });


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

  return(


         <div className="min-h-screen bg-[#FDF6F3] px-6 py-10">
             <div className="max-w-2xl mx-auto">

                <button
                    onClick={function () { navigate('/dashboard'); }}
                    className="text-sm text-[#888780] mb-6"
                    >
                    Retour au tableau de bord
                </button>


                 <h1 className="text-xl font-bold text-[#2C2C2A] mb-6">Mes demandes de bourse</h1>

                  {erreur && ( <p className="text-sm text-red-600">{erreur}</p>  )}


        { !erreur && demandes.length === 0 && (
          <Carte>
            <p className="text-sm text-[#888780] text-center">Aucune demande pour le moment.</p>
          </Carte>
        )}



        <div className="flex flex-col gap-3">
          {demandes.map(function (demande) {
            return (
              <Carte key={demande.id}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-[#2C2C2A]">{demande.numero_dossier}</p>
                  <span className={"text-xs font-semibold px-3 py-1 rounded-full " + couleurBadge(demande.statut)}>
                    {demande.statut}
                  </span>
                </div>
                <p className="text-sm text-[#888780]">{libelleType(demande.type)}</p>
                <p className="text-xs text-[#888780] mt-1">Déposée le {demande.date_depot}</p>
              </Carte>
            );
          })}
        </div>

      </div>
    </div>
  );

}

export default MesDemandes;