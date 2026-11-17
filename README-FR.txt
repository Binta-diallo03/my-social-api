# My Social Networks API

## Présentation

Ce projet a été réalisé dans le cadre du module API. L'objectif est de reproduire certaines fonctionnalités de réseaux sociaux comme Facebook à travers une API REST développée avec Node.js, Express et MongoDB.

L'application permet notamment de gérer des utilisateurs, des événements, des groupes, des discussions, des albums photo, des sondages, une billetterie ainsi qu'une liste de courses collaborative.

## Installation

1. Télécharger ou cloner le projet.
2. Ouvrir le dossier dans VS Code.
3. Créer un fichier .env à la racine du projet.
4. Copier le contenu du fichier .env.example.
5. Remplacer les informations de connexion MongoDB par les vôtres.
6. Installer les dépendances :

npm install

1. Démarrer le serveur :

npm run dev

Si tout est correctement configuré, le serveur démarre sur le port 3000.

## Vérification du fonctionnement

Quelques routes peuvent être utilisées pour vérifier que l'API fonctionne :

- GET / → accueil de l'API
- GET /health → état du serveur
- GET /users → liste des utilisateurs

## Ressources disponibles

L'API propose les ressources suivantes :

- Utilisateurs
- Événements
- Groupes
- Discussions
- Messages
- Albums photo
- Photos
- Sondages
- Questions
- Billets
- Achats de billets
- Shopping List
- Covoiturage

Chaque ressource dispose des opérations CRUD classiques :

- POST
- GET
- GET par identifiant
- PUT
- DELETE

## Documentation Postman

La documentation complète de l'API est disponible à l'adresse suivante :

[https://documenter.getpostman.com/view/59274946/2sBYHbrbgC](https://documenter.getpostman.com/view/59274946/2sBYHbrbgC)

## Technologies utilisées

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Postman

