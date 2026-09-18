<?php

namespace App\Services;
use App\Models\Document;

use App\Models\DemandeBourse;
use Illuminate\Support\Facades\Auth;

class DemandeBourseService
{
    public function getAll()
    {
        return DemandeBourse::with('etudiant.user', 'documents')->get();
    }

   public function create(array $data, array $fichiers)
{
    $user = Auth::user();
    $etudiant = $user->etudiant;

    if (!$etudiant) {
        throw new \Exception('Seul un étudiant peut créer une demande de bourse.');
    }

    $demandeActive=DemandeBourse::where('etudiant_id', $etudiant->id)
                    ->whereIn('statut',['en_attente','incomplet','en_cours'])->first();

    if($demandeActive) {
        throw new \Exception('Vous déja une demande active');
    }                

    $numeroDossier = $this->genererNumeroDossier();

    $demande = DemandeBourse::create([
        'etudiant_id' => $etudiant->id,
        'numero_dossier' => $numeroDossier,
        'type' => $data['type'],
        'date_depot' => now(),
        'statut' => 'en_attente',
    ]);

    foreach ($fichiers as $type => $fichier) {
        if ($fichier) {
            $chemin = $fichier->store('documents', 'public');

            Document::create([
                'demande_bourse_id' => $demande->id,
                'nom' => $fichier->getClientOriginalName(),
                'type' => $type,
                'chemin_fichier' => $chemin,
                'statut_validation' => 'en_attente',
            ]);
        }
    }

    return $demande;
}      public function genererNumeroDossier(){
            
            $totaleDossiers=DemandeBourse::count();

            $numero=$totaleDossiers +1;

            return 'EB-' . str_pad($numero,5,'0',STR_PAD_LEFT);
    }

    public function mesDemandes(){


        $user=Auth::user();
        $etudiant=$user->etudiant;



        if (!$etudiant) {
            throw new \Exception('Seul un étudiant peut consulter ses demandes.');
        }

        return DemandeBourse::where('etudiant_id', $etudiant->id)
            ->orderBy('date_depot', 'desc')
            ->get();
    }


    public function toutesLesDemandesEnAttente(){
    return DemandeBourse::with('etudiant.user')
        ->where('statut', 'en_attente')
        ->orderBy('date_depot', 'asc')
        ->get();
}


public function valider($demandeId){

    $user=Auth::user();
    $admin = $user->admin;



      if (!$admin) {
        throw new \Exception('Seul un admin peut valider une demande.');
    }

    if (!$admin->isValidateur() && !$admin->isSuperAdmin()) {
        throw new \Exception('Vous n\'avez pas la permission de valider une demande.');
    }

    $demande = DemandeBourse::find($demandeId);

    if (!$demande) {
        throw new \Exception('Demande introuvable.');
            }

        $demande->statut = 'validee';
        $demande->date_traitement = now();
        $demande->save();

        $etudiant = $demande->etudiant;
        $etudiant->statut_bourse = 'actif';
        $etudiant->save();

    return $demande;

     }
     

public function rejeter($demandeId, $commentaire)
{
    $user = Auth::user();
    $admin = $user->admin;

    if (!$admin) {
        throw new \Exception('Seul un admin peut rejeter une demande.');
    }

    if (!$admin->isValidateur() && !$admin->isSuperAdmin()) {
        throw new \Exception('Vous n\'avez pas la permission de rejeter une demande.');
    }

    $demande = DemandeBourse::find($demandeId);

        if (!$demande) {
        throw new \Exception('Demande introuvable.');
    }

    $demande->statut = 'rejetee';
    $demande->commentaire = $commentaire;
    $demande->date_traitement = now();
    $demande->save();

    return $demande;


}
    

}