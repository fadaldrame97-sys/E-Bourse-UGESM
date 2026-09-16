<?php

namespace App\Http\Controllers\Api;

use App\Services\StatistiqueService;

class StatistiqueController
{
    protected $statistiqueService;

    public function __construct(StatistiqueService $statistiqueService)
    {
        $this->statistiqueService = $statistiqueService;
    }

    public function resume()
    {
        return response()->json($this->statistiqueService->resume());
    }
}
