import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Carte from "../components/Carte";
import NavBar from "../components/NavBar";

function AdminDashboard(){

    const [stats,setStats]=useState(null);
    const [admin, setAdmin]=useState(null);
    
    const navigate=useNavigate()


      useEffect(function () {
    api.get('/me')
      .then(function (reponse) {
        setAdmin(reponse.data.user.admin);
      })
      .catch(function () {});

    api.get('/admin/statistiques')
      .then(function (reponse) { setStats(reponse.data); })
      .catch(function () {});
  }, []);


    const peutValider = admin.type_admin === 'validateur' || admin.type_admin === 'super_admin';
    const peutGerer = admin.type_admin === 'gestionnaire' || admin.type_admin === 'super_admin';


return (
    <div className="min-h-screen bg-[#FDF6F3] px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <NavBar titre="Tableau de bord admin" />

        {stats && (
  <div className="grid grid-cols-2 gap-3 mb-6">
    <Carte>
      <p className="text-2xl font-bold text-[#D85A30]">{stats.etudiants_actifs}</p>
      <p className="text-xs text-[#888780]">Étudiants actifs</p>
    </Carte>
    <Carte>
      <p className="text-2xl font-bold text-[#D85A30]">{stats.demandes_en_attente}</p>
      <p className="text-xs text-[#888780]">Demandes en attente</p>
    </Carte>
    <Carte>
      <p className="text-2xl font-bold text-[#D85A30]">{stats.billets_en_attente}</p>
      <p className="text-xs text-[#888780]">Billets en attente</p>
    </Carte>
    {peutGerer && (
      <Carte>
        <p className="text-2xl font-bold text-[#D85A30]">{stats.budget_annuel} DH</p>
        <p className="text-xs text-[#888780]">Budget annuel estimé</p>
      </Carte>
    )}
  </div>
)}




}
