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
    Route::get('/me', [AuthController::class, 'me']);


    Route::get('/demandes-bourse', [DemandeBourseController::class, 'index']);
    Route::post('/demandes-bourse', [DemandeBourseController::class, 'store']);

    Route::get('/billets-retour', [BilletRetourController::class, 'index']);
    Route::post('/billets-retour', [BilletRetourController::class, 'store']);
    Route::delete('/billets-retour/{id}', [BilletRetourController::class, 'annuler']);

  
    Route::get('/notifications', [NotificationController::class, 'index']);


    Route::prefix('admin')->group(function () {


       

       
        Route::get('/statistiques', [StatistiqueController::class, 'resume'])->middleware('admin.type');


      

        Route::middleware('admin.type:validateur,super_admin')->group(function () {


            Route::get('/demandes-en-attente',[DemandeBourseController::class, 'enAttente'] );

            Route::post('/demandes/{id}/valider',[DemandeBourseController::class, 'valider'] );

            Route::post('/demandes/{id}/rejeter', [DemandeBourseController::class, 'rejeter']);

            Route::get('/billets-en-attente',[BilletRetourController::class, 'enAttente']);

            Route::post('/billets/{id}/valider',[BilletRetourController::class, 'valider'] );

            Route::post('/billets/{id}/rejeter',[BilletRetourController::class, 'rejeter'] );
        });



        Route::middleware('admin.type:gestionnaire,super_admin')->group(function () {

          
            Route::get('/etudiants/billets-valides',[EtudiantController::class, 'etudiantsAvecBilletValide'] );
            Route::delete('/etudiants/{id}',[EtudiantController::class, 'destroy'] );
        });
    });
});