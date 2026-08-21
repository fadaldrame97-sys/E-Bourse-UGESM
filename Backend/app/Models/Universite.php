<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Universite extends Model
{
    protected $fillable = [
    'nom',
    'ville',
];

public function etudiants(){
    return $this->hasMany(Etudiant::class);
}
}
