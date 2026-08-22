<?php

namespace App\Http\Controllers\Api;
use App\Http\Requests\Auth\LoginRequest;

use Illuminate\Http\Request;
use App\Services\AuthService;
use Illuminate\Routing\Controller;

class AuthController extends Controller
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

       
    }

}
