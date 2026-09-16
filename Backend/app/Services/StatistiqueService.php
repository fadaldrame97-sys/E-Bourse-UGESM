<?php
namespace App\Services;

use App\Models\Etudiant;
use App\Models\DemandeBourse;
use App\Models\BilletRetour;
use App\Models\Universite;
class StatistiqueService{

   public function resume(){

    $nombreEtudiantsActifs=Etudiant::where('statut_bourse','active')->count();
     $montantMensuel = config('bourse.montant_mensuel');

     return [
            'etudiants_actifs' => $nombreEtudiantsActifs,
            'demandes_en_attente' => DemandeBourse::where('statut', 'en_attente')->count(),
            'demandes_validees' => DemandeBourse::where('statut', 'validee')->count(),
            'billets_en_attente' => BilletRetour::where('statut', 'en_attente')->count(),
            'budget_mensuel' => $nombreEtudiantsActifs * $montantMensuel,
            'budget_annuel' => $nombreEtudiantsActifs * $montantMensuel * 12,
            'par_ville' => $this->repartitionParVille(),  
            'universites' => $this->universitesAvecEtudiantsActifs(),
        ];

        

     
   }

   public function universitesAvecEtudiantsActifs(){
    
         return Universite::withCount(['etudiants' => function ($query) {
            $query->where('statut_bourse', 'actif');
         }])
         ->having('etudiants_count', '>', 0)
         ->get();
  }

  public function repartitionParVille(){
    return $this->universitesAvecEtudiantsActifs()
        ->groupBy('ville')
        ->map(function ($universites, $ville) {
            return [
                'ville' => $ville,
                'nombre_etudiants' => $universites->sum('etudiants_count'),
            ];
        }) ->values();
    }
}
