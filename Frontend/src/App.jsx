import { BrowserRouter, Routes, Route } from "react-router-dom";

import Accueil from "./pages/Accueil";
import Login from "./pages/Login";
import DashboardEtudiant from "./pages/DashboardEtudiant";
import DemandeBourse from "./components/DemandeBourse";
import MesDemandes from "./pages/MesDemandes";
import BilletRetour from "./pages/BilletRetour";
import AdminDashboard from "./pages/AdminDashboard";
import AdminDemandes from "./pages/AdminDemandes";
import AdminBillets from "./pages/AdminBillets";
import Notifications from "./pages/Notifications";
import AdminEtudiants from "./pages/AdminEtudiants";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardEtudiant />} />
        <Route path="/nouvelle-demande" element={<DemandeBourse />} />
        <Route path="/mes-demandes" element={<MesDemandes />} />
        <Route path="/demandeBillet" element={<BilletRetour/>} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/demandes" element={<AdminDemandes />} />
        <Route path="/admin/billets" element={<AdminBillets/>}/>
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/admin/etudiants" element={<AdminEtudiants />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;