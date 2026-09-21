<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('billet_retours', function (Blueprint $table) {
            $table->string('chemin_diplome')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('billet_retours', function (Blueprint $table) {
            $table->dropColumn('chemin_diplome');
        });
    }
};