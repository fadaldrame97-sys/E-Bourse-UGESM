<?php
namespace App\Services;

use App\Models\Notification;
use Illuminate\Support\Facades\Auth;

class NotificationService{


    public function creer($etudiantId, $message, $type, $referenceId){
        return Notification::create([

        ]);
    }


    


}