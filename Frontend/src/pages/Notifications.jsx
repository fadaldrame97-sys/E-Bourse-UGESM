import { useState, useEffect } from "react";
import api from "../api/axios";
import Carte from "../components/Carte";
import BoutonRetour from "../components/BoutonRetour";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  useEffect(()=>{
     api.get('/notifications')
      .then(function (reponse) { setNotifications(reponse.data.notifications); })
      .catch(function () {})
  },[]);

}