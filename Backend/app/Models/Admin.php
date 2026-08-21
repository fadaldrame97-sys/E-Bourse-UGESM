<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    protected $fillable = [
    'user_id',
    'code_agent',
    'type_admin',
];

public function user()
{
    return $this->belongsTo(User::class);
}

public function isSuperAdmin(): bool
{
    return $this->type_admin === 'super_admin';
}

public function isGestionnaire(): bool
{
    return $this->type_admin === 'gestionnaire';
}

public function isValidateur(): bool
{
    return $this->type_admin === 'validateur';
}
}
