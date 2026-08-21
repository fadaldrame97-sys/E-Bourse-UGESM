<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthService{

   public function login(string $email, string $password){

    $user=User::where('email',$email)->first();

    if(!$user){

    throw ValidationException::withMessages([
        'email'=>['Identifiants incorrects']

    ]);
    }

    if(!Hash::check($password ,$user->password)){

        throw ValidationException::withMessages([
        'email'=>['Identifiants incorrects']]);

    }

    if ($user->role === 'admin') {
    $user->load('admin');
     } else {
    $user->load('etudiant');
    }

 
    $token=$user->createToken('e-boursToken')->plainTextToken;

    return [
        'User'=>$user,
        'Token'=>$token

    ];

   }

}