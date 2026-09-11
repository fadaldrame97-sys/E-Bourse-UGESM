import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function NavBar({ titre }) {
    const navigate = useNavigate();

    function seDeconnecter() {
        api.post("/logout")
            .then(function () {
                localStorage.removeItem("token");
                navigate("/login");
            })
            .catch(function () {
                localStorage.removeItem("token");
                navigate("/login");
            });
    }

    return (
        <nav className="flex items-center justify-between mb-8">
            <h1 className="text-xl font-bold text-[#2C2C2A]">
                {titre}
            </h1>

            <button
                onClick={seDeconnecter}
                className="text-sm text-[#888780] border border-[#D3D1C7] rounded-lg px-4 py-2"
            >
                Déconnexion
            </button>
        </nav>
    );
}

export default NavBar;