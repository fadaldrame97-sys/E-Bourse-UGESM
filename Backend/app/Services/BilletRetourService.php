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
    }

}