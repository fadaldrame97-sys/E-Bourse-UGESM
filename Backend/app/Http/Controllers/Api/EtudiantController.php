<?php

namespace App\Http\Controllers\Api;

use App\Models\Etudiant;
use Illuminate\Http\Request;

class EtudiantController
{
    public function etudiantsBilletValide()
    {
        $etudiants = Etudiant::with('user', 'billetRetour')
            ->whereHas('billetRetour', function ($q) {
                $q->where('statut', 'validee');
            })
            ->get();

        return response()->json(['etudiants' => $etudiants]);
    }

    public function destroy($id)
    {
        $etudiant = Etudiant::findOrFail($id);
        $user = $etudiant->user;

        $etudiant->delete();

        if ($user) {
            $user->delete();
        }

        return response()->json(['message' => 'Compte étudiant supprimé.']);
    }
}