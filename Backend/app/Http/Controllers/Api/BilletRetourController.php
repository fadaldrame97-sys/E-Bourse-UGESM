<?php

namespace App\Http\Controllers\Api;

use App\Services\BilletRetourService;
use App\Http\Requests\BilletRetour\StoreBilletRetourRequest;
use App\Http\Requests\BilletRetour\RejeterBilletRetourRequest;

class BilletRetourController
{
    protected $billetRetourService;

    public function __construct(BilletRetourService $billetRetourService){
        $this->billetRetourService = $billetRetourService;
    }

    public function store(StoreBilletRetourRequest $request){
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
        $billet = $this->billetRetourService->monBillet();

        return response()->json([
            'billet' => $billet,
        ]);
    }

    public function enAttente(){
        $billets = $this->billetRetourService->tousEnAttente();

        return response()->json(['billets' => $billets]);
    }

    public function valider($id){
        $billet = $this->billetRetourService->valider($id);

        return response()->json([
            'message' => 'Billet retour validé',
            'billet' => $billet,
        ]);
    }

  public function rejeter(RejeterBilletRetourRequest $request, $id){
    $billet = $this->billetRetourService->rejeter($id, $request->validated('commentaire'));

    return response()->json([
        'message' => 'Billet retour refusé',
        'billet' => $billet,
    ]);
}

public function annuler($id){
    $this->billetRetourService->annuler($id);

    return response()->json(['message' => 'Billet retour annulé.']);
}
}