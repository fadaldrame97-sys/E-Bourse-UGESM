import { BrowserRouter, Routes, Route } from "react-router-dom";

import Accueil from "./pages/Accueil";
import Login from "./pages/Login";
import DashboardEtudiant from "./pages/DashboardEtudiant";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardEtudiant />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;