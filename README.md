# E-Bourse UGESM

Plateforme web de gestion des demandes de bourse et des billets de
retour pour les étudiants sénégalais au Maroc.

##  Auteur

**Mouhamadou Fadal Dramé**  
Développeur Full Stack Junior — Laravel / React  


- GitHub : [fadaldrame97-sys](https://github.com/fadaldrame97-sys)
- Portfolio : [fadal.vercel.app](https://fadal.vercel.app)
- LinkedIn : [Mouhamadou Fadal Dramé](https://www.linkedin.com/in/mouhamadou-fadal-drame/)

---

Le projet est organisé en deux parties :

-   **Backend** : API Laravel
-   **Frontend** : interface React avec Vite et Tailwind CSS
-   **Base de données** : MySQL en environnement Docker
-   **Authentification** : Laravel Sanctum

------------------------------------------------------------------------

## 1. Présentation du projet

E-Bourse UGESM a pour objectif de centraliser les démarches liées aux
bourses des étudiants sénégalais au Maroc.

La plateforme permet notamment de :

-   se connecter avec un compte étudiant ou administrateur ;
-   déposer une demande de bourse ;
-   choisir entre une première attribution et un renouvellement ;
-   téléverser les justificatifs nécessaires ;
-   consulter ses demandes ;
-   consulter les documents déposés ;
-   recevoir des notifications après le traitement d'une demande ;
-   demander un billet de retour ;
-   joindre un diplôme pour une demande de retour liée au diplôme ;
-   annuler une demande de billet encore en attente ;
-   permettre aux administrateurs autorisés de consulter et traiter les
    demandes ;
-   valider ou rejeter les demandes avec un commentaire ;
-   consulter les statistiques de la plateforme ;
-   gérer les étudiants ayant un billet de retour validé.

------------------------------------------------------------------------

## 2. Technologies utilisées

### Backend

-   PHP 8.3+
-   Laravel 13
-   Laravel Sanctum
-   Eloquent ORM
-   MySQL 8
-   Composer

### Frontend

-   React 19
-   React DOM 19
-   React Router DOM 7
-   Axios
-   Tailwind CSS 4
-   Vite

### Développement

-   Git / GitHub
-   Docker / Docker Compose
-   VS Code

------------------------------------------------------------------------

## 3. Architecture du projet

``` text
E-Bourse-UGESM/
│
├── Backend/
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/Api/
│   │   │   ├── Middleware/
│   │   │   └── Requests/
│   │   ├── Models/
│   │   ├── Providers/
│   │   └── Services/
│   │
│   ├── config/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── routes/
│   │   └── api.php
│   ├── storage/
│   ├── composer.json
│   └── Dockerfile
│
├── Frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md
```

------------------------------------------------------------------------

## 4. Fonctionnement général

### Étudiant

L'étudiant peut :

1.  se connecter ;
2.  accéder à son tableau de bord ;
3.  déposer une demande de bourse ;
4.  joindre ses justificatifs ;
5.  consulter ses demandes ;
6.  consulter les documents associés ;
7.  consulter les notifications ;
8.  déposer une demande de billet retour ;
9.  consulter son billet retour ;
10. annuler un billet encore en attente.

### Administrateur

Trois types d'administrateurs sont prévus :

-   `super_admin`
-   `gestionnaire`
-   `validateur`

#### Super administrateur

Le `super_admin` peut accéder aux fonctionnalités administratives
prévues pour les gestionnaires et les validateurs.

#### Gestionnaire

Le `gestionnaire` est notamment associé à :

-   la gestion des étudiants ;
-   la consultation des statistiques ;
-   la gestion des comptes étudiants dans le périmètre prévu par le
    projet.

#### Validateur

Le `validateur` est notamment associé au traitement des demandes :

-   consultation des demandes de bourse ;
-   validation ;
-   rejet avec motif ;
-   consultation et traitement des billets retour.

------------------------------------------------------------------------

## 5. Modèle de données

Les principales tables sont :

### `users`

Contient les informations communes des utilisateurs.

Champs principaux :

-   `id`
-   `nom`
-   `prenom`
-   `email`
-   `password`
-   `telephone`
-   `role`

Le rôle utilisateur est actuellement :

``` text
etudiant
admin
```

------------------------------------------------------------------------

### `etudiants`

Contient les informations spécifiques aux étudiants.

Principaux champs :

-   `user_id`
-   `universite_id`
-   `matricule`
-   `numero_passeport`
-   `date_naissance`
-   `niveau_etude`
-   `annee_arrivee`
-   `nombre_redoublements`
-   `statut_bourse`

------------------------------------------------------------------------

### `admins`

Contient les informations spécifiques aux administrateurs.

Principaux champs :

-   `user_id`
-   `code_agent`
-   `type_admin`

Types :

``` text
super_admin
gestionnaire
validateur
```

------------------------------------------------------------------------

### `universites`

Contient les universités des étudiants.

Champs :

-   `nom`
-   `ville`

------------------------------------------------------------------------

### `demande_bourses`

Contient les demandes de bourse.

Types :

``` text
premiere_attribution
renouvellement
```

Statuts :

``` text
en_attente
incomplet
en_cours
validee
rejetee
```

------------------------------------------------------------------------

### `documents`

Contient les documents téléversés pour une demande de bourse.

Types prévus :

``` text
passeport
attestation_inscription
attestation_reussite
diplome
autre
```

Chaque document possède également un statut de validation :

``` text
en_attente
valide
rejete
```

------------------------------------------------------------------------

### `billet_retours`

Contient les demandes de billets retour.

Types :

``` text
diplome
abandon
```

Statuts :

``` text
en_attente
validee
refusee
```

Le projet contient également :

-   `chemin_diplome`
-   `commentaire`

Le champ `commentaire` sert notamment à conserver le motif de rejet
communiqué par l'administration.

------------------------------------------------------------------------

### `notifications`

Permet d'informer l'étudiant du traitement de ses demandes.

Types :

``` text
demande_bourse
billet_retour
general
```

------------------------------------------------------------------------

## 6. Règles métier principales

### Demande de bourse

Une demande active ne peut pas être doublée.

Les statuts considérés comme une demande en cours sont :

``` text
en_attente
incomplet
en_cours
```

Un étudiant ne peut effectuer une première attribution validée qu'une
seule fois.

Après une première attribution validée :

``` text
première attribution
        ↓
      validée
        ↓
prochaine demande = renouvellement
```

Un renouvellement nécessite donc une première attribution validée.

Si une demande est rejetée, l'étudiant peut effectuer une nouvelle
demande en corrigeant les éléments demandés par l'administration.

------------------------------------------------------------------------

### Documents

Pour une demande de bourse, le frontend demande actuellement :

-   passeport ;
-   attestation d'inscription ;
-   attestation de réussite.

Les fichiers sont enregistrés dans le stockage public Laravel.

------------------------------------------------------------------------

### Billet retour

Une demande de billet peut être :

-   en attente ;
-   validée ;
-   refusée.

Une demande en attente peut être annulée par l'étudiant.

Après un rejet, une nouvelle demande peut être effectuée.

Une fois le billet validé, le projet prévoit qu'un nouveau billet ne
doit plus être demandé.

Pour le type `diplome`, un fichier diplôme est demandé.

------------------------------------------------------------------------

### Notifications

Lorsqu'une demande est validée ou rejetée, une notification est créée
pour l'étudiant concerné.

Exemples :

-   demande de bourse validée ;
-   demande de bourse rejetée ;
-   billet retour validé ;
-   billet retour rejeté.

------------------------------------------------------------------------

## 7. API principale

Toutes les routes protégées utilisent actuellement :

``` text
auth:sanctum
```

### Authentification

``` http
POST /api/login
POST /api/logout
GET  /api/me
```

### Demandes de bourse

``` http
POST /api/demandes-bourse
GET  /api/demandes-bourse
```

### Billets retour étudiant

``` http
POST /api/billets-retour
GET  /api/billets-retour
DELETE /api/billets-retour/{id}
```

### Administration des demandes de bourse

``` http
GET  /api/admin/demandes-en-attente
POST /api/admin/demandes/{id}/valider
POST /api/admin/demandes/{id}/rejeter
```

### Administration des billets retour

``` http
GET  /api/admin/billets-en-attente
POST /api/admin/billets/{id}/valider
POST /api/admin/billets/{id}/rejeter
```

### Statistiques

``` http
GET /api/admin/statistiques
```

### Gestion des étudiants

La route backend actuellement présente dans le projet est :

``` http
GET    /api/admin/etudiants/billet-valide
DELETE /api/admin/etudiants/{id}
```

Elle sert à consulter les étudiants associés à un billet retour validé
et à supprimer un compte étudiant selon la logique prévue.

### Notifications

``` http
GET /api/notifications
```

------------------------------------------------------------------------

## 8. Frontend

Les principales pages React sont :

``` text
Accueil
Login
DashboardEtudiant
DemandeBourse
MesDemandes
BilletRetour
Notifications

AdminDashboard
AdminDemandes
AdminBillets
AdminEtudiants
```

Les composants réutilisables comprennent notamment :

``` text
BoutonPrimaire
BoutonRetour
Carte
NavBar
DemandeBourse
```

Axios est centralisé dans :

``` text
Frontend/src/api/axios.js
```

Le token Sanctum est récupéré depuis `localStorage` et envoyé dans
l'en-tête :

``` http
Authorization: Bearer TOKEN
```

------------------------------------------------------------------------

## 9. Installation en local

### Prérequis

Installer :

-   PHP 8.3 ou supérieur ;
-   Composer ;
-   Node.js ;
-   npm ;
-   MySQL ;
-   Git.

------------------------------------------------------------------------

### Backend

Entrer dans le dossier :

``` bash
cd Backend
```

Installer les dépendances :

``` bash
composer install
```

Créer le fichier `.env` :

``` bash
cp .env.example .env
```

Sous Windows PowerShell, si nécessaire :

``` powershell
Copy-Item .env.example .env
```

Générer la clé Laravel :

``` bash
php artisan key:generate
```

Configurer ensuite la base de données dans `.env`.

Exemple MySQL :

``` env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=e_bourse_ugesm
DB_USERNAME=root
DB_PASSWORD=
```

Lancer les migrations :

``` bash
php artisan migrate
```

Pour recréer complètement la base en développement :

``` bash
php artisan migrate:fresh --seed
```

Lancer le backend :

``` bash
php artisan serve --port=8000
```

L'API sera disponible sur :

``` text
http://127.0.0.1:8000
```

------------------------------------------------------------------------

### Frontend

Dans un autre terminal :

``` bash
cd Frontend
```

Installer les dépendances :

``` bash
npm install
```

Lancer Vite :

``` bash
npm run dev
```

Le frontend est généralement disponible sur :

``` text
http://localhost:5173
```

------------------------------------------------------------------------

## 10 Docker

Le projet est disponible sous forme de deux images Docker :

- Backend Laravel
- Frontend React

### Images Docker Hub


Dokcker hub : https://hub.docker.com/repositories/fadaldrame

```bash
docker pull fadaldrame/e-bourse-ugesm-backend:latest
docker pull fadaldrame/e-bourse-ugesm-frontend:latest

## . Installation avec Docker

Le projet contient un `docker-compose.yml` avec trois services :

``` text
db
backend
frontend
```

### Démarrage

Depuis la racine :

``` bash
docker compose up --build
```

Les ports prévus sont :

``` text
MySQL    : 3307
Backend  : 8000
Frontend : 5173
```

Pour arrêter les services :

``` bash
docker compose down
```

Pour supprimer également le volume de la base :

``` bash
docker compose down -v
```

Attention : cette dernière commande supprime les données MySQL du volume
Docker.

------------------------------------------------------------------------



## 11. Seeders

Le `DatabaseSeeder` appelle actuellement :

``` text
UniversiteSeeder
AdminSeeder
EtudiantSeeder
```

### Administrateurs de test

Les comptes présents dans le seeder sont :

``` text
superadmin@ebourse.sn
gestionnaire@ebourse.sn
validateur@ebourse.sn
```

Le mot de passe défini par le seeder est :

``` text
password
```

### Étudiants de test

Le `EtudiantSeeder` crée 40 étudiants de démonstration avec des adresses
de type :

``` text
etudiant1@ebourse.test
etudiant2@ebourse.test
...
etudiant40@ebourse.test
```

Le mot de passe défini est :

``` text
password
```

Ces identifiants sont destinés au développement et aux tests locaux.

------------------------------------------------------------------------

## 12. Montant de la bourse

Le montant mensuel est défini dans :

``` text
Backend/config/bourse.php
```

Valeur par défaut :

``` text
1000 DH / mois
```

Il peut être configuré avec :

``` env
BOURSE_MONTANT_MENSUEL=1000
```

Le tableau de bord administratif utilise ce montant pour calculer le
budget mensuel et annuel estimé.

------------------------------------------------------------------------

## 13. Stockage des fichiers

Les justificatifs sont enregistrés avec le disque Laravel `public`.

Les demandes de bourse utilisent notamment :

``` text
storage/app/public/documents
```

Les diplômes utilisent :

``` text
storage/app/public/diplomes
```

Pour rendre les fichiers accessibles depuis `public/storage`, exécuter :

``` bash
php artisan storage:link
```

Sous Windows, si la création du lien symbolique rencontre un problème de
permissions, il peut être nécessaire d'utiliser un terminal avec les
droits appropriés.

------------------------------------------------------------------------

## 14. Sécurité et autorisations

L'authentification API utilise Laravel Sanctum.

Le projet contient également un middleware :

``` text
Backend/app/Http/Middleware/CheckAdminType.php
```

Il permet de vérifier le type d'administrateur :

``` text
super_admin
gestionnaire
validateur
```

Le frontend masque certaines fonctionnalités selon le type
d'administrateur.

Exemple :

``` text
validateur + super_admin
    → traitement des demandes

gestionnaire + super_admin
    → gestion des étudiants et statistiques
```

La vérification frontend ne doit cependant pas être considérée comme une
protection suffisante : les routes backend doivent également appliquer
les autorisations nécessaires.

------------------------------------------------------------------------

## 15. Relations principales

``` text
User
 ├── Etudiant
 └── Admin

Etudiant
 ├── Universite
 ├── DemandeBourses
 ├── BilletRetour
 └── Notifications

DemandeBourse
 └── Documents

BilletRetour
 └── Etudiant
```

Schéma simplifié :

``` text
users
  │
  ├───────────────┐
  ↓               ↓
etudiants       admins
  │
  ├── universites
  │
  ├── demande_bourses
  │       │
  │       └── documents
  │
  ├── billet_retours
  │
  └── notifications
```

------------------------------------------------------------------------

## 16. Organisation du code backend

Le projet utilise une séparation simple entre :

### Controllers

Les contrôleurs reçoivent les requêtes et retournent les réponses HTTP.

``` text
app/Http/Controllers/Api/
```

### Form Requests

Les validations des données entrantes sont placées dans :

``` text
app/Http/Requests/
```

### Services

La logique métier principale est placée dans :

``` text
app/Services/
```

Services principaux :

``` text
AuthService
DemandeBourseService
BilletRetourService
EtudiantService
NotificationService
StatistiqueService
```

### Models

Les modèles Eloquent sont placés dans :

``` text
app/Models/
```

------------------------------------------------------------------------

## 17. Flux d'une demande de bourse

``` text
Étudiant
   │
   ↓
Choisit le type de demande
   │
   ├── Première attribution
   │
   └── Renouvellement
   │
   ↓
Ajoute les justificatifs
   │
   ↓
POST /demandes-bourse
   │
   ↓
Demande créée avec statut "en_attente"
   │
   ↓
Administrateur
   │
   ├── Valider
   │       ↓
   │    statut = validee
   │
   └── Rejeter
           ↓
       statut = rejetee
           ↓
       notification étudiant
```

------------------------------------------------------------------------

## 18. Flux d'un billet retour

``` text
Étudiant
   │
   ↓
Choisit :
   ├── Diplôme
   └── Abandon
   │
   ↓
Envoie la demande
   │
   ↓
statut = en_attente
   │
   ↓
Administrateur
   │
   ├── Valider
   │       ↓
   │    statut = validee
   │
   └── Rejeter
           ↓
       statut = refusee
           ↓
       commentaire + notification
```

Une demande en attente peut également être annulée par l'étudiant.

------------------------------------------------------------------------

## 19. Commandes Git utiles

Voir la branche actuelle :

``` bash
git branch
```

Voir les modifications :

``` bash
git status
```

Ajouter les fichiers :

``` bash
git add .
```

Créer un commit :

``` bash
git commit -m "message du commit"
```

Envoyer la branche :

``` bash
git push origin nom-de-la-branche
```

Récupérer les modifications :

``` bash
git pull
```

Voir les branches distantes :

``` bash
git branch -r
```

------------------------------------------------------------------------

## 20. Tests et vérifications

Backend :

``` bash
cd Backend
php artisan test
```

Frontend :

``` bash
cd Frontend
npm run lint
npm run build
```

Le build frontend permet notamment de vérifier les erreurs de
compilation React/Vite.

------------------------------------------------------------------------

## 21. Points à vérifier dans l'état actuel du projet

Le dépôt fourni contient encore quelques éléments en cours de
développement qui doivent être vérifiés avant une démonstration finale.

### Route React de gestion des étudiants

La page `AdminEtudiants.jsx` existe, mais la version du `App.jsx`
présente dans l'archive ne déclare pas encore la route :

``` jsx
<Route
    path="/admin/etudiants"
    element={<AdminEtudiants />}
/>
```

Si le bouton du tableau de bord utilise :

``` jsx
navigate("/admin/etudiants")
```

cette route doit être ajoutée dans `App.jsx`.

### Chargement de `AdminEtudiants`

La version actuelle de `AdminEtudiants.jsx` utilise :

``` jsx
if (chargement) {
```

mais le state `chargement` doit être déclaré avec `useState`.

### URL frontend/backend pour les étudiants

Le frontend utilise actuellement :

``` text
/admin/etudiants/billets-valides
```

alors que la route API présente dans `Backend/routes/api.php` est :

``` text
/admin/etudiants/billet-valide
```

Les deux chemins doivent être harmonisés.

### Relation billet retour

Le modèle `Etudiant` contient :

``` php
billetRetour()
```

alors que certains services de la version actuelle utilisent :

``` php
billetsRetour()
```

Il faut utiliser le même nom de relation partout.

### Champ du diplôme

La migration actuelle contient :

``` text
chemin_diplome
```

mais une partie du service utilise encore :

``` text
preuve_diplome
```

Ces noms doivent être harmonisés pour éviter les erreurs SQL ou
Eloquent.

### `MonBilletsRetour.jsx`

La version présente dans l'archive contient des variables incohérentes
entre `billets` et `billet`. Cette page doit être vérifiée ou remplacée
par la page `MesDemandes` qui centralise déjà les demandes.

### Autorisation backend

Le middleware `CheckAdminType` existe, mais les routes administratives
visibles dans `routes/api.php` doivent être vérifiées afin que les
permissions soient réellement appliquées côté serveur et pas uniquement
dans l'interface React.

### `.env.example`

L'exemple Laravel fourni utilise SQLite par défaut, tandis que
`docker-compose.yml` utilise MySQL. Pour une installation locale MySQL,
modifier le `.env` en conséquence.

------------------------------------------------------------------------

## 22. Objectif final

L'objectif du projet est de fournir une plateforme simple permettant de
:

``` text
Étudiant
   ↓
Authentification
   ↓
Demande de bourse
   ↓
Téléversement des justificatifs
   ↓
Suivi de la demande
   ↓
Notification
```

et :

``` text
Étudiant
   ↓
Demande de billet retour
   ↓
Justificatif si nécessaire
   ↓
Validation / rejet administratif
   ↓
Notification
```

avec une interface administrative permettant le suivi global des
étudiants, demandes, billets retour et statistiques.

------------------------------------------------------------------------

## 🔗 Ressources du projet

-  Repository GitHub : [E-Bourse-UGESM](https://github.com/fadaldrame97-sys/E-Bourse-UGESM)
-  Docker : [Docker](https://www.docker.com/)
-  Gestion de projet : [Jira](https://www.atlassian.com/software/jira)
-  Maquettes : [Figma](https://www.figma.com/)

---

## 23. Licence

Projet réalisé dans un cadre académique et de développement de la
plateforme E-Bourse UGESM.
