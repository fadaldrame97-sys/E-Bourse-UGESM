<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckAdminType
{
    public function handle(Request $request, Closure $next, ...$typesAutorises){
        $admin = $request->user()?->admin;

        if (!$admin) {
            return response()->json(['message' => 'Accès réservé aux administrateurs.'], 403);
        }

        if (!empty($typesAutorises) && !in_array($admin->type_admin, $typesAutorises)) {
            return response()->json(['message' => "Vous n'avez pas la permission d'effectuer cette action."], 403);
        }

        return $next($request);
    }
}