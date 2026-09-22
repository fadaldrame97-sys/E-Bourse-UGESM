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



    return (
    <div className="min-h-screen bg-[#FDF6F3] px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <BoutonRetour vers="/dashboard" />

        <h1 className="text-xl font-bold text-[#2C2C2A] mb-6">Notifications</h1>

        {notifications.length === 0 && (
          <Carte>
            <p className="text-sm text-[#888780] text-center">Aucune notification.</p>
          </Carte>
        )}



        <div className="flex flex-col gap-3">
          {notifications.map(function (notification) {
            return (
              <Carte key={notification.id}>
                <p className="text-sm text-[#2C2C2A]">{notification.message}</p>
                <p className="text-xs text-[#888780] mt-1">{notification.date_envoi}</p>
              </Carte>
            );
          })}
        </div>

      </div>
    </div>
  );
}

export default Notifications;