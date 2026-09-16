<?php
namespace App\Services;

use App\Models\Etudiant;
use App\Models\DemandeBourse;
use App\Models\BilletRetour;
use App\Models\Universite;
class StatistiqueService{

   public function resume(){

    $nombreEtudiantActifs=Etudiant::where('statut_bourse','active')->count();
     $montantMensuel = config('bourse.montant_mensuel');

     
   }
}
