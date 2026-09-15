import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Carte from "../components/Carte";
import BoutonPrimaire from "../components/BoutonPrimaire";

function BilletRetour(){

    const [type, setType]=useState('diplome');
    const [motif, setMotif]=useState("");
    const [diplome, setDiplome] = useState(null);

    const [erreur, setErreur] = useState("");
    const [succes, setSucces] = useState("");

    const navigate=useNavigate();

    function envoyerDemande(e){
       e.preventDefault();


    setErreur("");
    setSucces("");

    if(type==='diplome' && !diplome){
        setErreur('Veuillez joindre votre diplme ou attestation de réussite');

        return;
    }

    if(!motif.trim()){
        setErreur("Veuillez renseigner le motif de votre demande")
    }

    const formulaire=new FormData();

    formulaire.append("type",type);
    formulaire.append("motif",motif)

    if(diplome){
        formulaire.append("diplome",diplome);
    }

   api.post('/billets-retour', formulaire)
   .then(function(res){
    setSucces(res.data.message||" Votre demande est créée avec succès.");
    
    setMotif("");
    setDiplome(null);

   })
   .catch(function(error){
    if(error.res && error.res.data && error.res.data.message){
        setErreur(erreur.res.data.message);
    }
    else{
       setErreur("Une erreur est survenue. Réessayez."); 
    }
   });
    }

    return(

        <div className="min-h-screen bg-[#FDF6F3] px-6 py-10">
        <div className="max-w-lg mx-auto">

        <button
                onClick={function () {
                    navigate("/dashboard");
                }}
                className="text-sm text-[#888780] mb-6"
                >
                Retour au tableau de bord
        </button>

                <Carte>
          <h1 className="text-lg font-semibold text-[#2C2C2A] mb-1">
            Demande de billet retour
          </h1>

          <p className="text-sm text-[#888780] mb-6">
            Remplissez les informations nécessaires à votre demande.
          </p>

    

      <form
            onSubmit={envoyerDemande}
            className="flex flex-col gap-4"
          >

            <div>
              <label className="block text-sm text-[#5F5E5A] mb-2">
                Type de demande
              </label>

              <select
                value={type}
                onChange={function (e) {
                  setType(e.target.value);
                  setDiplome(null);
                  setErreur("");
                }}
                className="w-full border border-[#D3D1C7] rounded-xl p-3 text-sm bg-white"
              >
                <option value="diplome">
                  Retour après obtention du diplôme
                </option>

                <option value="abandon">
                  Retour après abandon
                </option>
              </select>
            </div>

            {type === "diplome" && (
              <div>
                <label className="block text-sm text-[#5F5E5A] mb-1">
                  Diplôme ou preuve de réussite
                </label>

                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={function (e) {
                    setDiplome(e.target.files[0]);
                  }}
                  className="block w-full text-sm"
                />

                <p className="text-xs text-[#888780] mt-1">
                  Formats acceptés : PDF, JPG, JPEG ou PNG. Taille maximale : 5 Mo.
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm text-[#5F5E5A] mb-1">
                Motif de la demande
              </label>

              <textarea
                value={motif}
                onChange={function (e) {
                  setMotif(e.target.value);
                }}
                placeholder="Expliquez le motif de votre demande..."
                rows="4"
                className="w-full border border-[#D3D1C7] rounded-xl p-3 text-sm resize-none"
              />
            </div>

            {type === "diplome" && (
              <p className="text-xs text-[#888780]">
                Après validation de votre diplôme, vous pourrez bénéficier
                de l’accompagnement financier prévu pour votre retour.
              </p>
            )}

            {type === "abandon" && (
              <p className="text-xs text-[#888780]">
                En cas d’abandon, seul le billet retour est accordé selon
                les règles applicables.
              </p>
            )}

            {erreur && (
              <p className="text-sm text-red-600">
                {erreur}
              </p>
            )}

            {succes && (
              <p className="text-sm text-green-700">
                {succes}
              </p>
            )}

            <BoutonPrimaire
              texte="Envoyer la demande"
              type="submit"
             
            />

          </form>
        </Carte>
      </div>
    </div>
  );
}

export default BilletRetour;
