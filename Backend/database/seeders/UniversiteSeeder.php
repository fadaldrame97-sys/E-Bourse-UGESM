<?php

namespace Database\Seeders;

use App\Models\Universite;
use Illuminate\Database\Seeder;

class UniversiteSeeder extends Seeder
{
    public function run(): void
    {
        $universites = [
            [
                'nom' => 'Université Sultan Moulay Slimane',
                'ville' => 'Béni Mellal',
            ],
            [
                'nom' => 'Université Mohammed V',
                'ville' => 'Rabat',
            ],
            [
                'nom' => 'Université Hassan II',
                'ville' => 'Casablanca',
            ],
            [
                'nom' => 'Université Cadi Ayyad',
                'ville' => 'Marrakech',
            ],
            [
                'nom' => 'Université Sidi Mohamed Ben Abdellah',
                'ville' => 'Fès',
            ],
            [
                'nom' => 'Université Abdelmalek Essaâdi',
                'ville' => 'Tanger',
            ],
            [
                'nom' => 'Université Ibn Zohr',
                'ville' => 'Agadir',
            ],
            [
                'nom' => 'Université Moulay Ismaïl',
                'ville' => 'Meknès',
            ],
        ];

        foreach ($universites as $universite) {
        Universite::firstOrCreate(['nom' => $universite['nom']], $universite);
       }
    }
}