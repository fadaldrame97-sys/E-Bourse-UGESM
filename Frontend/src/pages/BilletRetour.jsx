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

    }

}