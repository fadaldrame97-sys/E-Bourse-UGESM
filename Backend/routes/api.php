<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DemandeBourseController;
use App\Http\Controllers\Api\EtudiantController;
use App\Http\Controllers\Api\BilletRetourController;
use App\Http\Controllers\Api\StatistiqueController;
use App\Http\Controllers\Api\NotificationController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/demandes-bourse', [DemandeBourseController::class, 'store']);
    Route::get('/demandes-bourse', [DemandeBourseController::class, 'index']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/billets-retour', [BilletRetourController::class, 'store']);
    Route::get('/billets-retour', [BilletRetourController::class, 'index']);
    Route::get('/admin/statistiques', [StatistiqueController::class, 'resume']);
    Route::get('/admin/demandes-en-attente', [DemandeBourseController::class, 'enAttente']);
    Route::post('/admin/demandes/{id}/valider', [DemandeBourseController::class, 'valider']);
    Route::post('/admin/demandes/{id}/rejeter', [DemandeBourseController::class, 'rejeter']);

    Route::get('/admin/billets-en-attente', [BilletRetourController::class, 'enAttente']);
    Route::post('/admin/billets/{id}/valider', [BilletRetourController::class, 'valider']);
    Route::post('/admin/billets/{id}/rejeter', [BilletRetourController::class, 'rejeter']);

    Route::get('/admin/etudiants/billets-valides', [EtudiantController::class, 'etudiantsAvecBilletValide']);
    Route::delete('/admin/etudiants/{id}', [EtudiantController::class, 'destroy']);

    Route::delete('/billets-retour/{id}', [BilletRetourController::class, 'annuler']);
    
    Route::get('/notifications', [NotificationController::class, 'index']);
});