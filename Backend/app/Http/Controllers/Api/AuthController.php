<?php

namespace App\Http\Controllers\Api;
use App\Http\Requests\Auth\LoginRequest;

use Illuminate\Http\Request;
use App\Services\AuthService;


class AuthController 
{
    protected $authService;

    public function __construct(AuthService $authService){
         $this->authService = $authService;

    }

        public function login(LoginRequest $request)
    {
        $email = $request->validated('email');
        $password = $request->validated('password');

        $result = $this->authService->login($email, $password);
         return response()->json([
            'user' => $result['User'],
            'token' => $result['Token'],
        ]);
       
    }

    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message'=>'Vous etes déconectés!',
        ]);

    }

}
