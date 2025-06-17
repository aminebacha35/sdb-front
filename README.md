# Frontend - Garage Carrosserie (Vue.js)

Ce projet représente l'interface utilisateur du système de prise de rendez-vous pour le garage de carrosserie situé à Sens-de-Bretagne. Il a été développé en Vue.js et interagit avec une API Laravel.

## Prérequis

- Node.js (>= 18.x recommandé)
- npm (ou yarn)
- Un backend Laravel fonctionnel (voir le dossier `sdb-api/` pour plus de détails)
- Le backend doit être démarré sur `http://localhost:8000`

## Installation

```bash
git clone https://github.com/aminebacha35/sdb-front.git
cd sdb-front
npm install
```

## Configuration

Créer un fichier `.env` à la racine du projet s'il n'existe pas avec le contenu suivant :

```
VITE_API_URL=http://localhost:8000
```

> Assurez-vous que l'URL pointe vers l'API Laravel locale (ou distante en production).

## Lancer le projet

```bash
npm run dev
```

L'application sera disponible à l'adresse `http://localhost:5173`.


## Fonctionnalités

- Prise de rendez-vous avec formulaire
- Sélection de type de service
- Choix de date et heure avec créneaux disponibles
- Gestion d'authentification
- Espace d'administration pour voir, confirmer, annuler les RDV
- Espace Statistique
- Calendar des rdv
- Communication avec Laravel via Axios

## Dépendances principales

- Vue 3 + Composition API
- Vue Router
- Pinia (store management)
- Axios
- Date-fns (gestion des dates)
- Tailwind CSS (style)

## Astuces pour le développement

- Le token CSRF est automatiquement géré avec Laravel Sanctum.
- Le projet utilise des types TypeScript personnalisés (`types.ts`) pour structurer les données.

## À faire après clonage

1. Lancer `npm install` pour récupérer les dépendances
2. Créer le fichier `.env`
3. Vérifier que le backend fonctionne bien
4. Lancer `npm run dev` pour démarrer le projet
