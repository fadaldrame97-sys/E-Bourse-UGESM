<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('demande_bourses', function (Blueprint $table) {
            $table->id();

            $table->foreignId('etudiant_id')->constrained('etudiants')->onDelete('cascade');

            $table->string('numero_dossier')->unique();
            $table->enum('type', ['premiere_attribution', 'renouvellement']);
            $table->date('date_depot');
            $table->date('date_limite')->nullable();
            $table->enum('statut', [
                'en_attente',
                'incomplet',
                'en_cours',
                'validee',
                'rejetee',
            ])->default('en_attente');
            $table->text('commentaire')->nullable();
            $table->date('date_traitement')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('demande_bourses');
    }
};