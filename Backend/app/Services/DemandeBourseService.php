<?php

namespace App\Services;

use App\Models\DemandeBourse;
use Illuminate\Support\Facades\Auth;

class DemandeBourseService
{
    public function getAll()
    {
        return DemandeBourse::with('etudiant.user', 'documents')->get();
    }

    public function create(array $data)
    {
        $user = Auth::user();
        $etudiant = $user->etudiant;

        if (!$etudiant) {
            throw new \Exception('Seul un étudiant peut créer une demande de bourse.');
        }

        $numeroDossier = $this->genererNumeroDossier();

        return DemandeBourse::create([
            'etudiant_id' => $etudiant->id,
            'numero_dossier' => $numeroDossier,
            'type' => $data['type'],
            'date_depot' => now(),
            'statut' => 'en_attente',
        ]);
    }   public function genererNumeroDossier(){
            
            $totaleDossiers=DemandeBourse::count();

            $numero=$totaleDossiers +1;

            return 'EB-' . str_pad($numero,5,'0',STR_PAD_LEFT);
    }

}