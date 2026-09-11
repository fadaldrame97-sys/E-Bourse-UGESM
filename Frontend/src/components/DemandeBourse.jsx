import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function DemandeBourse(){

    const [type, setType] = useState('premiere_attribution');
    const [erreur, setErreur] = useState('');
    const [succes, setSucces] = useState('');


    const navigate = useNavigate();



    function gererDemande(e) {
    e.preventDefault();

    setErreur('');
    setSucces('');
    setChargement(true);

    api.post('/demandes-bourse', { type: type })
      .then(function (reponse) {
       
        setSucces('Demande créée avec succès ! Numéro de dossier : ' + reponse.data.demande.numero_dossier);
      })
      .catch(function (error) {
        setChargement(false);

        if (error.response && error.response.data && error.response.data.message) {
          setErreur(error.response.data.message);
        } else {
          setErreur('Une erreur est survenue. Réessayez.');
        }
      });
  }


  let classeBoutonPremiere = 'flex-1 border border-[#D3D1C7] rounded-xl p-4 text-center';
  let classeBoutonRenouvellement = 'flex-1 border border-[#D3D1C7] rounded-xl p-4 text-center';

}