import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Carte from "../components/Carte";
import NavBar from "../components/NavBar";
import AdminDemandes from "./AdminDemandes";


function AdminDashboard() {

  const [stats, setStats] = useState(null);
  const [admin, setAdmin] = useState(null);

  const navigate = useNavigate();

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

  if (!admin || !stats) {
    return (
      <div className="min-h-screen bg-[#FDF6F3] flex items-center justify-center">
        <p className="text-[#888780]">Chargement...</p>
      </div>
    );
  }

  const peutValider = admin.type_admin === 'validateur' || admin.type_admin === 'super_admin';
  const peutGerer = admin.type_admin === 'gestionnaire' || admin.type_admin === 'super_admin';

  return (
    <div className="min-h-screen bg-[#FDF6F3] px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <NavBar titre="Tableau de bord admin" />

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

        <Carte>
          <p className="text-sm font-semibold mb-3">Répartition par ville</p>
          {stats.par_ville.map(function (ligne) {
            return (
              <div key={ligne.ville} className="flex justify-between text-sm py-1">
                <p>{ligne.ville}</p>
                <p className="font-medium">{ligne.nombre_etudiants}</p>
              </div>
            );
          })}
        </Carte>

        <div className="mt-4">
          <Carte>
            <p className="text-sm font-semibold mb-3">Universités actives</p>
            {stats.universites.map(function (universite) {
              return (
                <div key={universite.id} className="flex justify-between text-sm py-1">
                  <p>{universite.nom}</p>
                 <p className="font-medium">{universite.etudiants_count}</p>
                </div>
              );
            })}
          </Carte>
        </div>

        <div className="flex flex-col gap-2 mt-6">
          {peutValider && (
            <button onClick={function () { navigate('/admin/demandes'); }} className="w-full bg-white border border-[#D3D1C7] rounded-lg py-2.5 text-sm font-semibold text-left px-4"> 
             Consulter les demandes
               </button>
          )}

          {peutValider && (
            <button onClick={function () { navigate('/admin/billets'); }} className="w-full bg-white border border-[#D3D1C7] rounded-lg py-2.5 text-sm font-semibold text-left px-4">
              Billets retour
            </button>
          )}

          {peutGerer && (
            <button onClick={function () { navigate('/admin/etudiants'); }} className="w-full bg-white border border-[#D3D1C7] rounded-lg py-2.5 text-sm font-semibold text-left px-4">
              Gestion des étudiants
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;