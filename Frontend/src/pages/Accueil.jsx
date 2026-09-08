import { Link } from "react-router-dom";
import photoEtudiants from "../assets/etudiants.jpeg";
import logoUgesm from "../assets/logo-ugesm.jpeg";

function Accueil() {
  return (
    <div className="min-h-screen bg-[#FDF6F3]">

      <div className="flex h-1.5 w-full">
        <div className="flex-1 bg-[#00853F]"></div>
        <div className="flex-1 bg-[#FDEF42]"></div>
        <div className="flex-1 bg-[#E31B23]"></div>
      </div>

      <header className="flex items-center justify-between px-10 py-4 bg-white shadow-sm">

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#F1EFE8] flex items-center justify-center">
            <img
              src={logoUgesm}
              alt="Logo UGESM"
              className="w-full h-full object-contain rounded-xl"
            />
          </div>

          <div>
            <div className="font-bold text-lg text-[#2C2C2A]">
              E-Bourse
            </div>
            <div className="text-xs text-[#888780]">
              Plateforme UGESM
            </div>
          </div>
        </div>

        <nav className="flex items-center">

          <Link
            to="/"
            className="ml-7 text-sm font-medium text-[#444441] no-underline"
          >
            Accueil
          </Link>

          <a
            href="#"
            className="ml-7 text-sm font-medium text-[#444441] no-underline"
          >
            À propos
          </a>

          <a
            href="#"
            className="ml-7 text-sm font-medium text-[#444441] no-underline"
          >
            Contact
          </a>

         
          <Link
            to="/login"
            className="ml-7 bg-[#D85A30] text-[#FAECE7] px-5 py-2.5 rounded-lg text-sm font-semibold no-underline shadow-[0_4px_12px_rgba(216,90,48,0.25)]"
          >
            Se connecter
          </Link>

        </nav>
      </header>

    
      <section className="flex items-center justify-between max-w-5xl mx-auto px-10 py-16 gap-12">

        <div className="flex-1">

          <span className="inline-block bg-[#EAF3DE] text-[#27500A] text-xs font-semibold px-3.5 py-1.5 rounded-full mb-4">
            Étudiants sénégalais au Maroc
          </span>

          <h1 className="text-4xl leading-tight text-[#2C2C2A] mb-4">
            Gérez votre{" "}
            <span className="text-[#D85A30]">
              bourse
            </span>{" "}
            en toute simplicité
          </h1>

          <p className="text-base text-[#5F5E5A] mb-7 leading-relaxed">
            Déposez vos demandes, suivez votre dossier et vos documents en ligne,
            où que vous soyez.
          </p>

          <div className="flex gap-3">

          
            <Link
              to="/login"
              className="bg-[#D85A30] text-[#FAECE7] px-6 py-3.5 rounded-xl text-sm font-semibold shadow-[0_6px_16px_rgba(216,90,48,0.3)]"
            >
              Se connecter
            </Link>

            <button className="bg-white text-[#2C2C2A] border border-[#D3D1C7] px-6 py-3.5 rounded-xl text-sm font-semibold">
              En savoir plus
            </button>

          </div>
        </div>

        <div className="flex-1 h-[220px] rounded-[20px] overflow-hidden">
          <img
            src={photoEtudiants}
            alt="Étudiants"
            className="w-full h-full object-cover"
          />
        </div>

      </section>

    </div>
  );
}

export default Accueil;