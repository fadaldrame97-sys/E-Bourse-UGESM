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

}