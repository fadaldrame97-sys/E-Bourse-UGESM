import { BrowserRouter, Routes, Route } from "react-router-dom";

import Accueil from "./pages/Accueil";
import Login from "./pages/Login";
import DashboardEtudiant from "./pages/DashboardEtudiant";
import DemandeBourse from "./pages/DemandeBourse";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardEtudiant />} />
        <Route path="/nouvelle-demande" element={<DemandeBourse />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 
