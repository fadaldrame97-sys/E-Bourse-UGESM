<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Services\DemandeBourseService;
use App\Http\Requests\DemandeBourse\StoreDemandeBourseRequest;
use App\Http\Requests\DemandeBourse\RejeterDemandeBourseRequest;

class DemandeBourseController
{
    protected $demandeBourseService;

     public function __construct(DemandeBourseService $demandeBourseService){
    $this->demandeBourseService = $demandeBourseService;
    }
    public function index()
    {
        $demandes=$this->demandeBourseService->mesDemandes();

        return response()->json([
        'demandes' => $demandes,
    ]);

    }

    /**
     * Store a newly created resource in storage.
     */
   public function store(StoreDemandeBourseRequest $request){

    $data = [
        'type' => $request->validated('type'),
    ];

    $fichiers = [
        'passeport' => $request->file('passeport'),
        'attestation_inscription' => $request->file('attestation_inscription'),
        'attestation_reussite' => $request->file('attestation_reussite'),
    ];

    $demande = $this->demandeBourseService->create($data, $fichiers);

    return response()->json([
        'message' => 'Demande de bourse créée avec succès',
        'demande' => $demande
    ], 201);

}

    public function enAttente(){
    $demandes = $this->demandeBourseService->toutesLesDemandesEnAttente();

    return response()->json(['demandes' => $demandes]);
    }

    public function valider($id){
        $demande = $this->demandeBourseService->valider($id);

        return response()->json([
            'message' => 'Demande validée avec succès',
            'demande' => $demande,
        ]);
    }

    public function rejeter(RejeterDemandeBourseRequest $request, $id){
        $demande = $this->demandeBourseService->rejeter($id, $request->validated('commentaire'));

        return response()->json([
            'message' => 'Demande rejetée',
            'demande' => $demande,
        ]);
    }
    }
