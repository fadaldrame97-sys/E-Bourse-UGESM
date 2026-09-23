<?php

namespace App\Services;
use App\Models\Etudiant;
use App\Services\NotificationService;

use App\Models\DemandeBourse;
use Illuminate\Support\Facades\Auth;

class EtudiantService{

public function etudiantsAvecBilletValide(){


    return Etudiant::whereHas('billetRetour', function ($query) {
        $query->where('statut', 'validee');
    })
    ->with('user')
    ->get();
}

public function supprimerCompte($id)
{
    $etudiant = Etudiant::with('user')->findOrFail($id);

    $billetValide = $etudiant->billetRetour()
        ->where('statut', 'validee')
        ->exists();

    if (!$billetValide) {
        throw new \Exception(
            'Le compte ne peut être supprimé que si le billet de retour est validé.'
        );
    }

    $etudiant->user->delete();

    return true;
}

}