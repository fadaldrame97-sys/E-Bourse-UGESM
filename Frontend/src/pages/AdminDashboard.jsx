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

}