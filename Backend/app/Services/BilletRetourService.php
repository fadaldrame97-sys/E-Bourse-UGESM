<?php

namespace App\Services;

use App\Models\BilletRetour;
use Illuminate\Support\Facades\Auth;

class BilletRetourService{


        public function create(array $data){
        $user = Auth::user();
        $etudiant = $user->etudiant;

        if (!$etudiant) {
            throw new \Exception('Seul un étudiant peut demander un billet retour.');
        }


         $billetActif = BilletRetour::where('etudiant_id', $etudiant->id)
            ->where('statut', 'en_attente')
            ->first();

        if ($billetActif) {
            throw new \Exception('Vous avez déjà une demande de billet retour en cours.');
        }

            $cheminDiplome = null;

        if ($data['type'] === 'diplome' && $data['diplome']) {
        $cheminDiplome = $data['diplome']->store('diplomes', 'public');
        }

         return BilletRetour::create([
        'etudiant_id' => $etudiant->id,
        'type' => $data['type'],
        'motif' => $data['motif'],
        'chemin_diplome' => $cheminDiplome,
        'statut' => 'en_attente',
         ]);

    }

     public function mesBillets(){
        $user = Auth::user();
        $etudiant = $user->etudiant;

        if (!$etudiant) {
            throw new \Exception('Seul un étudiant peut consulter ses billets retour.');
        }

        return BilletRetour::where('etudiant_id', $etudiant->id)
            ->orderBy('date_demande', 'desc')
            ->get();
    }

}