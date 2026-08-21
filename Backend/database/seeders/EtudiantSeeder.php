<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Etudiant;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class EtudiantSeeder extends Seeder
{
    public function run(): void
    {
        $prenoms = [
            'Mouhamadou Fadal', 'Khalifa', 'Moussa', 'Babacar', 'Aicha',
            'Coumba', 'Boubacar', 'Fatou', 'Fallou', 'Abdoulaye',
            'Cheikh', 'Ibrahima', 'Ousmane', 'Serigne', 'Awa',
            'Mariama', 'Ndeye', 'Astou', 'Modou', 'Alioune',
            'Pape', 'Assane', 'Mamadou', 'Aminata', 'Bineta',
            'Amadou', 'Adama', 'Rokhaya', 'Khady', 'Sokhna',
            'Malick', 'Elhadji', 'Yacine', 'Souleymane', 'Mbaye',
            'Daouda', 'Fatoumata', 'Ndella', 'Ismaila', 'Aissatou',
        ];

        $noms = [
            'Dramé', 'Sylla', 'Diop', 'Faye', 'Ndong',
            'Sy', 'Ba', 'Ndiaye', 'Niang', 'Diallo',
            'Fall', 'Gueye', 'Sow', 'Thiam', 'Sarr',
            'Kane', 'Cissé', 'Diagne', 'Seck', 'Ndour',
            'Sène', 'Wade', 'Diatta', 'Camara', 'Touré',
            'Sagna', 'Diedhiou', 'Mbaye', 'Badiane', 'Diouf',
            'Sonko', 'Mendy', 'Manga', 'Lo', 'Diack',
            'Dieng', 'Coly', 'Diakhaté', 'Barry', 'Kébé',
        ];

        $niveaux = ['2eme année', '3eme année', '4eme année', '5eme année'];

        for ($i = 1; $i <= 40; $i++) {

            $user = User::create([
                'nom' => $noms[$i - 1],
                'prenom' => $prenoms[$i - 1],
                'email' => 'etudiant' . $i . '@ebourse.test',
                'password' => Hash::make('password'),
                'telephone' => '0600000000',
                'role' => 'etudiant',
            ]);

            Etudiant::create([
                'user_id' => $user->id,
                'universite_id' => (($i - 1) % 8) + 1,
                'matricule' => 'ETU' . $i,
                'numero_passeport' => 'P' . $i,
                'date_naissance' => '2000-01-01',
                'niveau_etude' => $niveaux[($i - 1) % 4],
                'annee_arrivee' => 2021 + (($i - 1) % 5),
                'nombre_redoublements' => 0,
                'statut_bourse' => 'actif',
            ]);
        }
    }
}