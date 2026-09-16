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


}