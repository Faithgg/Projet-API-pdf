# Projet-API-pdf

## Comment démarrer le projet : 

## Etape 1
- Charger le fichier `api_PDF.sql` dans votre base de données
- Accéder au fichier `.env` du dossier backend pour renseigner les infos de votre base de données
##Lancer les serveurs

## Etape 2

|       |   Frontend |   Backend |
|---    |:-:    |:-:    |
|  Action 1   |   ```cd ./frontend```   |   ```cd ./backend``` |
|   Action 2;   |   ```npm i```  |   ```npm i``` |
|   Action 3;   |   ```npm start```   |   ```npx ts-node src/index.ts``` |

---

[NB] :  Lancer le serveur avant le client

## Explication du projet : 

Ce projet consiste à utiliser l'API backend pour générer un pdf en fonction des données reçu du client.
Il offre un interface fluide pour gérer l'historique des pdfs générés sur ce site.

## Technos : 
- **Tailwind CSS** : Pour l'interface  
- **html-pdf** : Pour la création du pdf coté serveur
- **TypeScript** : Langage principal du projet
