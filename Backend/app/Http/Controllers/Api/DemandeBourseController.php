<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Services\DemandeBourseService;

class DemandeBourseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
       public function store( Request $request){

        $data=$request->validate([
            'type'=>'required|in:premiere_attribution,renouvellement',
        ]);
        $demande=$this->DemandeBourseService->create($data);

          return response()->json([
        'message' => 'Demande de bourse créée avec succès',
        'demande' => $demande
    ], 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
