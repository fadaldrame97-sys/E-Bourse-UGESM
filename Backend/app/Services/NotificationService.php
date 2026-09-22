<?php

namespace App\Services;

use App\Models\Notification;
use Illuminate\Support\Facades\Auth;


class NotificationService{
    public function creer($etudiantId, $message, $type, $referenceId){
        return Notification::create([
            'etudiant_id' => $etudiantId,
            'message' => $message,
            'date_envoi' => now(),
            'type' => $type,
            'reference_id' => $referenceId,
        ]);
    }

    public function mesNotifications()
{
    $user = Auth::user();
    $etudiant = $user->etudiant;

    if (!$etudiant) {
        throw new \Exception(
            'Seul un étudiant peut consulter ses notifications.'
        );
    }

    return Notification::where('etudiant_id', $etudiant->id)
        ->orderBy('date_envoi', 'desc')
        ->get();
}
     }

