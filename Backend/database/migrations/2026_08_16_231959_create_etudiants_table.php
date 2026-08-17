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
        Schema::create('etudiants', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id') ->constrained('users') ->onDelete('cascade');

             $table->foreignId('universite_id')->constrained('universites')->onDelete('cascade');

             $table->string('matricule')->unique();
            $table->string('numero_passeport');
            $table->date('date_naissance');
            $table->string('niveau_etude');
            $table->year('annee_arrivee');
            $table->integer('nombre_redoublements')->default(0);
            $table->string('statut_bourse')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('etudiants');
    }
};
