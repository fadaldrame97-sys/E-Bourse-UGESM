import photoEtudiants from '../assets/etudiants.jpeg';
import logoUgesm from '../assets/logo-ugesm.jpeg';

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
         
          <div className="w-11 h-11 rounded-xl bg-[#F1EFE8] border-2 border-dashed border-[#B4B2A9] flex items-center justify-center text-[10px] text-[#5F5E5A] text-center leading-tight">
           <img
                src={logoUgesm}
                alt="Logo ugesm"
                className=""
                />
          </div>
          <div>
            <div className="font-bold text-lg text-[#2C2C2A]">E-Bourse</div>
            <div className="text-xs text-[#888780]">Plateforme UGESM</div>
          </div>
        </div>

        <nav className="flex items-center">
          <a href="#" className="ml-7 text-sm font-medium text-[#444441] no-underline">Accueil</a>
          <a href="#" className="ml-7 text-sm font-medium text-[#444441] no-underline">À propos</a>
          <a href="#" className="ml-7 text-sm font-medium text-[#444441] no-underline">Contact</a>
          <a href="#" className="ml-7 bg-[#D85A30] text-[#FAECE7] px-5 py-2.5 rounded-lg text-sm font-semibold no-underline shadow-[0_4px_12px_rgba(216,90,48,0.25)]">
            Se connecter
          </a>
        </nav>
      </header>

      
      <section className="flex items-center justify-between max-w-5xl mx-auto px-10 py-16 gap-12">
        <div className="flex-1">
          <span className="inline-block bg-[#EAF3DE] text-[#27500A] text-xs font-semibold px-3.5 py-1.5 rounded-full mb-4">
            Étudiants sénégalais au Maroc
          </span>

          <h1 className="text-4xl leading-tight text-[#2C2C2A] mb-4">
            Gérez votre <span className="text-[#D85A30]">bourse</span> en toute simplicité
          </h1>

          <p className="text-base text-[#5F5E5A] mb-7 leading-relaxed">
            Déposez vos demandes, suivez votre dossier et vos documents en ligne, où que vous soyez.
            Une plateforme pensée pour les étudiants sénégalais et la SGEE.
          </p>

          <div className="flex gap-3">
            <button className="bg-[#D85A30] text-[#FAECE7] px-6 py-3.5 rounded-xl text-sm font-semibold shadow-[0_6px_16px_rgba(216,90,48,0.3)]">
              Se connecter
            </button>
            <button className="bg-white text-[#2C2C2A] border border-[#D3D1C7] px-6 py-3.5 rounded-xl text-sm font-semibold">
              En savoir plus
            </button>
          </div>
        </div>

        <div className="flex-1 h-[220px] bg-[#F1EFE8] border-2 border-dashed border-[#B4B2A9] rounded-[20px] flex flex-col items-center justify-center text-[#5F5E5A] text-sm text-center shadow-[0_12px_32px_rgba(0,0,0,0.06)]">
         
          
            <img
                src={photoEtudiants}
                alt="Logo ugesm"
                className="flex-1 h-[220px] bg-[#F1EFE8] border-2 border-dashed border-[#B4B2A9] rounded-[20px] flex flex-col items-center justify-center text-[#5F5E5A] text-sm text-center shadow-[0_12px_32px_rgba(0,0,0,0.06)]"
                />

        </div>
      </section>

    

      <div className="max-w-5xl mx-auto px-10 pb-16 grid grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl p-6 text-center shadow-[0_4px_16px_rgba(0,0,0,0.05)]">
          <div className="text-3xl font-bold text-[#D85A30]">40+</div>
          <div className="text-xs text-[#888780] mt-1">étudiants boursiers</div>
        </div>
        <div className="bg-white rounded-2xl p-6 text-center shadow-[0_4px_16px_rgba(0,0,0,0.05)]">
          <div className="text-3xl font-bold text-[#D85A30]">8</div>
          <div className="text-xs text-[#888780] mt-1">universités partenaires</div>
        </div>
        <div className="bg-white rounded-2xl p-6 text-center shadow-[0_4px_16px_rgba(0,0,0,0.05)]">
          <div className="text-3xl font-bold text-[#D85A30]">100%</div>
          <div className="text-xs text-[#888780] mt-1">démarches en ligne</div>
        </div>
      </div>

    </div>
  );
}

export default Accueil;
