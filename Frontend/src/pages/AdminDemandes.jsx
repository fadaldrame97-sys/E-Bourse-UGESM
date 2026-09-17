import { useState, useEffect } from "react";
import api from "../api/axios";
import Carte from "../components/Carte";
import NavBar from "../components/NavBar";

function AdminDemandes() {
  const [demandes, setDemandes] = useState([]);
  const [commentaires, setCommentaires] = useState({});

  function charger() {
    api.get('/admin/demandes-en-attente')
      .then(function (reponse) { setDemandes(reponse.data.demandes); })
      .catch(function () {});
  }

   }
