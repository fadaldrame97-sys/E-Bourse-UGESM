<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        $admins = [
            [
                'nom' => 'Dramé',
                'prenom' => 'Fadal',
                'email' => 'superadmin@ebourse.sn',
                'code_agent' => 'ADM-001',
                'type_admin' => 'super_admin',
            ],
            [
                'nom' => 'Fall',
                'prenom' => 'Gestionnaire',
                'email' => 'gestionnaire@ebourse.sn',
                'code_agent' => 'ADM-002',
                'type_admin' => 'gestionnaire',
            ],
            [
                'nom' => 'Diop',
                'prenom' => 'Validateur',
                'email' => 'validateur@ebourse.sn',
                'code_agent' => 'ADM-003',
                'type_admin' => 'validateur',
            ],
        ];

        foreach ($admins as $data) {
            $user = User::create([
                'nom' => $data['nom'],
                'prenom' => $data['prenom'],
                'email' => $data['email'],
                'password' => Hash::make('password'),
                'telephone' => '+221 77 8000000',
                'role' => 'admin',
            ]);

            Admin::create([
                'user_id' => $user->id,
                'code_agent' => $data['code_agent'],
                'type_admin' => $data['type_admin'],
            ]);
        }
    }
}