<?php

namespace App\Http\Controllers\Api;

use App\Services\BilletRetourService;
use App\Http\Requests\BilletRetour\StoreBilletRetourRequest;

class BilletRetourController
{
    protected $billetRetourService;

    public function __construct(BilletRetourService $billetRetourService)
    {
        $this->billetRetourService = $billetRetourService;
    }

    public function store(StoreBilletRetourRequest $request)
    {
        $data = [
            'type' => $request->validated('type'),
            'motif' => $request->validated('motif'),
            'diplome' => $request->file('diplome'),
        ];

        $billet = $this->billetRetourService->create($data);

        return response()->json([
            'message' => 'Demande de billet retour créée avec succès',
            'billet' => $billet,
        ], 201);
    }

    public function index(){
    $billets = $this->billetRetourService->mesBillets();

    return response()->json([
        'billets' => $billets,
    ]);
}
}