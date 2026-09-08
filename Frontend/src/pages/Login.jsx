import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";

function Login(){

    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [erreur, setErreur]=useState('');

    const navigate = useNavigate();

    function gererConnexion(e){

        e.preventDefault();
        setErreur();

        api.post('/login',{email:email, password:password})
        .then(function (reponse) {
                console.log("connexion réussie", reponse.data);

                const token = reponse.data.token;

                localStorage.setItem("token", token);

                localStorage.setItem(
                    "user",
                    JSON.stringify(reponse.data.user)
                );

                navigate("/dashboard");
            })

        .catch(function (error) {
       
        if (error.response && error.response.data && error.response.data.message) {
          setErreur(error.response.data.message);
        } else {
          setErreur('Une erreur est survenue. Réessayez.');
        }
      });

    }

    return (
    <div className="min-h-screen bg-[#FDF6F3] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.05)] p-8 w-full max-w-sm">

        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#D85A30] flex items-center justify-center mb-4">
            <span className="text-[#FAECE7] text-xl">🎓</span>
          </div>
          <p className="font-semibold text-base">E-Bourse</p>
          <p className="text-sm text-[#888780]">Connexion à votre espace</p>
        </div>

        <form onSubmit={gererConnexion} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="nom@ebourse.sn"
            value={email}
            onChange={function (e) { setEmail(e.target.value); }}
            className="border border-[#D3D1C7] rounded-lg px-3 py-2.5 text-sm"
            required
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={function (e) { setPassword(e.target.value); }}
            className="border border-[#D3D1C7] rounded-lg px-3 py-2.5 text-sm"
            required
          />

          {erreur && (
            <p className="text-sm text-red-600">{erreur}</p>
          )}

          <button
            type="submit"
            className="bg-[#D85A30] text-[#FAECE7] rounded-lg py-2.5 text-sm font-semibold mt-1 disabled:opacity-60"
          > Se connecter
         
          </button>
        </form>

      </div>
    </div>
  );
}

export default Login;