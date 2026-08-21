<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $fillable = [
    'demande_bourse_id',
    'nom',
    'type',
    'chemin_fichier',
    'statut_validation',
];

public function demandeBourse()
{
    return $this->belongsTo(DemandeBourse::class);
}
}
