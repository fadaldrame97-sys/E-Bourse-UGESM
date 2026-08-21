<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DemandeBourse extends Model
{
    protected $fillable = [
    'etudiant_id',
    'numero_dossier',
    'type',
    'date_depot',
    'date_limite',
    'statut',
    'commentaire',
    'date_traitement',
];

protected function casts(): array
{
    return [
        'date_depot' => 'date',
        'date_limite' => 'date',
        'date_traitement' => 'date',
    ];
}

public function etudiant()
{
    return $this->belongsTo(Etudiant::class);
}

public function documents()
{
    return $this->hasMany(Document::class);
}
}
