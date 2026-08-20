<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Etudiant extends Model
{
    
protected $fillable=[
    'user_id',
    'universite_id',
    'matricule',
    'numero_passeport',
    'date_naissance',
    'niveau_etude',
    'annee_arrivee',
    'nombre_redoublements',
    'statut_bourse',
    'motif_suspension',
    'duree_formation_annees',
];

protected function casts(): array
{
    return [
        'date_naissance' => 'date',
    ];
}


public function user()
{
    return $this->belongsTo(User::class);
}

public function universite()
{
    return $this->belongsTo(Universite::class);
}

public function demandeBourses()
{
    return $this->hasMany(DemandeBourse::class);
}

public function billetRetours()
{
    return $this->hasMany(BilletRetour::class);
}

public function notifications()
{
    return $this->hasMany(Notification::class);
}

}
