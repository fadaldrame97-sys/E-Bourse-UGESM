<?php

namespace App\Http\Controllers\Api;

use App\Models\Etudiant;
use App\Services\EtudiantService;
use Illuminate\Http\Request;

class EtudiantController
{


    protected $etudiantService;

    public function __construct(EtudiantService $etudiantService){
        $this->etudiantService = $etudiantService;
    }
  public function etudiantsAvecBilletValide(){
    $etudiants = $this->etudiantService
        ->etudiantsAvecBilletValide();

    return response()->json([
        'etudiants' => $etudiants
    ]);
}

public function destroy($id){
    $this->etudiantService->supprimerCompte($id);
    return response()->json(['message' => 'Compte étudiant supprimé.']);
}
}