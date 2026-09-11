import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Carte from "../components/Carte";

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


   if (type === 'premiere_attribution') {
    classeBoutonPremiere = 'flex-1 border-2 border-[#D85A30] rounded-xl p-4 text-center';
  }

  if (type === 'renouvellement') {
    classeBoutonRenouvellement = 'flex-1 border-2 border-[#D85A30] rounded-xl p-4 text-center';
  }

  return(

        <div className="min-h-screen bg-[#FDF6F3] px-6 py-10">
      <div className="max-w-lg mx-auto">

        <button
          onClick={function () { navigate('/dashboard'); }}
          className="text-sm text-[#888780] mb-6"
        >
          Retour au tableau de bord
        </button>



        <Carte>    

          <h1 className="text-lg font-semibold text-[#2C2C2A] mb-1">Nouvelle demande</h1>
          <p className="text-sm text-[#888780] mb-6">Choisissez le type de dossier</p>

          <form onSubmit={gererDemande}>

            <div className="flex gap-3 mb-6">
              <button
                type="button"
                onClick={function () { setType('premiere_attribution'); }}
                className={classeBoutonPremiere}
              >
                <p className="text-sm font-semibold">Première attribution</p>
              </button>

              <button
                type="button"
                onClick={function () { setType('renouvellement'); }}
                className={classeBoutonRenouvellement}
              >
                <p className="text-sm font-semibold">Renouvellement</p>
              </button>
            </div>


            <label>Passeport</label>

                <input
                    type="file"
                    onChange={function (e) {
                        setPasseport(e.target.files[0]);
                    }}
                />


                <label>Attestation d'inscription</label>

                <input
                    type="file"
                    onChange={function (e) {
                        setAttestation(e.target.files[0]);
                    }}
                />


                 <label>Preuve de réuisite</label>

                <input
                    type="file"
                    onChange={function (e) {
                        setAttestation(e.target.files[0]);
                    }}
                />

            </form>

           </Carte>

      </div>
    </div>

  );
}

export default DemandeBourse;