<?php

namespace App\Services;

use App\Models\BilletRetour;
use Illuminate\Support\Facades\Auth;
use App\Services\NotificationService;
use Exception;

class BilletRetourService
{

    protected $notificationService;

public function __construct(NotificationService $notificationService){
    $this->notificationService = $notificationService;
}
    public function create(array $data){
        $user = Auth::user();
        $etudiant = $user->etudiant;

        if (!$etudiant) {
            throw new Exception(
                'Seul un étudiant peut demander un billet retour.'
            );
        }

        $billetActif = BilletRetour::where('etudiant_id', $etudiant->id)
            ->where('statut', 'en_attente')
            ->first();

        if ($billetActif) {
            throw new Exception(
                'Vous avez déjà une demande de billet retour en cours.'
            );
        }

            $cheminDiplome = null;

            if ($data['type'] === 'diplome' && !empty($data['diplome'])) {
                $cheminDiplome = $data['diplome']->store('diplomes', 'public');
            }

        
           
            $billetExistant = BilletRetour::where('etudiant_id', $etudiant->id)
                    ->whereIn('statut', ['en_attente', 'validee'])
                    ->first();

                        if ($billetExistant) {

                    if ($billetExistant->statut === 'validee') {
                        throw new Exception(
                            'Votre billet retour a déjà été validé. '
                            . 'Vous ne pouvez plus effectuer une nouvelle demande.'
                        );
                    }

                    throw new Exception(
                        'Vous avez déjà une demande de billet retour en cours.'
                    );
                }



        

            return BilletRetour::create([
                'etudiant_id' => $etudiant->id,
                'type' => $data['type'],
                'motif' => $data['motif'],
                'preuve_diplome' => $cheminDiplome,
                'statut' => 'en_attente',
                'date_demande' => now(),
            ]);
        }

    public function monBillet() {
        $user = Auth::user();
        $etudiant = $user->etudiant;

        if (!$etudiant) {
            throw new Exception(
                'Seul un étudiant peut consulter son billet retour.'
            );
        }

        return BilletRetour::where('etudiant_id', $etudiant->id)
            ->first();
    }

    public function tousEnAttente(){
        return BilletRetour::with('etudiant.user')
            ->where('statut', 'en_attente')
            ->orderBy('date_demande')
            ->get();
    }

    public function valider($id){
        $billet = BilletRetour::findOrFail($id);

        $billet->statut = 'validee';
        $billet->date_validation = now();
        $billet->save();

         $etudiant = $billet->etudiant;

        $this->notificationService->creer(
            $etudiant->id,
            'Votre billet retour a été validé.Le billet sera envoyé par email.',
            'billet_retour',
            $billet->id
        );

        return $billet;
    }

    public function rejeter($id, $commentaire){
        $billet = BilletRetour::findOrFail($id);

        $billet->statut = 'refusee';
        $billet->commentaire = $commentaire;
        $billet->date_validation = now();
        $billet->save();

        $etudiant = $billet->etudiant;

        $this->notificationService->creer(
            $etudiant->id,
            'Votre demande de billet a été rejetée. Consultez "Mes Demandes" pour le motif.',
            'billet_retour',
            $billet->id
        );

        return $billet;
    }



    public function annuler($billetId){
    $user = Auth::user();
    $etudiant = $user->etudiant;

    if (!$etudiant) {
        throw new Exception('Seul un étudiant peut annuler sa demande.');
    }

    $billet = BilletRetour::where('id', $billetId)
        ->where('etudiant_id', $etudiant->id)
        ->first();

    if (!$billet) {
        throw new Exception('Billet retour introuvable.');
    }

    if ($billet->statut !== 'en_attente') {
        throw new Exception('Seul un billet retour en attente peut être annulé.');
    }

    $billet->delete();

    return true;
}
}