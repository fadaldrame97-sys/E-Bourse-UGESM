<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('documents', function (Blueprint $table) {
           
            $table->id();

            $table->foreignId('demande_bourse_id')->constrained('demande_bourses')->onDelete('cascade');

            $table->string('nom');
            $table->enum('type', [ 'passeport', 'attestation_inscription', 'attestation_reussite','diplome', 'autre'      ]);
            $table->string('chemin_fichier');
             $table->enum('statut_validation', ['en_attente', 'valide', 'rejete'])->default('en_attente');
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
