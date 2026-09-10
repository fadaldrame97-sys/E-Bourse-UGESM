import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function DashboardEtudiant(){

  const [utilisateur, setUtilisateur]=useState(null);
  const [erreur, setErreur]= useState('');

  const navigate=useNavigate();


  useEffect(()=>{
    api.get('/me').then(function(res){
      setUtilisateur(res.data.user);
    });
  },[]);


  if (erreur) {
    return (
      <div className="min-h-screen bg-[#FDF6F3] flex items-center justify-center">
        <p className="text-red-600">{erreur}</p>
      </div>
    );
  }

  const etudiant=utilisateur.etudiant;

  let couleurStatut = 'bg-gray-100 text-gray-700';

      if (etudiant.statut_bourse === 'actif') {
    couleurStatut = 'bg-[#EAF3DE] text-[#27500A]';
}  

     else if (etudiant.statut_bourse === 'suspendu') {
    couleurStatut = 'bg-red-100 text-red-700';
  }

}