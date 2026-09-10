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
    })

    .catch(function (err) { setErreur("Impossible de récupérer les informations."); console.log(err); });
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

     else if (etudiant.statut_bourse === 'termine') {
    couleurStatut = 'bg-gray-100 text-gray-700';
  }






    return (
    <div className="min-h-screen bg-[#FDF6F3] px-6 py-10">
      <div className="max-w-2xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm text-[#888780]">Bonjour,</p>
            <h1 className="text-2xl font-bold text-[#2C2C2A]">
              {utilisateur.prenom} {utilisateur.nom}
            </h1>
          </div>

         
        </div>

        <div className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.05)] p-6">

          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-[#2C2C2A]">Statut de la bourse</p>
            <span className={"text-xs font-semibold px-3 py-1 rounded-full " + couleurStatut}>
              {etudiant.statut_bourse}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-[#888780]">Matricule</p>
              <p className="text-[#2C2C2A] font-medium">{etudiant.matricule}</p>
            </div>
            <div>
              <p className="text-[#888780]">Niveau d'étude</p>
              <p className="text-[#2C2C2A] font-medium">{etudiant.niveau_etude}</p>
            </div>
            <div>
              <p className="text-[#888780]">Numéro de passeport</p>
              <p className="text-[#2C2C2A] font-medium">{etudiant.numero_passeport}</p>
            </div>
            <div>
              <p className="text-[#888780]">Année d'arrivée</p>
              <p className="text-[#2C2C2A] font-medium">{etudiant.annee_arrivee}</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default DashboardEtudiant;

 


