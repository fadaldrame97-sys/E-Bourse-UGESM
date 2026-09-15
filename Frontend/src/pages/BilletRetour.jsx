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

    );

}