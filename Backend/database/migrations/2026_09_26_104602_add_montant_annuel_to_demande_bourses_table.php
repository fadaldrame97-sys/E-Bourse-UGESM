<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up(): void{
    Schema::table('demande_bourses', function (Blueprint $table) {
        $table->decimal('montant_annuel', 10, 2)->nullable();
    });
}

public function down(): void{
    Schema::table('demande_bourses', function (Blueprint $table) {
        $table->dropColumn('montant_annuel');
    });
}
};