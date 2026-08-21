<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{

protected $fillable = [
    'etudiant_id',
    'message',
    'date_envoi',
    'type',
    'reference_id',
];
    protected function casts(): array
{
    return [
        'date_envoi' => 'datetime',
    ];
}

public function etudiant()
{
    return $this->belongsTo(Etudiant::class);
}

public function reference()
{
    if ($this->type === 'demande_bourse') {
        return DemandeBourse::find($this->reference_id);
    }

    if ($this->type === 'billet_retour') {
        return BilletRetour::find($this->reference_id);
    }

    return null;
}
}
