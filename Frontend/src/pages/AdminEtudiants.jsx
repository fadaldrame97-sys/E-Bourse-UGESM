import { useEffect, useState } from "react";
import api from "../api/axios";
import Carte from "../components/Carte";

function AdminEtudiants() {
  const [etudiants, setEtudiants] = useState([]);
  const [erreur, setErreur] = useState("");
 

  function chargerEtudiants() {
 

    api.get("/admin/etudiants/billets-valides")
      .then(function (response) {
        setEtudiants(response.data.etudiants);
      })
      .catch(function (error) {
        console.log(error.response?.data);

        setErreur(
          error.response?.data?.message ||
          "Impossible de charger les étudiants."
        );
      })
      
  }

  useEffect(function () {
  chargerEtudiants();
}, []);



  function supprimerCompte(id) {
    const confirmation = window.confirm(
      "Voulez-vous vraiment supprimer le compte de cet étudiant ?"
    );

    if (!confirmation) {
      return;
    }

    api.delete("/admin/etudiants/" + id)
      .then(function (response) {
        alert(response.data.message);

        
        setEtudiants(function (anciens) {
          return anciens.filter(function (etudiant) {
            return etudiant.id !== id;
          });
        });
      })
      .catch(function (error) {
        console.log(error.response?.data);

        alert(
          error.response?.data?.message ||
          "Impossible de supprimer le compte."
        );
      });
  }

  
  return (
    <div className="min-h-screen bg-[#FDF6F3] px-6 py-10">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-xl font-bold text-[#2C2C2A] mb-6">
          Étudiants avec billet validé
        </h1>

        {erreur && (
          <p className="text-sm text-red-600 mb-4">
            {erreur}
          </p>
        )}

        {etudiants.length === 0 && !erreur && (
          <Carte>
            <p className="text-sm text-[#888780] text-center">
              Aucun étudiant avec un billet validé.
            </p>
          </Carte>
        )}

        <div className="flex flex-col gap-4">

          {etudiants.map(function (etudiant) {

            return (
              <Carte key={etudiant.id}>

                <div className="flex items-center justify-between gap-4">

                  <div>
                    <p className="font-semibold text-[#2C2C2A]">
                      {etudiant.user?.prenom} {etudiant.user?.nom}
                    </p>

                    <p className="text-sm text-[#888780]">
                      Matricule : {etudiant.matricule}
                    </p>

                    <p className="text-sm text-green-700 mt-1">
                      Billet de retour : validé
                    </p>
                  </div>

                  <button
                    onClick={function () {
                      supprimerCompte(etudiant.id);
                    }}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                  >
                    Supprimer le compte
                  </button>

                </div>

              </Carte>
            );
          })}

        </div>

      </div>

    </div>
  );
}

export default AdminEtudiants;