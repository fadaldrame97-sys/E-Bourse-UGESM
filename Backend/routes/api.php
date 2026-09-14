<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DemandeBourseController;
use App\Http\Controllers\Api\BilletRetourController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/demandes-bourse', [DemandeBourseController::class, 'store']);
    Route::get('/demandes-bourse', [DemandeBourseController::class, 'index']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/billets-retour', [BilletRetourController::class, 'store']);
Route::get('/billets-retour', [BilletRetourController::class, 'index']);
});