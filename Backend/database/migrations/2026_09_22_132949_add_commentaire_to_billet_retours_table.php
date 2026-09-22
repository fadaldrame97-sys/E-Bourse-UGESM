<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('billet_retours', 'commentaire')) {
            Schema::table('billet_retours', function (Blueprint $table) {
                $table->text('commentaire')->nullable();
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('billet_retours', 'commentaire')) {
            Schema::table('billet_retours', function (Blueprint $table) {
                $table->dropColumn('commentaire');
            });
        }
    }
};