<?php

namespace App\Services;

use App\Models\DemandeBourse;

class DemandeBourseService
{
    public function getAll()
    {
        return DemandeBourse::with('etudiant.user', 'documents')->get();
    }
}