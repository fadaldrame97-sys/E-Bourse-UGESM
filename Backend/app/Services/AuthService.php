<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthService{

   public function login(string $email, string $password){

      $user=User::where('email',$email)->first();

      if($user==='admin'?'admin':'etudiant');



   }

}