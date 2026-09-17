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


    useEffect(function () { charger(); }, []);

  function validerDemande(id) {
    api.post('/admin/demandes/' + id + '/valider')
      .then(function () { charger(); })
      .catch(function () { alert('Erreur lors de la validation.'); });
  }


   function rejeterDemande(id) {
    const commentaire = commentaires[id];

    if (!commentaire) {
      alert('Veuillez indiquer un motif de rejet.');
      return;
    }

    api.post('/admin/demandes/' + id + '/rejeter', { commentaire: commentaire })
      .then(function () { charger(); })
      .catch(function () { alert('Erreur lors du rejet.'); });
  }


}
