<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BilletRetour extends Model
{
    protected $fillable = [
    'etudiant_id',
    'motif',
    'type',
    'date_demande',
    'date_validation',
    'statut',
];
}
