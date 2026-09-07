<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DemandeBourseController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/demandes-bourse', [DemandeBourseController::class, 'store']);
});